// route to get logged in user's info (needs the token)
export const getMe = (token) =>
  fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

export const createUser = (userData) =>
  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

export const loginUser = (userData) =>
  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

export const saveBook = (bookData, token) =>
  fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

export const deleteBook = (bookId, token) =>
  fetch(`/api/users/books/${bookId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const searchGoogleBooks = (query) =>
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
