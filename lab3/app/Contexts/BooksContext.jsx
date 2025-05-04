import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showOnlyMyBooks, setShowOnlyMyBooks] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (showOnlyMyBooks && user) {
      setFilteredBooks(books.filter(book => book.userId === user.uid));
    } else {
      setFilteredBooks(books);
    }
  }, [showOnlyMyBooks, books, user]);

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksData);
      setFilteredBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (bookData) => {
    try {
      const docRef = await addDoc(collection(db, "books"), {
        ...bookData,
        userId: user.uid,
        userName: user.displayName,
        createdAt: new Date().toISOString()
      });
      await fetchBooks();
      return docRef.id;
    } catch (error) {
      console.error("Error adding book:", error);
      throw error;
    }
  };

  const toggleMyBooks = () => {
    setShowOnlyMyBooks(!showOnlyMyBooks);
  };

  const value = {
    books: filteredBooks,
    addBook,
    showOnlyMyBooks,
    toggleMyBooks,
    isAuthenticated: !!user
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
