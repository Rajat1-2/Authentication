import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Button from "../components/Button";
import Input from "../components/Input";

import { loginUser } from "../features/auth/authAPI";
import { loginSuccess } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm();

  const submit = async data => {
    try {
      const res = await loginUser(data);

      dispatch(
        loginSuccess({
          user: res.user,

          accessToken: res.accessToken,
        })
      );

      toast.success(res.message);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Welcome Back 👋</h1>

      <p className="text-center text-gray-500 mt-2 mb-8">Login to continue</p>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          register={register("email", {
            required: "Email required",
          })}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          register={register("password", {
            required: "Password required",
          })}
          error={errors.password}
        />

        <Button type="submit">Login</Button>
      </form>

      <p className="text-center mt-8">
        Don't have an account?
        <Link to="/register" className="ml-2 text-blue-600 font-semibold">
          Register
        </Link>
      </p>
    </>
  );
}

export default Login;
