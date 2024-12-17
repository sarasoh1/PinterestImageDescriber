import prisma from "./config/db";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      imgKeywords: true
    },
  });
  return posts;
}

export async function getShopPost() {
  const posts = await prisma.shop.findMany({
    select: {
      slug: true,
      imgKeywords: true
    }
  });
  return posts;
}

export async function updatePostImageDescription(slug: string, keywords: string) {
  try {
    await prisma.post.update({
      where: {
        slug: slug,
      },
      data: {
        imgKeywords: keywords,
      },
    });

  } catch (error){
    console.log(error)
  }
}

export async function updateShopImageDescription(slug: string, keywords: string) {
  try {
    await prisma.shop.update({
      where: {
        slug: slug
      },
      data: {
        imgKeywords: keywords
      },
    });

  } catch (error) {
    console.log(error)
  }
}

