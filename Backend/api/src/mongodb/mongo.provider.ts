import { MongoClient, Db } from 'mongodb';
import { Provider } from '@nestjs/common';
export const MONGO_DB = 'MONGO_DB';

/**
 * MongoDB provider, this connects to the MongoDB database using the connection string from environment variables and returns the database instance.
 */
export const mongoProviders: Provider[] = [{
    provide: MONGO_DB,
    useFactory: async (): Promise<Db> => {
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    return client.db(process.env.MONGODB_NAME || 'QuestionService');
  }
}];