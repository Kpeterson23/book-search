import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getUsersAll {
      _id
      email
      username
      bookCount
      savedBooks {
        _id
        title
        authors
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query GetSingleUser {
    getSingleUser {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        title
        authors
        link
        description
        bookId
        image
      }
    }
  }
`;
