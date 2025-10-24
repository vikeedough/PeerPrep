import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';
import { MONGO_CLIENT, MONGO_DB, MONGO_COLLECTION } from './mongo.provider';

/**
 * MongoService provides methods to access the MongoDB database and collection.
 */

@Injectable()
export class MongoService implements OnModuleDestroy {
  constructor(
    @Inject(MONGO_CLIENT) private readonly client: MongoClient,
    @Inject(MONGO_DB) private readonly database: Db,
    @Inject(MONGO_COLLECTION) private readonly collection: Collection,
  ) {}

  // gets the database from injection of mongo.provider.ts
  getDb(): Db {
    return this.database;
  }

  // gets the collection from injection of mongo.provider.ts
  getCollection(): Collection {
    return this.collection;
  }

  // closes the mongo client connection
  async closeMongo(): Promise<void> {
    // Close underlying socket pools safely
    await this.client.close();
  }

  // Ensures graceful shutdown when Nest app stops
  async onModuleDestroy(): Promise<void> {
    await this.closeMongo();
  }
}