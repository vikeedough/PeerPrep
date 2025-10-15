import { MongoClient, Collection, Db, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;

let dbName = process.env.MONGODB_DB_NAME;
let collectionName = process.env.MONGODB_COLLECTION_NAME;

let database: Db | null = null;
let collection: Collection | null = null;


export async function getDb(): Promise<Db> {
    if (database) return database;

    try {
        // this is throwing an error. cannot make client
        const client = new MongoClient(uri);
        console.log("2")
        await client.connect();
        console.log("Connected to MongoDB.");
        database = client.db(dbName);
        console.log("Database obtained.");
        return database;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

export async function getCollection(): Promise<Collection> {
    if (collection) return collection;

    console.log("Getting collection...");
    database = await getDb();
    collection = database.collection(collectionName);
    console.log("Collection obtained.");
    return collection;
}

export async function closeMongo() {
    if (client) await client.close();
    client = null;
    database = null;
    collection = null;
}