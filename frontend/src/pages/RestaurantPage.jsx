import { useState } from "react";
import axios from "axios";
import TableGrid from "../components/TableGrid";

export default function RestaurantPage() {
  const [alert, setAlert] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setAlert({
        type: "success",
        message: "Դու հաջողությամբ դուրս եկար համակարգից",
      });
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (error) {
      console.error("Logout error:", error);
      setAlert({
        type: "error",
        message: "Սխալ տեղի ունեցավ դուրս գալու ընթացքում",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center max-w-[600px] mx-auto p-5">
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
          Դուրս գալ
        </button>
      </div>
      {alert && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-md text-white ${
            alert.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}>
          {alert.message}
        </div>
      )}
      <TableGrid />
    </div>
  );
}
