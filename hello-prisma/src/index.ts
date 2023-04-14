import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    name: String!
    admin: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(email: String!, name: String!, admin: Boolean!): User!
    updateUser(id: Int!, email: String, name: String, admin: Boolean): User!
    deleteUser(id: Int!): User!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
    user: async (_parent: any, args: { id: any; }) => {
      const { id } = args;
      return prisma.user.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createUser: async (_parent: any, args: { email: any; name: any; admin: any; }) => {
      const { email, name, admin } = args;
      return prisma.user.create({ data: { email, name, Admin: admin } });
    },
    updateUser: async (_parent: any, args: { id: any; email: any; name: any; admin: any; }) => {
      const { id, email, name, admin } = args;
      return prisma.user.update({
        where: { id },
        data: { email, name, Admin: admin },
      });
    },
    deleteUser: async (_parent: any, args: { id: any; }) => {
      const { id } = args;
      return prisma.user.delete({ where: { id } });
    },
  },

};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
