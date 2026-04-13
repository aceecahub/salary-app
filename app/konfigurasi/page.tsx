"use client";
import React from "react";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Konfigurasi {
  id: number;
  tahun: string;
  jatah_cuti_tahunan: number;
  nilai_uang_per_cuti: number;
  aktif: boolean;
}

const KonfigurasiPage = () => {
  const router = useRouter();
  const [konfigurasiList, setKonfigurasiList] = useState<Konfigurasi[]>([]);
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

  const fetchKonfigurasi = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setKonfigurasiList(data.data || data);
    } catch (error) {
      console.error("Error fetching konfigurasi:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchKonfigurasi();
    }
  }, [token]);

  const handleTambahKonfigurasi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const payload = {
      tahun: formData.get("tahun"),
      jatah_cuti_tahunan: formData.get("jatah_cuti_tahunan"),
      nilai_uang_per_cuti: formData.get("nilai_uang_per_cuti"),
      aktif: formData.get("aktif") === "true",
    };

    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(result.message || "Gagal menambah konfigurasi");
      }

      form.reset();
      fetchKonfigurasi();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus konfigurasi ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus konfigurasi");
      fetchKonfigurasi();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Konfigurasi" />
        <main className="p-7">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Management Konfigurasi</h1>
          <p className="text-gray-600 mb-6">Kelola konfigurasi sistem dan jatah cuti tahunan.</p>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Form Tambah Konfigurasi */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 w-full lg:w-1/3">
              <div className="flex p-2 items-center gap-2 mb-4">
                <div className="bg-gray-200 p-2 rounded-xl">
                  <Plus size={20} strokeWidth={4} className="text-gray-600" />
                </div>
                <p className="text-lg font-bold text-gray-800">Tambah Konfigurasi</p>
              </div>
              <form onSubmit={handleTambahKonfigurasi}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="tahun" className="block font-bold text-gray-800 text-sm mb-1">Tahun</label>
                    <input type="text" id="tahun" name="tahun"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      placeholder="Contoh: 2024" required />
                  </div>
                  <div>
                    <label htmlFor="jatah_cuti_tahunan" className="block font-bold text-gray-800 text-sm mb-1">Jatah Cuti Tahunan</label>
                    <input type="number" id="jatah_cuti_tahunan" name="jatah_cuti_tahunan"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      placeholder="Contoh: 12" required />
                  </div>
                  <div>
                    <label htmlFor="nilai_uang_per_cuti" className="block font-bold text-gray-800 text-sm mb-1">Nilai Uang Percuti</label>
                    <input type="number" id="nilai_uang_per_cuti" name="nilai_uang_per_cuti"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      placeholder="Contoh: 100000" required />
                  </div>
                  <div>
                    <label htmlFor="aktif" className="block font-bold text-gray-800 text-sm mb-1">Status</label>
                    <select id="aktif" name="aktif"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm cursor-pointer" required>
                      <option value="">Pilih Status</option>
                      <option value="true">Aktif</option>
                      <option value="false">Tidak Aktif</option>
                    </select>
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="bg-blue-900 text-white p-3 rounded-xl w-full mt-2 hover:bg-blue-800 transition-colors font-bold disabled:opacity-50">
                    {isSubmitting ? "Menyimpan..." : "Tambah Konfigurasi"}
                  </button>
                </div>
              </form>
            </div>

            {/* Tabel Konfigurasi */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full lg:flex-1 overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-50">
                <p className="text-lg font-bold text-gray-800">Daftar Konfigurasi</p>
                <div className="bg-blue-50 px-4 py-1 rounded-full">
                  <p className="text-blue-800 text-xs font-bold">{konfigurasiList.length} DATA</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-20">No</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Tahun</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center">Jatah Cuti</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-right">Nilai Uang</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center">Status</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {konfigurasiList.length > 0 ? (
                      konfigurasiList.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-gray-600 text-sm text-center font-medium">{index + 1}</td>
                          <td className="py-4 px-6 text-gray-800 font-semibold text-sm">{item.tahun}</td>
                          <td className="py-4 px-6 text-gray-600 text-sm text-center">{item.jatah_cuti_tahunan} Hari</td>
                          <td className="py-4 px-6 text-gray-800 font-medium text-sm text-right">
                            Rp {Number(item.nilai_uang_per_cuti).toLocaleString("id-ID")}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                              item.aktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                              {item.aktif ? "Aktif" : "Tidak Aktif"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center gap-1">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-20 text-center text-gray-400 text-sm">Belum ada data konfigurasi.</td>
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

export default KonfigurasiPage;
