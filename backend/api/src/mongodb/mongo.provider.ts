import { MongoClient, Db, Collection, ServerApiVersion, MongoClientOptions } from 'mongodb';
import { Provider, OnApplicationShutdown, Inject, Injectable  } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export const MONGO_CLIENT = 'MONGO_CLIENT';
export const MONGO_DB = 'MONGO_DB';
export const MONGO_COLLECTION = 'MONGO_COLLECTION';
export const MONGO_CLOSE = 'MONGO_CLOSE';

let cachedClient:  MongoClient | null = null;
let cachedDb: Db | null = null;
let cachedCollection: Collection | null = null;

// This provider creates and exports a MongoDB client instance
const clientProvider: Provider = {
    provide: 'MONGO_CLIENT',
    useFactory: async (): Promise<MongoClient> => {
    	if (cachedClient) {
			return cachedClient;
		}

		const options: MongoClientOptions = {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			}
		};

		const client = new MongoClient(process.env.MONGODB_URI!, options);
		await client.connect();
		cachedClient = client;
		return client;
		}
};

// This provider creates and exports a MongoDB database instance
const dbProvider: Provider = {
    provide: 'MONGO_DB',
    useFactory: async (client: MongoClient): Promise<Db> => {
        if (cachedDb) {
            return cachedDb;
        }

        cachedDb = client.db(process.env.MONGODB_NAME || 'QuestionService');
        return cachedDb;
    },
    inject: [MONGO_CLIENT],
};

// This provider creates and exports a MongoDB collection instance
const collectionProvider: Provider = {
    provide: 'MONGO_COLLECTION',
    useFactory: async (db: Db): Promise<Collection> => {
        if (cachedCollection) {
            return cachedCollection;
        } 

        cachedCollection = db.collection(process.env.MONGODB_COLLECTION || 'questions');
        return cachedCollection;
    },
    inject: [MONGO_DB],
};


// Manual provider to close the mongo client connection
const closeProvider: Provider = {
  	provide: MONGO_CLOSE,
  	useFactory: (client: MongoClient) => {
    	return async () => {
			await client.close();
			cachedClient = null;
			cachedDb = null;
			cachedCollection = null;
		};
	},
	inject: [MONGO_CLIENT],
};

// clean up mongo client on application shutdown, cannot be used elsewhere and is automatically called
@Injectable()
class MongoShutdown implements OnApplicationShutdown {
    constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {}

    async onApplicationShutdown(signal: string) {
        console.log(`Received shutdown signal: ${signal}`);
        await this.client.close();
        cachedClient = null;
        cachedDb = null;
        cachedCollection = null;
    }
}

/**
 * MongoDB providers, these connects to the MongoDB database and perform CRUD operations.
 */
export const mongoProviders: Provider[] = [
	clientProvider,
	dbProvider,
	collectionProvider,
	closeProvider,
	MongoShutdown,
];