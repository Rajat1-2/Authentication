import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../features/auth/authAPI";
import { setEmail } from "../features/auth/authSlice";

function Register() {
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submit = async data => {
    try {
      const res = await registerUser(data);

      toast.success(res.message);

      dispatch(setEmail(data.email));

      navigate("/verifyotp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <h1
        className="

                text-4xl

                font-bold

                text-center

                "
      >
        Create Account
      </h1>

      <p
        className="

                text-center

                text-gray-500

                mt-2

                mb-8

                "
      >
        Welcome 👋
      </p>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <Input
          label="Username"
          register={register("username", {
            required: "Username required",
          })}
          error={errors.username}
        />

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

        <Button type="submit">Register</Button>
      </form>

      <p
        className="

                mt-8

                text-center

                "
      >
        Already have an account?
        <Link
          to="/"
          className="

                    text-blue-600

                    font-semibold

                    ml-2

                    "
        >
          Login
        </Link>
      </p>
    </>
  );
}

export default Register;
