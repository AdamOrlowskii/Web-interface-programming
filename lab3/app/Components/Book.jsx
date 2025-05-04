export default function Book({ book }) {
  const categoryIcon = (category) => {
    if (category === "okładka twarda") return "📕";
    if (category === "okładka miękka") return "📗";
    if (category === "audiobook") return "🎧";
    if (category === "ebook") return "📱";
    return "📖"; // domyślna ikona
  };

  return (
    <article className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{categoryIcon(book.category)}</span>
          <div>
            <h3 className="font-bold text-lg">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-blue-600 font-semibold">{book.price.toFixed(2)} zł</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Edytuj
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Usuń
          </button>
        </div>
      </div>
      {book.userName && (
        <p className="text-sm text-gray-500 mt-2">
          Dodane przez: {book.userName}
        </p>
      )}
    </article>
  );
}
