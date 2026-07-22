import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { signUp } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");
    console.log(form);

    const { error } = await signUp(
      form.firstName,
      form.lastName,
      form.email,
      form.password,
    );

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Account created. Check your email to verify your account.");
  }

  return (
    <>
      <Header />

      <main className="mx-auto flex min-h-[80vh] max-w-md items-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-5 rounded-xl border border-gray-300 p-6"
        >
          <h1 className="text-3xl font-semibold">Register</h1>

          {error && (
            <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>
          )}

          {message && (
            <p className="rounded bg-green-100 p-3 text-green-700">{message}</p>
          )}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full rounded border border-gray-300 p-3"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full rounded border border-gray-300 p-3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-3"
            required
          />

          <button className="w-full rounded-md bg-green-600 py-3 text-white hover:bg-green-700">
            Register
          </button>

          <p className="text-center text-sm">
            Already have an account?
            <Link to="/login" className="ml-4 text-green-600">
              Login
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
