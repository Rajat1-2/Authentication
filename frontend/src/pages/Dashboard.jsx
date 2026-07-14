import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

function Dashboard() {
  const user = useSelector(state => state.auth.user);

  return (
    
    <div
   
      className="

            min-h-screen

            bg-slate-100

            p-12

            "
    >
        {/* shoild be rechenked */}
        <Navbar/>
      <div
        className="

                bg-white

                rounded-3xl

                shadow-xl

                p-10

                max-w-3xl

                mx-auto

                "
      >
        <h1
          className="

                    text-4xl

                    font-bold

                    "
        >
          Dashboard 🚀
        </h1>

        <div className="mt-8">
          <p>
            <strong>Username</strong>
          </p>

          <p>{user?.username}</p>
        </div>

        <div className="mt-6">
          <p>
            <strong>Email</strong>
          </p>

          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
