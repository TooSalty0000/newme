import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";

export default function RootLayout() {
  const navigate = useNavigate();
  const { logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-start p-3">
        <h1 className="text-lg">New Me</h1>
        <button
          className="ml-auto justify-self-end text-lg font-bold"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
