import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/admin";
import UserPage from "./pages/user";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
