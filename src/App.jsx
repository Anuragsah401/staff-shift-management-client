import { Routes, Route } from "react-router-dom";
import UserPage from "pages/users/user";
import UserLogin from "pages/users/login";
import UserPasswordReset from "pages/users/passwordReset";
import ProtectedUserRoute from "./components/user/ProtectedUserRoute";
import LoginPage from "pages/login";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Shifts from "./pages/admin/Shifts";
import Leaves from "./pages/admin/Leaves";
import Timesheets from "./pages/admin/Timesheets";
import Notifications from "./pages/admin/Notifications";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/reset" element={<UserPasswordReset />} />
        <Route
          path="/user"
          element={
            <ProtectedUserRoute>
              <UserPage />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="shifts" element={<Shifts />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="timesheets" element={<Timesheets />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
