import { LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { logout } from "../features/auth/authAPI";

import { useDispatch } from "react-redux";

import { logout as logoutRedux } from "../features/auth/authSlice";

function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();

      dispatch(logoutRedux());

      toast.success("Logged Out");

      navigate("/");
    } catch {
      toast.error("Logout Failed");
    }
  };

  return (
    <nav
      className="

bg-white

shadow-md

px-8

py-5

flex

justify-between

"
    >
      <h1
        className="

font-bold

text-2xl

text-blue-600

"
      >
        Auth System
      </h1>

      <button
        onClick={handleLogout}
        className="

flex

items-center

gap-2

text-red-600

"
      >
        <LogOut />
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
