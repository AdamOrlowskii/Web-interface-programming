import { createContext, useState } from "react";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: "Wiedźmin: Ostatnie życzenie",
      author: "Andrzej Sapkowski",
      price: 29.99,
      category: "okładka miękka",
    },
    {
      id: 2,
      title: "Lśnienie",
      author: "Stephen King",
      price: 39.99,
      category: "okładka twarda",
    },
    {
      id: 3,
      title: "Harry Pjoter i Kamień Filozoficzny",
      author: "J.K. Rowling",
      price: 49.99,
      category: "audiobook",
    },
    {
      id: 4,
      title: "Bezsenność",
      author: "Stephen King",
      price: 19.99,
      category: "ebook",
    }

  ]);

  return (
    <BooksContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BooksContext.Provider>
  );
}
