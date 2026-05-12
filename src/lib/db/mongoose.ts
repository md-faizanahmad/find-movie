import mongoose from "mongoose";

import { env } from "../env/server";

const MONGODB_URI = env.MONGODB_URI;

type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: MongooseConnection | undefined;
}

const globalConnection = global.mongooseConnection ?? {
  conn: null,
  promise: null,
};

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (globalConnection.conn) {
    return globalConnection.conn;
  }

  if (!globalConnection.promise) {
    globalConnection.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  globalConnection.conn = await globalConnection.promise;

  global.mongooseConnection = globalConnection;

  return globalConnection.conn;
}
