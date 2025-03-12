import { useState, useEffect, ChangeEvent, useContext } from "react";
import { IBook } from "./Book.type";
import BookList from "./BookList";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([] as IBook[]);
  const [filter, setFilter] = useState<string>("all");
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        if (err.response) {
          setAlert({ message: err.response.data.message, type: "danger" });
        }
      });
  }, []);

  let filteredBooks = books.filter((book) => {
    let result;
    switch (filter) {
      case "active":
        result = book.is_active;
        break;
      case "deactivated":
        result = !book.is_active;
        break;
      default:
        result = true;
    }
    return result;
  });

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
        setAlert({
          message: "Book successfully deleted.",
          type: "danger",
        });
      })
      .catch((err) => {
        if (err.response) {
          setAlert({ message: err.response.data.message, type: "danger" });
        }
      });
  };

  const handleState = (id: string, currentState: boolean) => {
    fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_active: !currentState,
        modified_at: new Date().toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        const updatedBooks = books.map((book) =>
          book.id === id ? updatedBook : book
        );
        setBooks(updatedBooks);
      })
      .catch((err) => {
        if (err.response) {
          setAlert({ message: err.response.data.message, type: "danger" });
        }
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-center break-words text-3xl font-bold">
        Book List Dashboard
      </h1>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row flex-wrap gap-4 items-center">
          <Dropdown
            items={[
              { value: "all", label: "Show all" },
              { value: "active", label: "Show active" },
              { value: "deactivated", label: "Show deactivated" },
            ]}
            onChange={handleFilter}
            defaultValue={filter}
          />
          <span className="text-gray-600">
            Showing {filteredBooks.length} of {books.length}
          </span>
        </div>
        <Button label="Add a book" onClick={() => navigate("/book")} />
      </div>
      <BookList
        books={filteredBooks}
        onDelete={handleDelete}
        onChangeState={handleState}
      />
    </div>
  );
};
export default Dashboard;
