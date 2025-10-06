import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance"; // <- сюда

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      setLoading(true);

      await axiosInstance.post("/auth/login", { username, password });

      toast.success("Մուտքը հաջողությամբ կատարվեց!");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Սխալ օգտանուն կամ գաղտնաբառ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-50 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Բարի վերադարձ 👋
          </h2>
          <p className="text-gray-500">
            Խնդրում ենք մուտք գործել շարունակելու համար
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Օգտանուն"
              required
              className="w-full pl-10 pr-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400 transition"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Գաղտնաբառ"
              required
              className="w-full pl-10 pr-10 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-400 transition"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition disabled:opacity-50">
            {loading ? "Մուտք է գործում..." : "Մուտք գործել"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Խնդրում ենք կապվել ադմինիստրատորի հետ, եթե խնդիրներ եք ունենում։
        </div>
      </div>
    </div>
  );
}
