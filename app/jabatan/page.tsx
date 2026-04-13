"use client";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Divisi {
  id: number;
  divisi: string;
}

interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number | string;
  gaji_pokok: number;
  divisi?: {
    divisi: string;
  };
}

const JabatanPage = () => {
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);

  const fetchJab = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setJabatanList(data.data || data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDivisi = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDivisiList(data.data || data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJab();
      fetchDivisi();
    }
  }, [token]);

  const getNamaDivisi = (id_divisi: number | string) => {
    const found = divisiList.find((d) => d.id === Number(id_divisi));
    return found ? found.divisi : "Divisi tidak ditemukan";
  };

  const handleTambahJabatan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const payload = {
      jabatan: formData.get("jabatan"),
      id_divisi: formData.get("id_divisi"),
      gaji_pokok: formData.get("gaji_pokok"),
    };

    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
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
        throw new Error(result.message || "Gagal menambah jabatan");
      }

      form.reset();
      fetchJab();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus jabatan");
      fetchJab();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Data Jabatan" />
        <main className="p-7">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Management Jabatan</h1>
          <p className="text-gray-600 mb-6">Kelola data jabatan dan gaji pokok perusahaan.</p>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            {/* Form Tambah Jabatan */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 w-full lg:w-1/3">
              <div className="flex p-2 items-center gap-2 mb-4">
                <div className="bg-gray-200 p-2 rounded-xl">
                  <Plus size={20} strokeWidth={4} className="text-gray-600" />
                </div>
                <p className="text-lg font-bold text-gray-800">Tambah Jabatan</p>
              </div>
              <form onSubmit={handleTambahJabatan}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="jabatan" className="block font-bold text-gray-800 text-sm mb-1">Nama Jabatan</label>
                    <input
                      type="text"
                      id="jabatan"
                      name="jabatan"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Contoh: Manager"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="id_divisi" className="block font-bold text-gray-800 text-sm mb-1">Pilih Divisi</label>
                    <select
                      id="id_divisi"
                      name="id_divisi"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                      required
                    >
                      <option value="">Pilih Divisi</option>
                      {divisiList.map((div) => (
                        <option key={div.id} value={div.id}>{div.divisi}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="gaji_pokok" className="block font-bold text-gray-800 text-sm mb-1">Gaji Pokok</label>
                    <input
                      type="number"
                      id="gaji_pokok"
                      name="gaji_pokok"
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Contoh: 5000000"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-900 text-white p-3 rounded-xl w-full mt-2 hover:bg-blue-800 transition-colors font-bold disabled:opacity-50"
                  >
                    {loading ? "Menyimpan..." : "Tambah Jabatan"}
                  </button>
                </div>
              </form>
            </div>

            {/* Tabel Jabatan */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full lg:flex-1">
              <div className="flex justify-between items-center p-6 border-b border-gray-50">
                <p className="text-lg font-bold text-gray-800">Daftar Jabatan</p>
                <div className="bg-blue-50 px-4 py-1 rounded-full">
                  <p className="text-blue-800 text-xs font-bold">{jabatanList.length} DATA</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-20">No</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Jabatan</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Divisi</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Gaji Pokok</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-32">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jabatanList.length > 0 ? (
                      jabatanList.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-gray-600 text-sm text-center font-medium">{index + 1}</td>
                          <td className="py-4 px-6 text-gray-800 font-semibold text-sm">{item.jabatan}</td>
                          <td className="py-4 px-6 text-gray-600 text-sm">
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium text-xs">
                              {getNamaDivisi(item.id_divisi)}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-800 font-medium text-sm">
                            Rp {Number(item.gaji_pokok).toLocaleString("id-ID")}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center gap-1">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Pencil size={16} />
                              </button>
                              <button
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                onClick={() => handleDelete(item.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-20 text-center text-gray-400 text-sm">Belum ada data jabatan.</td>
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

export default JabatanPage;