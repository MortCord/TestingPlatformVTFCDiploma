import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Tests from "../pages/Tests";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminPanel from "../pages/AdminPanel";
import Home from "../pages/Home";
import TeacherPanel from "../pages/TeacherPanel";
import TestTake from "../pages/TestTake";
import JoinTest from "../pages/JoinTest";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>

        <Route
          path="/tests"
          element={
            <ProtectedRoute>
              <Tests />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin"
        element={
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>

    
  }
        />
<Route
  path="/teacher"
  element={
    <ProtectedRoute allowedRoles={["TEACHER"]}>
      <TeacherPanel />
    </ProtectedRoute>
  }
/>
<Route
  path="/tests"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <Tests />
    </ProtectedRoute>
  }
/>
<Route path="/test/:id" element={<TestTake />} />

<Route path="/join-test" element={<JoinTest />}
/>
      </Routes>
    </BrowserRouter>
  );
}