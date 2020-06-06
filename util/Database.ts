import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();

await client.connectWithUri("mongodb://localhost:27017/deno-api");

const db = client.database("deno-api");

export default db;
