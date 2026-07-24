import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const { error } = await signIn(form.email, form.password);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <>
      <Header />

      <main className="mx-auto flex min-h-[80vh] max-w-md items-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-5 rounded-xl border border-gray-300 p-6"
        >
          <h1 className="text-3xl font-semibold">Login</h1>

          {error && (
            <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-3"
            required
          />

          <div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-md border border-gray-300 p-3"
              required
            />
            <Link
              to="/forgot-password"
              className="flex text-sm justify-end p-1 text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700">
            Login
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
