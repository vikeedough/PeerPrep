import { Module } from '@nestjs/common';
import { mongoProviders } from './mongo.provider';

/**
 * This is where Nest draws the dependency graphs for MongoDB providers.
 */

@Module({
  providers: [...mongoProviders],
  exports:   [...mongoProviders],
})
export class MongoModule {}