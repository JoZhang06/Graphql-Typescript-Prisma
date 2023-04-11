import { gql } from 'apollo-server-express';


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

export default typeDefs;
