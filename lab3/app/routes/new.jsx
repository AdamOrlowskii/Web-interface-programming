import { useState } from "react";
import { useBooks } from "../Contexts/BooksContext";
import { useAuth } from "../Contexts/AuthContext";
import TypeSelector from "../Components/TypeSelector";

export function meta() {
    return [
        { title: "Dodaj książkę" },
        { name: "description", content: "Formularz dodawania nowej książki" },
    ];
}

export default function New() {
    const { addBook } = useBooks();
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("okładka miękka");

    const handleAddBook = async (e) => {
        e.preventDefault();

        if (!title || !author || !price) {
            alert("Uzupełnij wszystkie pola!");
            return;
        }

        if (!user) {
            alert("Musisz być zalogowany, aby dodać książkę!");
            return;
        }

        try {
            await addBook({
                title: title,
                author: author,
                price: parseFloat(price),
                category: category,
            });

            setTitle("");
            setAuthor("");
            setPrice("");
            setCategory("okładka miękka");
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Wystąpił błąd podczas dodawania książki.");
        }
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
