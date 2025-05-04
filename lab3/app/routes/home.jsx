import { useContext, useState } from "react";
import Book from "../Components/Book";
import { BooksContext } from "../Contexts/BooksContext";

export function meta() {
  return [
    { title: "Books App" },
    { name: "description", content: "Website for Bookshop App" },
  ];
}

export default function Home() {
  const { bookList } = useContext(BooksContext);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // pusty = wszystkie

  const types = ["okładka miękka", "okładka twarda", "audiobook", "ebook"];

  // Filtrowanie po tytule i kategorii
  const filteredBooks = bookList.filter((book) => {
    const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    return matchesQuery && matchesCategory;
  });

  const BookListHTML = filteredBooks.map((book) => (
    <Book key={book.id} book={book} />
  ));

  return (
    <main className="list-vertical">
      <input
        placeholder="Wyszukaj książkę..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Wszystkie kategorie</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {BookListHTML.length > 0 ? (
        BookListHTML
      ) : (
        <p>Brak książek pasujących do wyszukiwania.</p>
      )}
    </main>
  );
}
