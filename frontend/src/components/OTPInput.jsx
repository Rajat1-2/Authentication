import { useRef } from "react";

function OTPInput({ value, onChange }) {
  const inputs = useRef([]);

  const handleChange = (index, e) => {
    const digit = e.target.value.replace(/\D/g, "");

    if (!digit) return;

    const otp = value.split("");

    otp[index] = digit;

    onChange(otp.join(""));

    if (index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const otp = value.split("");

      if (otp[index]) {
        otp[index] = "";
        onChange(otp.join(""));
        return;
      }

      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handlePaste = e => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pasted)) return;

    onChange(pasted);

    inputs.current[Math.min(5, pasted.length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          ref={el => (inputs.current[i] = el)}
          maxLength={1}
          value={value[i] || ""}
          onPaste={handlePaste}
          onKeyDown={e => handleKeyDown(i, e)}
          onChange={e => handleChange(i, e)}
          className="
                    w-12
                    h-14
                    rounded-xl
                    border
                    border-gray-300
                    text-center
                    text-xl
                    font-bold
                    outline-none
                    focus:border-blue-600
                    transition
                    "
        />
      ))}
    </div>
  );
}

export default OTPInput;
