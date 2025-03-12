import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IBook } from "./Book.type";
import { AlertContext } from "../context/AlertContext";

const newBook = (): IBook => ({
  id: "",
  title: "",
  author: "",
  category: "",
  isbn: 1,
  is_active: true,
});

export const categories = [
  { value: "romance", label: "Romance" },
  { value: "fiction", label: "Fiction" },
  { value: "poems", label: "Poems" },
  { value: "science", label: "Science Fiction" },
  { value: "fantasy", label: "Fantasy" },
];

const BookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState<IBook>(location.state ?? newBook());
  const { setAlert } = useContext(AlertContext);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const bookData: IBook = {
      ...book,
      ...(book.id
        ? { modified_at: now }
        : { id: crypto.randomUUID(), created_at: now }),
    };

    const url = book.id
      ? `http://localhost:3000/books/${book.id}`
      : "http://localhost:3000/books";

    const method = book.id ? "PATCH" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
        setAlert({
          message: `Book ${book.id ? "updated" : "added"} successfully!`,
          type: "succeed",
        });
      })
      .catch((err) => {
        if (err.response) {
          setAlert({ message: err.response.data.message, type: "danger" });
        }
      });
  };

  const renderInputField = (
    label: string,
    placeholder: string,
    name: keyof Pick<IBook, "title" | "isbn" | "author" | "category">
  ) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        name={name}
        type={name === "isbn" ? "number" : "text"}
        value={book[name]}
        placeholder={placeholder}
        onChange={handleChange}
        min={name === "isbn" ? 1 : undefined}
        required
      />
    </div>
  );

  return (
    <div className="mx-auto">
      <a href="/" className="text-blue-500 mb-6 inline-block">
        ← Back to Dashboard
      </a>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 max-w-sm mx-auto"
      >
        {renderInputField("Book title", "Type book title...", "title")}
        {renderInputField("Author name", "Type author name...", "author")}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Category
          </label>
          <Dropdown
            className="w-full"
            name="category"
            defaultValue={book.category}
            items={categories}
            onChange={handleChange}
            isSelectable={true}
          />
        </div>
        {renderInputField(
          "International Standard Book Number (ISBN)",
          "Type ISBN...",
          "isbn"
        )}
        <Button label={book.id ? "Update" : "Submit"} isFormSubmit={true} />
      </form>
    </div>
  );
};
export default BookForm;
