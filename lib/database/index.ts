import mongoose from "mongoose";

const Mongodb_url = process.env.MONGODB_URL;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!Mongodb_url) throw new Error("Cannot connect to Mongo");

  cached.promise = cached.promise || mongoose.connect(Mongodb_url, {
    dbName: 'project1',
    bufferCommands: false,
  });

  cached.conn = await cached.promise;

  return cached.conn;
};
