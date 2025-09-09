import React, { lazy, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./route/PraviteRoute";
import UserProvider, { UserContext } from "./context/userContext";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));

const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const ManageTasks = lazy(() => import("./pages/Admin/ManageTasks"));
const CreateTask = lazy(() => import("./pages/Admin/CreateTask"));
const ManageUsers = lazy(() => import("./pages/Admin/ManageUsers"));

const UserDashboard = lazy(() => import("./pages/Users/UserDashboard"));
const MyTask = lazy(() => import("./pages/Users/MyTask"));
const ViewTaskDetails = lazy(() => import("./pages/Users/ViewTaskDetails"));

const App = () => {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/tasks" element={<ManageTasks />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["member"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/my-task" element={<MyTask />} />
              <Route
                path="/user/task-details/:id"
                element={<ViewTaskDetails />}
              />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Root />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <Outlet />;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" /> // ✅ fixed spelling
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
