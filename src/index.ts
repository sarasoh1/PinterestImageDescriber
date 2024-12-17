import Pinterest from "./pinterest-scraper/pinterest";
import { PinterestLoginOptions } from './pinterest-scraper/types/pinterest';
import dotenv from "dotenv";
import { getPosts, getShopPost } from "./utils/actions";
import { imageInterpreter, getPinterestQueryURL, getEmbedding } from "./image-describe/imageDescribe";
import qdrantClient from "./utils/config/qdrant";
const getUuid = require('uuid-by-string');
dotenv.config();

const pinterestOptions: PinterestLoginOptions = {
    email: process.env.email as string || "",
    password: process.env.password as string || "" ,
    scrollCount: parseInt(process.env.scrollCount as string) || 1
};


async function scrapePinterestImages() {
    let posts: {slug: string, imgKeywords: string | null}[] = []
    const blogPosts = await getPosts();
    const shopPosts = await getShopPost();

    posts.push(...shopPosts)
    // posts.push(...blogPosts)

    for (const post of posts) {
        console.log('handling post: ', post.slug)
        const pinterestURL = getPinterestQueryURL(post.imgKeywords ?? "")
        const pinterest = new Pinterest(pinterestURL);
        const imageURLs = await pinterest.login(pinterestOptions.email, pinterestOptions.password, pinterestOptions.scrollCount)
        for (const url of imageURLs) {
            try {

                console.log('handling url: ', url)
                const existingPoint = await qdrantClient.retrieve("pinterest_desc", {
                    ids: [getUuid(url)], with_payload: false
                })
                if (existingPoint.length > 0) {
                    console.log('point already exists')
                    continue
                } else {
                    const pinterestImgDesc = await imageInterpreter([url])
                    const embedding = await getEmbedding(pinterestImgDesc)
                    qdrantClient.upsert("pinterest_desc", {
                        points: [{
                            id: getUuid(url),
                            payload: {
                                url: url,
                                sourceImage: post.slug,
                                imgDescription: pinterestImgDesc,
                            },
                            vector: embedding,
                        }]
                    })
                }
            } catch (error) {
                console.log('error: ', error)
                continue
            }
        }
    }
}

scrapePinterestImages();
