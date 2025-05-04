import { useState } from "react";
import Book from "../Components/Book";
import { useBooks } from "../Contexts/BooksContext";

export function meta() {
  return [
    { title: "Books App" },
    { name: "description", content: "Website for Bookshop App" },
  ];
}

export default function Home() {
  const { books, showOnlyMyBooks, toggleMyBooks } = useBooks();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // pusty = wszystkie

  const types = ["okładka miękka", "okładka twarda", "audiobook", "ebook"];

  // Filtrowanie po tytule i kategorii
  const filteredBooks = books.filter((book) => {
    const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    return matchesQuery && matchesCategory;
  });

  const BookListHTML = filteredBooks.map((book) => (
    <Book key={book.id} book={book} />
  ));

  return (
    <main className="list-vertical">
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Wyszukaj książkę..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 mr-2 px-4 py-2 border rounded"
          autoFocus
        />
        <button
          onClick={toggleMyBooks}
          className={`px-4 py-2 rounded ${showOnlyMyBooks
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          MOJE
        </button>
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mb-4 px-4 py-2 border rounded"
      >
        <option value="">Wszystkie kategorie</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BookListHTML.length > 0 ? (
          BookListHTML
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Brak książek pasujących do wyszukiwania.
          </p>
        )}
      </div>
    </main>
  );
}
