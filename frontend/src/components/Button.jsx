function Button({
  children,
  type = "button",
  onClick,
  loading = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`

            w-full
            bg-blue-600
            hover:bg-blue-700
            active:scale-95
            transition-all
            duration-300
            rounded-xl
            py-3
            font-semibold
            text-white
            shadow-lg
            disabled:bg-gray-400
            disabled:cursor-not-allowed

            ${className}

            `}
    >
      {loading ? "Please Wait..." : children}
    </button>
  );
}

export default Button;
