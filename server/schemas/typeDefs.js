const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Query {
    getUsersAll: [User]
    getSingleUser(_id: ID, username: String): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveBook(input: SaveBookInput!): User
    deleteBook(bookId: String!): User
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveBookInput {
    book: BookInput!
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
