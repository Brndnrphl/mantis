import { Route, Routes, BrowserRouter } from "react-router-dom";
import NewNote from "./NewNote";
import Dashboard from "./Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AuthCheck from "./components/AuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import NotePage from "./NotePage";
import EditNote from "./EditNotePage";

export default function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return null;
  }

  return (
    <>
      <AuthCheck />
      <BrowserRouter>
        <div className="flex flex-col h-screen overflow-y-auto">
          <Header />
          <div className="flex flex-row flex-1">
            <Sidebar />
            <div className="border-b-[1px] border-l-[1px] min-h-screen w-3/12" />
            {/* Invisible Sidebar Div */}
            <main className="flex-1 p-4">
              <Routes>
                <Route path="/notes/:noteId" element={<NotePage />} />
                <Route path="/notes/edit/:noteId" element={<EditNote />} />
                <Route path="/new_note" element={<NewNote />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}
