"use client";

import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

// Interface disesuaikan: Menggunakan field 'divisi'
interface Divisi {
  id: number;
  divisi: string;
}

const DivisiPage = () => {
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);

  const fetchDivisi = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil data");
      }

      // Biasanya API mengembalikan data di dalam properti 'data'
      setDivisiList(data.data || data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchDivisi();
    }
  }, [token]);

  const handleTambahDivisi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // 1. Ambil data dari input dengan name="divisi"
    const divisi = formData.get("divisi");

    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // 2. Kirim JSON body { "divisi": "..." }
          body: JSON.stringify({ divisi }),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(result.message || "Gagal menambah divisi");
      }

      form.reset();
      fetchDivisi(); 
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return;

    try {
      const res = await fetch(
        `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Gagal menghapus divisi");
      fetchDivisi();
    } catch (err: any) {
      alert(err.message);
    }
  };
    
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Data Divisi" />
        <main className="p-7">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Management Divisi</h1>
          <p className="text-gray-600 mb-6">Kelola departemen perusahaan di sini.</p>
          
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* CARD FORM */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 w-full lg:w-1/3">
              <div className="flex p-2 items-center gap-2 mb-4">
                <div className="bg-gray-200 p-2 rounded-xl">
                  <Plus size={20} strokeWidth={4} className="text-gray-600"/>
                </div>
                <p className="text-lg font-bold text-gray-800">Tambah Divisi</p>
              </div>
              
              <form onSubmit={handleTambahDivisi}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="divisi" className="block font-bold text-gray-700 text-sm mb-1">
                      Nama Divisi
                    </label>
                    <input 
                      type="text" 
                      id="divisi" 
                      name="divisi" // Sesuai dengan database
                      className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                      placeholder="Contoh: IT Support" 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-blue-900 text-white p-3 rounded-xl w-full hover:bg-blue-800 transition-colors font-bold"
                  >
                    Simpan Divisi
                  </button>
                </div>
              </form>
            </div>

            {/* CARD TABEL */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full lg:flex-1">
              <div className="flex justify-between items-center p-6 border-b border-gray-50">
                <p className="text-lg font-bold text-gray-800">Daftar Divisi</p>
                <div className="bg-blue-50 px-4 py-1 rounded-full">
                  <p className="text-blue-800 text-xs font-bold">{divisiList.length} TOTAL DATA</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-20">No</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase">Nama Divisi</th>
                      <th className="py-4 px-6 font-bold text-gray-500 text-xs uppercase text-center w-32">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {divisiList.length > 0 ? (
                      divisiList.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 px-6 text-gray-600 text-center text-sm">{index + 1}</td>
                          <td className="py-4 px-6 text-gray-800 font-semibold text-sm">{item.divisi}</td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center gap-1">
                              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                <Pencil size={16} />
                              </button>
                              <button 
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
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
                        <td colSpan={3} className="py-20 text-center text-gray-400 text-sm">
                          {error ? `Error: ${error}` : "Data divisi masih kosong."}
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

export default DivisiPage;