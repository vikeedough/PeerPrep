import * as mongoDB from "mongodb"
import * as dotenv from "dotenv"

export const collections: { questions?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        process.env.MONGODB_URL as string
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.MONGODB_DB_NAME);

    const questionsCollection: mongoDB.Collection = db.collection(
        process.env.QUESTIONS_COLLECTION_NAME as string
    );

    collections.questions = questionsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${questionsCollection.collectionName}`);
}