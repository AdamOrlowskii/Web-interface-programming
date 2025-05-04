import { useContext, useState } from "react";
import { BooksContext } from "../Contexts/BooksContext";
import TypeSelector from "../Components/TypeSelector";

export function meta() {
    return [
        { title: "Dodaj książkę" },
        { name: "description", content: "Formularz dodawania nowej książki" },
    ];
}

export default function New() {
    const { bookList, setBookList } = useContext(BooksContext);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("okładka miękka");

    const handleAddBook = (e) => {
        e.preventDefault();

        if (!title || !author || !price) {
            alert("Uzupełnij wszystkie pola!");
            return;
        }

        const newBook = {
            id: bookList.length + 1,
            title: title,
            author: author,
            price: parseFloat(price),
            category: category,
        };

        setBookList((prev) => [...prev, newBook]);

        setTitle("");
        setAuthor("");
        setPrice("");
        setCategory("okładka miękka");
    };

    return (
        <main className="list-vertical">
            <form className="list-vertical" onSubmit={handleAddBook}>
                <input
                    placeholder="Tytuł książki"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <input
                    placeholder="Autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Cena (PLN)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <TypeSelector selectedCategory={category} setSelectedCategory={setCategory} />

                <button type="submit">Dodaj książkę</button>
            </form>
        </main>
    );
}
