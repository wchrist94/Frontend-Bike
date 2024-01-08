// utils/db.js
import { MongoClient } from 'mongodb';
import { BaseDatabase } from 'next-auth/mongodb';

export default class MyDatabase extends BaseDatabase {
  async findUserByEmail(email) {
    const client = await MongoClient.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();

    const user = await db.collection('users').findOne({ email });

    client.close();

    return user;
  }

  async createUser(profile) {
    const client = await MongoClient.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();

    const result = await db.collection('users').insertOne(profile);

    client.close();

    return result.insertedId;
  }

  async registerUser(credentials){
    const hashedPassword = await hashPassword(credentials.password);
    const user = {
      email: credentials.email,
      password: hashedPassword,
    };

    const userId = await this.createUser(user);

    return userId;
  }
}

async function hashPassword(password) {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}
