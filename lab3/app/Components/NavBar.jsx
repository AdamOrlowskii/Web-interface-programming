import { Link } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import { useBooks } from "../Contexts/BooksContext";

export default function NavBar() {
  const { user, signInWithGoogle, logout } = useAuth();
  const { showOnlyMyBooks, toggleMyBooks } = useBooks();

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">Bookshop</span>
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                Strona główna
              </Link>
              <Link
                to="/new"
                className="px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                Dodaj książkę
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={toggleMyBooks}
                  className={`px-4 py-2 rounded ${showOnlyMyBooks
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  MOJE
                </button>
                <span className="text-gray-700">
                  {user.displayName}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Wyloguj
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Zaloguj się przez Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
