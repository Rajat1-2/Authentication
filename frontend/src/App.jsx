import { Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/Login";

import Register from "./pages/Register";

import VerifyOTP from "./pages/VerifyOTP";

import Dashboard from "./pages/Dashboard";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useAuth();
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verifyotp" element={<VerifyOTP />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />{" "}
    </Routes>
  );
}

export default App;
