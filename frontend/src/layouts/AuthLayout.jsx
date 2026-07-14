import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div
      className="

            min-h-screen

            flex

            justify-center

            items-center

            bg-gradient-to-br

            from-blue-100

            via-white

            to-blue-200

            "
    >
      <div
        className="

                w-full

                max-w-md

                bg-white/90

                backdrop-blur-md

                rounded-3xl

                shadow-2xl

                p-8

                "
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
