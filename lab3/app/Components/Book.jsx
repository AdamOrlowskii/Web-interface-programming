export default function Book({ book, handleDone }) {
  const categoryIcon = (category) => {
    if (category === "okładka twarda") return "📕";
    if (category === "okładka miękka") return "📗";
    if (category === "audiobook") return "🎧";
    if (category === "ebook") return "📱";
    return "📖"; // domyślna ikona
  };

  return (
    <article
      className={`list-horizontal ${book.completed && "done"}`}
      onClick={!book.completed ? () => handleDone(book.id) : null}
    >
      <span>
        <span>{categoryIcon(book.category)}</span> {" "}
        <strong>{book.title}</strong> {" "}
        <em>({book.author})</em> {" "}
        <span>- {book.price.toFixed(2)} zł</span>
      </span>
      {book.completed && (
        <small className="center">{book.dateCompleted}</small>
      )}
      <div className="actions">
        <button>Edytuj</button>
        <button>Usuń</button>
      </div>
    </article>
  );
}
