"use client";
import React from "react";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface Jabatan {
  id: number;
  jabatan: string;
}

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number | string;
  status: string;
  jabatan?: {
    jabatan: string;
  };
}

const KaryawanPage = () => {
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);

  const fetchKar = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setKaryawanList(data.data || data);
    } catch (error) {
      console.error("Error fetching karyawan:", error);
    }
  };

  const fetchJab = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setJabatanList(data.data || data);
    } catch (error) {
      console.error("Error fetching jabatan:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchKar();
      fetchJab();
    }
  }, [token]);

    const getNamaJabatan = (id_jabatan: number | string) => {
    const found = jabatanList.find((d) => d.id === Number(id_jabatan));
    return found ? found.jabatan : "Jabatan tidak ditemukan";
  };

  const handleTambahKaryawan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const payload = {
      nik: formData.get("nik"),
      nama: formData.get("nama"),
      email: formData.get("email"),
      tempat_lahir: formData.get("tempat_lahir"),
      tanggal_lahir: formData.get("tanggal_lahir"),
      alamat: formData.get("alamat"),
      id_jabatan: formData.get("id_jabatan"),
      status: formData.get("status"),
    };

    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", {
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
        throw new Error(result.message || "Gagal menambah karyawan");
      }

      form.reset();
      fetchKar();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Gagal menghapus karyawan");
      fetchKar();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Data Karyawan" />
        <main className="p-7">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Management Karyawan</h1>
          <p className="text-gray-600 mb-6">Kelola data karyawan perusahaan di sini.</p>
          <div className="flex flex-col xl:flex-row gap-10 items-start">
            {/* card tambah karyawan */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 w-full xl:w-1/3">
              <div className="flex p-2 items-center gap-2 mb-4">
                <div className="bg-gray-200 p-2 rounded-xl">
                  <Plus size={20} strokeWidth={4} className="text-gray-600" />
                </div>
                <p className="text-lg font-bold text-gray-800">Tambah Karyawan</p>
              </div>
              <form onSubmit={handleTambahKaryawan}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nik" className="block font-bold text-gray-800 text-sm mb-1">NIK</label>
                      <input type="text" id="nik" name="nik"
                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                        placeholder="Masukan NIK" required />
                    </div>
                    <div>
                      <label htmlFor="nama" className="block font-bold text-gray-800 text-sm mb-1">Nama</label>
                      <input type="text" id="nama" name="nama"
                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                        placeholder="Masukan Nama" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-bold text-gray-800 text-sm mb-1">Email</label>
                    <input type="email" id="email" name="email"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                      placeholder="Masukan Email" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tempat_lahir" className="block font-bold text-gray-800 text-sm mb-1">Tempat Lahir</label>
                      <input type="text" id="tempat_lahir" name="tempat_lahir"
                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                        placeholder="Kota" required />
                    </div>
                    <div>
                      <label htmlFor="tanggal_lahir" className="block font-bold text-gray-800 text-sm mb-1">Tanggal Lahir</label>
                      <input type="date" id="tanggal_lahir" name="tanggal_lahir"
                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="alamat" className="block font-bold text-gray-800 text-sm mb-1">Alamat</label>
                    <textarea id="alamat" name="alamat"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm resize-y min-h-20"
                      placeholder="Masukan Alamat" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="id_jabatan" className="block font-bold text-gray-800 text-sm mb-1">Jabatan</label>
                      <select id="id_jabatan" name="id_jabatan"
                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm" required>
                        <option value="">Pilih Jabatan</option>
                        {jabatanList.map((jab) => (
                          <option key={jab.id} value={jab.id}>{jab.jabatan}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block font-bold text-gray-800 text-sm mb-1">Status</label>
                      <select id="status" name="status"
                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm" required>
                        <option value="">Pilih Status</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="bg-blue-900 text-white p-3 rounded-xl w-full mt-2 hover:bg-blue-800 transition-colors font-bold disabled:opacity-50">
                    {loading ? "Menyimpan..." : "Tambah Karyawan"}
                  </button>
                </div>
              </form>
            </div>

            {/* card table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full xl:flex-1 overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-50">
                <p className="text-lg font-bold text-gray-800">Daftar Karyawan</p>
                <div className="bg-blue-50 px-4 py-1 rounded-full">
                  <p className="text-blue-800 text-xs font-bold">{karyawanList.length} TOTAL DATA</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-16">No</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">NIK</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Nama</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Jabatan</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center">Status</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {karyawanList.length > 0 ? (
                      karyawanList.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 px-6 text-gray-600 text-sm text-center">{index + 1}</td>
                          <td className="py-4 px-6 text-gray-800 font-medium text-sm">{item.nik}</td>
                          <td className="py-4 px-6 text-gray-800 font-semibold text-sm">{item.nama}</td>
                          <td className="py-4 px-6 text-gray-600 text-sm">
                            <span className="bg-gray-100 px-2 py-1 rounded-md">{getNamaJabatan(item.id_jabatan)}</span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                              item.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center gap-1">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Pencil size={16} />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleDelete(item.id)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-20 text-center text-gray-400 text-sm">
                          Belum ada data karyawan.
                        </td>
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

export default KaryawanPage;
