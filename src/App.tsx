import { Route, Routes, BrowserRouter } from "react-router-dom";
import NewNote from "./NewNote";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-y-auto">
        <Header />
        <div className="flex flex-row flex-1">
          <Sidebar />
          <div className="border-b-[1px] border-l-[1px] min-h-screen w-3/12" />
          {/* Invisible Sidebar Div */}
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/new_note" element={<NewNote />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
