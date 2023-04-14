import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    name: String
    password: String!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(email: String!, name: String, password: String!): User!
    updateUser(id: Int!, email: String, name: String, password: String): User!
    deleteUser(id: Int!): User!
    createUniqueIndex(indexName: String!, tableName: String!, columnName: String!): CreateIndexPayload!
  }

  type CreateIndexPayload {
    indexName: String!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return prisma.prisma_user.findMany();
    },
    user: async (_parent: any, args: { id: any; }) => {
      const { id } = args;
      return prisma.prisma_user.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createUser: async (_parent: any, args: { email: any; name: any; password: any; }) => {
      const { email, name, password } = args;
      return prisma.prisma_user.create({ data: { email, name, password } });
    },
    updateUser: async (_parent: any, args: { id: any; email: any; name: any; password: any; }) => {
      const { id, email, name, password } = args;
      return prisma.prisma_user.update({
        where: { id },
        data: { email, name, password },
      });
    },
    deleteUser: async (_parent: any, args: { id: any; }) => {
      const { id } = args;
      return prisma.prisma_user.delete({ where: { id } });
    },
    // createUniqueIndex: async (_parent: any, args: { indexName: any; tableName: any; columnName: any; }) => {
    //   const { indexName, tableName, columnName } = args;
    //   await prisma.$executeRaw(`CREATE UNIQUE INDEX ${indexName} ON ${tableName}(${columnName})`);
    //   return { indexName };
    // },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
