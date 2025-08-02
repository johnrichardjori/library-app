import { useEffect, useState } from "react";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("want-to-read");

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  function saveBooks(updatedBooks) {
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  }

  function addBook() {
    const newBook = {
      id: Date.now(),
      title,
      author,
      tags: tags.split(",").map((tag) => tag.trim()),
      status,
    };
    const updatedBooks = [...books, newBook];
    saveBooks(updatedBooks);
    setTitle("");
    setAuthor("");
    setTags("");
    setStatus("want-to-read");
  }

  function deleteBook(id) {
    const updatedBooks = books.filter((book) => book.id !== id);
    saveBooks(updatedBooks);
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center py-8 px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')",
      }}
    >
      <div className="max-w-3xl mx-auto bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          📚 My Book Dashboard
        </h2>

        <div className="mb-6 grid gap-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <select
            className="border p-2 w-full rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="want-to-read">Want to Read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={addBook}
          >
            Add Book
          </button>
        </div>

        <div>
          {books.length === 0 ? (
            <p className="text-center text-gray-500">No books added yet.</p>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                className="border border-gray-300 bg-white rounded p-4 mb-4 shadow"
              >
                <h3 className="text-xl font-semibold">
                  {book.title}{" "}
                  <span className="text-sm text-gray-500">
                    by {book.author}
                  </span>
                </h3>
                <p className="text-sm text-gray-600">
                  Tags: {book.tags.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-medium capitalize">
                    {book.status.replace("-", " ")}
                  </span>
                </p>
                <button
                  className="mt-2 text-red-600 hover:underline"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
