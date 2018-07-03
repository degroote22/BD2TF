import * as fs from "fs";
import { GraphQLServer } from "graphql-yoga";

const typeDefs = fs.readFileSync("./src/schema.graphql", "utf-8");
const resolvers = {};
const mocks = true;
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  mocks
} as any);

server.start(() =>
  // tslint:disable-next-line:no-console
  console.log("Seerveeeeeeeeeeeeeeeeeer is runningg on localhost:4000")
);