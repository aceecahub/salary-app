"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Register gagal");
      }

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-semibold">Sign up</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="namaxxx"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          <input
            type="email"
            placeholder="admin@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-black py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p>Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/login")}>Login</span></p>
        </form>
      </main>
    </div>
  );
}
