export type ImageOpenAI = {
    type: string;
    image: URL;
  };
  
export type TextOpenAI = {
    type: string;
    text: string;
};

export type QdrantPinterestModel = {
  id: string;
  payload: {
    sourceImage: string;
    url: string;
    imgDescription: string;
  };
  vector: number[];
}
