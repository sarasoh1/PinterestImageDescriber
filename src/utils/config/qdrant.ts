import {QdrantClient} from '@qdrant/js-client-rest';
import dotenv from "dotenv";
dotenv.config();

const qdrantClient = new QdrantClient({
    url: 'https://15f409cd-5655-465b-ab30-90cc3208aaa0.europe-west3-0.gcp.cloud.qdrant.io:6333',
    apiKey: process.env.QDRANT_API_KEY || ""
});

export default qdrantClient;