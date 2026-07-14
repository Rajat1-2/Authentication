import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Button from "../components/Button";
import OTPInput from "../components/OTPInput";
import { useState } from "react";

import { verifyOTP } from "../features/auth/authAPI";

function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const email = useSelector(state => state.auth.email);

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm();

  const submit = async data => {
    try {
      const res = await verifyOTP({
        email,

        otp,
      });

      toast.success(res.message);

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP Invalid");
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
        Verify Email
      </h1>

      <p
        className="

        text-gray-500

        text-center

        mb-8

        "
      >
        OTP sent to
        <br />
        <span className="font-semibold">{email}</span>
      </p>

      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <OTPInput value={otp} onChange={setOtp} />

        <Button type="submit">Verify OTP</Button>
      </form>
    </>
  );
}

export default VerifyOTP;
