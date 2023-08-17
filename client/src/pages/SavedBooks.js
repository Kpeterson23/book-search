import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { GET_SINGLE_USER } from "../graphQL/queries";
import { DELETE_BOOK_MUTATION } from "../graphQL/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const { loading: singleUserLoading, data: singleUserData } =
    useQuery(GET_SINGLE_USER);
  const [deleteBookMutation] = useMutation(DELETE_BOOK_MUTATION);

  useEffect(() => {
    getUserData();
  }, [singleUserData]);

  const getUserData = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token || !singleUserData) {
        return;
      }
      setUserData(singleUserData.getSingleUser);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return;
    }

    try {
      await deleteBookMutation({
        variables: { bookId },
      });
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData.savedBooks.length) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book, index) => (
            <Col md="4" key={index}>
              <Card border="dark">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
