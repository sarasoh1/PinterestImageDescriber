import points from "./points.json";
import qdrantClient from "../utils/config/qdrant";
import { refineImageInterpretation } from "../image-describe/imageDescribe";
import { getEmbedding } from "../image-describe/imageDescribe";

async function refineImages() {
    for (const i in points) {
        const point = points[i];
        const newDesc = await refineImageInterpretation(point.payload.url);
        const embedding = await getEmbedding(newDesc);
        qdrantClient.upsert("pinterest_desc", {
            points: [{
                id: point.id,
                payload: {
                    url: point.payload.url,
                    sourceImage: point.payload.sourceImage,
                    imgDescription: newDesc,
                },
                vector: embedding,
            }]
        })
    }
}

refineImages();