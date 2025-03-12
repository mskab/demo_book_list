import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import BookForm from "./components/BookForm";
import Alert from "./components/Alert";
import { useContext } from "react";
import { AlertContext } from "./context/AlertContext";

function App() {
  const { alert } = useContext(AlertContext);
  return (
    <div className="min-h-screen pt-6 pb-16 px-6">
      {alert && (
        <div className="fixed left-5 top-6 z-30">
          <Alert message={alert.message} type={alert.type} />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/book" element={<BookForm />} />
        <Route path="/book/:id" element={<BookForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
