"use client";
import React from "react";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserPage = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const userString = localStorage.getItem("user");

    if (!storedToken || !userString) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userString);
      if (user.role.toLowerCase() !== "admin") {
        router.push("/dashboard");
        return;
      }
      setToken(storedToken);
      setLoading(false);
    } catch (error) {
      console.error("Error parsing user:", error);
      router.push("/login");
    }
  }, [router]);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUserList(data.data || data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleTambahUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        // Jika ada detail error dari API (misal validation errors)
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(result.message || "Gagal menambah user");
      }

      form.reset();
      fetchUsers();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus user");
      fetchUsers();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Data User" />
        <main className="p-7">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Management User</h1>
          <p className="text-gray-600 mb-6">Kelola data pengguna sistem di sini.</p>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Form Tambah User */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 w-full lg:w-1/3">
              <div className="flex p-2 items-center gap-2 mb-4">
                <div className="bg-gray-200 p-2 rounded-xl">
                  <Plus size={20} strokeWidth={4} className="text-gray-600" />
                </div>
                <p className="text-lg font-bold text-gray-800">Tambah User</p>
              </div>
              <form onSubmit={handleTambahUser}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-bold text-gray-800 text-sm mb-1">Nama</label>
                    <input type="text" id="name" name="name"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      placeholder="Contoh: Administrator" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-bold text-gray-800 text-sm mb-1">Email</label>
                    <input type="email" id="email" name="email"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      placeholder="Contoh: admin@mail.com" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block font-bold text-gray-800 text-sm mb-1">Password</label>
                    <input type="password" id="password" name="password"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      placeholder="••••••••" required />
                  </div>
                  <div>
                    <label htmlFor="role" className="block font-bold text-gray-800 text-sm mb-1">Role</label>
                    <select id="role" name="role"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm cursor-pointer" required>
                      <option value="">Pilih Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="bg-blue-900 text-white p-3 rounded-xl w-full mt-2 hover:bg-blue-800 transition-colors font-bold disabled:opacity-50">
                    {isSubmitting ? "Menyimpan..." : "Tambah User"}
                  </button>
                </div>
              </form>
            </div>

            {/* Tabel User */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full lg:flex-1 overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-50">
                <p className="text-lg font-bold text-gray-800">Daftar User</p>
                <div className="bg-blue-50 px-4 py-1 rounded-full">
                  <p className="text-blue-800 text-xs font-bold">{userList.length} DATA</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-20">No</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Nama</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Email</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center">Role</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.length > 0 ? (
                      userList.map((user, index) => (
                        <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-gray-600 text-sm text-center font-medium">{index + 1}</td>
                          <td className="py-4 px-6 text-gray-800 font-semibold text-sm">{user.name}</td>
                          <td className="py-4 px-6 text-gray-600 text-sm">{user.email}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                              user.role.toLowerCase() === "admin" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center gap-1">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-20 text-center text-gray-400 text-sm">Belum ada data user.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPage;
