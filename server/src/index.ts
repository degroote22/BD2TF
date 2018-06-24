import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }: any) => `Hello ${name || "World"}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers } as any);
// tslint:disable-next-line:no-console
server.start(() => console.log("Server is running on localhost:4000"));
