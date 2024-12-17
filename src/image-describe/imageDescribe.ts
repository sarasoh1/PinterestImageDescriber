import s3 from "../utils/config/s3";
import { openai } from "@ai-sdk/openai";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { generateText, embed } from "ai";


export async function getImagesFromS3(prefix: string): Promise<string[]> {

  const S3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delimiter: "/",
    Prefix: prefix,
  };

  const command = new ListObjectsV2Command(S3Params);
  const response = await s3.send(command);
  const results =
    response.Contents?.filter((image) => image.Size !== undefined && image.Size < 5000000)
    .map((image) => {
      return `https://sara-knit-crochet-images.s3.us-east-2.amazonaws.com/${image.Key}`;
    }) || [];

  return results;
}

export function getPinterestQueryURL(imgDescription: string): string {
  const url = "https://www.pinterest.com/search/pins/?q=";
  const desc = imgDescription
    .replaceAll(" ", "%20")
  return url + desc + "&topic_based=true";
}

export async function imageInterpreter(imageUrls: string[]): Promise<string> {
  let prompt: string;
  if (imageUrls.length === 1) {
    prompt = "describe the knitwear found at this link " + imageUrls[0] + " accurately. Give more weight to features like colours, cut, style, and texture. Be concise and accurate.";
  } else {
    const links = imageUrls.join(", ");
    prompt = "describe the knitwear found at these links: " + links + " accurately. Give more weight to features like colours, cut, style, and texture. Be concise and accurate.";
  }
  
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system:
      "This is a fashion related question. Focus on features of the clothing that makes it unique. Be concise and accurate.",
    messages: [
      {
        role: "user",
        content: prompt,
        experimental_attachments: [{
          name: imageUrls[0],
          contentType: "image/jpeg",
          url: imageUrls[0],
        }]
      },
    ],
  });
  console.log("result: ", result.text);
  return result.text.trim()
}

export async function refineImageInterpretation(imageUrl: string): Promise<string> {

  const prompt = "describe the knitwear concisely and accurately. Give more weight to features like colours, cut, style, and texture";
  
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system:
      "This is a fashion related question. Focus on features of the clothing that makes it unique. Be concise and accurate.",
    messages: [
      {
        role: "user",
        content: prompt,
        experimental_attachments: [{
          name: imageUrl,
          contentType: "image/jpeg",
          url: imageUrl,
        }]
      },
    ],
  });
  console.log("result: ", result.text);
  return result.text.trim()
}

// Get embeddings
export async function getEmbedding(description: string) {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: description,
  });
  return embedding
}