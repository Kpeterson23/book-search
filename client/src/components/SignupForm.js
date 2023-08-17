import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { CREATE_USER_MUTATION } from "../graphQL/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const SignupForm = () => {
  const initialFormData = {
    username: "",
    email: "",
    password: "",
  };
  const [userFormData, setUserFormData] = useState(initialFormData);
  const [showAlert, setShowAlert] = useState(false);
  const [createUserMutation, { loading, error, data }] =
    useMutation(CREATE_USER_MUTATION);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    try {
      const response = await createUserMutation({
        variables: {
          input: userFormData,
        },
      });

      const { token, user } = response.data.createUser;
      Auth.login(token);

      // Clear the form after successful submission
      setUserFormData(initialFormData);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  const isFormValid =
    userFormData.username && userFormData.email && userFormData.password;

  return (
    <>
      <Form noValidate onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button disabled={!isFormValid} type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
