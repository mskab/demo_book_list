import moment from "moment";
import { IBook } from "./Book.type";
import { useNavigate } from "react-router";
import Button from "./Button";
import { categories } from "./BookForm";

interface IBookList {
  books: IBook[];
  onDelete: (id: string) => void;
  onChangeState: (id: string, currentState: boolean) => void;
}

const headers = [
  "Book title",
  "Author name",
  "Category",
  "ISBN",
  "Created At",
  "Modified/Edited At",
  "Actions",
];

const BookList = ({ books, onDelete, onChangeState }: IBookList) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th key={`${index}_header`} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className={`${
                book.is_active ? "bg-white" : "bg-gray-50"
              } border-b border-gray-200`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {book.title}
              </th>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">
                {
                  categories.find(
                    (category) => category.value === book.category
                  )?.label
                }
              </td>
              <td className="px-6 py-4">{book.isbn}</td>
              <td className="px-6 py-4">
                {moment(book.created_at).format("D MMMM YYYY, h:mmA") || "--"}
              </td>
              <td className="px-6 py-4">
                {book.modified_at
                  ? moment(book.modified_at).format("D MMMM YYYY, h:mmA")
                  : "--"}
              </td>
              <td className="flex flex-row flex-wrap gap-3 px-6 py-4">
                <Button
                  label="Edit"
                  onClick={() => navigate(`/book/${book.id}`, { state: book })}
                />
                <Button
                  label={book.is_active ? "Deactivate" : "Re-Activate"}
                  type={book.is_active ? "warning" : "confirm"}
                  onClick={() => onChangeState(book.id, book.is_active)}
                />
                {!book.is_active && (
                  <Button
                    label="Remove"
                    type="danger"
                    onClick={() => {
                      onDelete(book.id);
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BookList;
