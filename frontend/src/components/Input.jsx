import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

function Input({
  label,

  type = "text",

  register,

  error,

  ...props
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">{label}</label>

      <div className="relative">
        <input
          {...register}
          {...props}
          type={type === "password" ? (show ? "text" : "password") : type}
          className="

                    w-full

                    border

                    border-gray-300

                    rounded-xl

                    px-4

                    py-3

                    outline-none

                    focus:border-blue-600

                    transition

                    "
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-3"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}

export default Input;
