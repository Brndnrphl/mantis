import { Route, Routes, BrowserRouter } from "react-router-dom";
import NewNote from "./NewNote";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/new_note" element={<NewNote />} />
      </Routes>
    </BrowserRouter>
  );
}
