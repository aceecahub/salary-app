"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function Register() {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <main className="w-full max-w-md bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center mb-8">
            <div className="bg-gray-100 p-4 rounded-2xl mb-4">
                <UserPlus size={32} className="text-gray-600" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500 mt-2 text-center text-sm">Join us today! Please enter your details to register.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
            <div>
                <label htmlFor="name" className="block font-bold text-gray-800 mb-1.5 ml-1 text-sm">Full Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block font-bold text-gray-800 mb-1.5 ml-1 text-sm">Email Address</label>
                <input
                    type="email"
                    id="email"
                    placeholder="admin@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block font-bold text-gray-800 mb-1.5 ml-1 text-sm">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
                    required
                />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <button
                disabled={loading}
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
                {loading ? "Creating account..." : "Register"}
            </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span 
                className="text-blue-900 font-bold cursor-pointer hover:underline" 
                onClick={() => router.push("/login")}
            >
                Login
            </span>
        </div>
      </main>
    </div>
  );
}
