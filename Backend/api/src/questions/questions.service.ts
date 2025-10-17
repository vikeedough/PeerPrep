import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { MONGO_DB } from '../mongodb/mongo.provider';

/**
 * Service to handle question-related operations, such as fetching top questions from the MongoDB database.
 */
@Injectable()
export class QuestionsService {
  constructor(@Inject(MONGO_DB) private readonly db: Db) {}

  // this function fetches the top 'limit' questions from the 'questions' collection in the MongoDB database
  findTop(limit = 5) {
    return this.db.collection('questions').find({}).limit(limit).toArray();
  }
}