"use client";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DivisiPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [divisiList, setDivisiList] = useState([
    { id: 1, nama_divisi: "IT" },
    { id: 2, nama_divisi: "Marketing" },
  ]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserRole(user.role);
        if (user.role !== "admin") {
          router.push("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error parsing user:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  if (loading) return null;

const handleTambahDivisi = (e: React.FormEvent) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const elements = target.elements;
  const namaDivisi = (elements.namedItem("nama_divisi") as HTMLInputElement).value;
  setDivisiList([...divisiList, { id: divisiList.length + 1, nama_divisi: namaDivisi }]);
}

const handleDelete = (id: number) => {
  setDivisiList(divisiList.filter((divisi) => divisi.id !== id));
}

  return (
<div className="flex min-h-screen bg-gray-50">
    <Navigation />
    <div className="flex-1 flex flex-col">
        <Header title="Data Divisi" />
        <main className="p-7">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Management Divisi</h1>
            <p className="text-gray-600 mb-6">Configure and manage company departments.</p>
            <div className="flex gap-10 items-start">

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-auto w-120">
                  <div className="flex p-2 items-center gap-2">
                    {/* icon plus */}
                    <div className="bg-gray-200 p-2 rounded-xl">
                    <Plus size={20} strokeWidth={4} color="gray"/>
                    </div>
                    <p className="text-lg font-bold text-gray-800">Tambah Divisi</p>

                  </div>
                  {/* form */}
                    <div className="p-2">
                      <form onSubmit={handleTambahDivisi}>
                        <label htmlFor="nama_divisi" className="font-bold text-gray-800">Nama Divisi</label>
                        <input type="text" id="nama_divisi" name="nama_divisi" className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1" placeholder="Contoh: IT" />
                        <button type="submit" className="cursor-pointer bg-blue-900 text-white p-2 rounded-xl w-full mt-5 hover:bg-blue-800 transition-colors"><span className="font-bold">Tambah</span></button>
                      </form>
                    </div>
                </div>

                {/* card table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 h-auto w-full">
                  <div className="flex p-2 items-center gap-2 p-6">
                    <div className="flex justify-between w-full">
                    <p className="text-lg font-bold text-gray-800">Daftar Divisi</p>
                    <div className="bg-green-200 h-6 w-25 rounded-xl flex justify-center items-center">
                      <p className="text-center text-green-800 text-sm font-bold">{divisiList.length} Item total</p>
                    </div>
                    </div>
                  </div>

                  {/* table */}
                  <div className="overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-100/50">
                          <th className="py-4 px-4 font-bold text-gray-800/60 w-16 text-sm text-center">No</th>
                          <th className="py-4 px-4 font-bold text-gray-800/60 text-sm text-center">Nama Divisi</th>
                          <th className="py-4 px-4 font-bold text-gray-800/60 text-center w-32 text-sm">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {divisiList.map((items, index) => (
                          <tr key={items.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 text-gray-600 text-center font-medium">{index + 1}</td>
                            <td className="py-4 px-4 text-gray-800 text-center">{items.nama_divisi}</td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex justify-center gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                  <Pencil size={18} />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus" onClick={() => handleDelete(items.id)}>
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
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
