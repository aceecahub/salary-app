"use client";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Clock, Send, Search, FileDown, Eye, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const PresensiPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState<"HADIR" | "IZIN" | "SAKIT">("HADIR");
  const [keterangan, setKeterangan] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  
  // Data States
  const [attendances, setAttendances] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]); // Untuk mapping Nama & Divisi
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "https://payroll.politekniklp3i-tasikmalaya.ac.id/api";

  // 1. Digital Clock (Sync dengan Jam Layar)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Logika Sinkronisasi ID via Email (Logika Teman)
  const getCorrectKaryawanId = async (currentToken: string, user: any) => {
    try {
      const res = await fetch(`${BASE_URL}/karyawan`, {
        headers: { Authorization: `Bearer ${currentToken}`, Accept: "application/json" }
      });
      const data = await res.json();
      const listKaryawan = data.data || data;
      const findMe = listKaryawan.find((k: any) => k.email === user.email);
      if (findMe) return findMe.id;
    } catch (e) {
      console.error("Gagal sinkronisasi ID:", e);
    }
    return user.id;
  };

  // 3. Helper Mendapatkan Info Karyawan (Nama & Divisi)
  const getEmployeeInfo = (idKaryawan: number) => {
    const emp = employees.find((e: any) => Number(e.id) === Number(idKaryawan));
    return {
      nama: emp ? emp.nama : `User ${idKaryawan}`,
      divisi: emp ? emp.divisi : "General"
    };
  };

  // 4. Fetch Data Utama
  const fetchData = useCallback(async () => {
    const storedToken = localStorage.getItem("access_token") || localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    
    if (!storedToken || !userString) return;
    
    const cleanToken = storedToken.replace(/"/g, '');
    const user = JSON.parse(userString);
    setToken(cleanToken);
    setUserData(user);
    setUserRole(user.role?.toLowerCase());

    try {
      // Ambil Data Karyawan (Untuk Admin mapping Nama/Divisi)
      const empRes = await fetch(`${BASE_URL}/karyawan`, {
        headers: { Authorization: `Bearer ${cleanToken}`, Accept: "application/json" }
      });
      const empData = await empRes.json();
      setEmployees(empData.data || empData);

      // Ambil Data Presensi
      const res = await fetch(`${BASE_URL}/presensi`, {
        headers: { "Authorization": `Bearer ${cleanToken}`, "Accept": "application/json" }
      });
      const result = await res.json();
      const allData = result.data || result;

      if (user.role?.toLowerCase() === "karyawan") {
        const validId = await getCorrectKaryawanId(cleanToken, user);
        const filtered = allData.filter((r: any) => Number(r.id_karyawan) === Number(validId));
        setAttendances(filtered);
      } else {
        setAttendances(allData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 5. Submit Presensi (Jam Sinkron dengan Digital Clock)
  const handleSubmit = async () => {
    if (!token || !userData) return alert("Sesi habis");
    setLoading(true);

    try {
      const validKaryawanId = await getCorrectKaryawanId(token, userData);
      const jamMasukRealtime = currentTime.toLocaleTimeString('it-IT', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });

      const payload = {
        id_karyawan: Number(validKaryawanId),
        tanggal: new Date().toISOString().split('T')[0],
        status: status,
        keterangan: keterangan || "-",
        jam_masuk: status === 'HADIR' ? jamMasukRealtime : "00:00:00",
        jam_keluar: "00:00:00"
      };

      const res = await fetch(`${BASE_URL}/presensi`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Gagal menyimpan presensi");

      alert(`Berhasil! Jam: ${jamMasukRealtime}`);
      setKeterangan("");
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />
      <div className="flex-1 flex flex-col text-[#001d3d]">
        <Header title="Presensi" />
        <main className="p-10 w-full overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            
            {/* Header Informasi & Jam Digital */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h1 className="text-[32px] font-bold mb-1">Presensi Harian</h1>
                <p className="text-gray-500 text-lg italic">Halo, <b>{userData?.name}</b></p>
              </div>
              <div className="bg-white shadow-sm rounded-3xl px-8 py-4 flex items-center gap-6 border border-gray-50">
                <div className="bg-[#eef5ff] p-3 rounded-2xl text-[#004a99]"><Clock size={32} /></div>
                <div className="text-right">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    {currentTime.toLocaleTimeString('id-ID').replace(/\./g, ':')}
                  </h2>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Waktu Sekarang</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
              
              {/* Tampilan ROLE KARYAWAN */}
              {userRole === "karyawan" && (
                <>
                  <div className="col-span-12 lg:col-span-4">
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50">
                      <div className="flex items-center gap-3 mb-10">
                        <div className="bg-[#e0f7f6] p-2 rounded-xl text-[#00b5ad]"><Send size={20} /></div>
                        <h3 className="text-xl font-bold">Kirim Kehadiran</h3>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase mb-4 tracking-widest">Status</label>
                          <div className="grid grid-cols-3 gap-3">
                            {(['HADIR', 'IZIN', 'SAKIT'] as const).map((s) => (
                              <button key={s} onClick={() => setStatus(s)}
                                className={`py-3.5 rounded-2xl font-bold text-sm transition-all ${
                                  status === s ? 'bg-[#004a99] text-white shadow-lg' : 'bg-[#f8f9fa] text-gray-400'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                        <textarea 
                          value={keterangan} onChange={(e) => setKeterangan(e.target.value)}
                          className="w-full bg-[#f8f9fa] border-none rounded-[24px] p-5 text-sm h-32 focus:ring-2 focus:ring-[#004a99]"
                          placeholder="Keterangan..."
                        />
                        <button onClick={handleSubmit} disabled={loading}
                          className="w-full bg-[#004a99] text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-100 hover:bg-[#003566] transition-all"
                        >
                          {loading ? "PROSES..." : "SUBMIT SEKARANG"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-8 bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
                    <div className="p-10 pb-6 font-bold text-xl">Riwayat Anda</div>
                    <div className="px-6 pb-6 overflow-x-auto text-left">
                      <table className="w-full">
                        <thead className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b">
                          <tr><th className="pb-6 px-4">Tanggal</th><th className="pb-6 px-4">Jam Masuk</th><th className="pb-6 px-4">Status</th></tr>
                        </thead>
                        <tbody className="divide-y">
                          {attendances.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="py-6 px-4 font-bold">{row.tanggal}</td>
                              <td className="py-6 px-4 text-[#004a99] font-bold">{row.jam_masuk}</td>
                              <td className="py-6 px-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${row.status === "HADIR" ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"}`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* Tampilan ROLE ADMIN */}
              {userRole === "admin" && (
                <div className="col-span-12">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Daftar Presensi Karyawan</h2>
                    <div className="relative w-72">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input 
                        type="text" placeholder="Cari nama karyawan..." 
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl outline-none text-sm border border-gray-100"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-[#f8fbff] text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        <tr>
                          <th className="py-5 px-8">Karyawan</th>
                          <th className="py-5 px-4">Divisi</th>
                          <th className="py-5 px-4">Tanggal</th>
                          <th className="py-5 px-4">Jam Masuk</th>
                          <th className="py-5 px-4 text-center">Status</th>
                          <th className="py-5 px-8 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {attendances
                          .filter(a => getEmployeeInfo(a.id_karyawan).nama.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((row, idx) => {
                            const info = getEmployeeInfo(row.id_karyawan);
                            return (
                              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-6 px-8">
                                  <div className="font-bold">{info.nama}</div>
                                  <div className="text-[10px] text-gray-400">ID: {row.id_karyawan}</div>
                                </td>
                                <td className="py-6 px-4">
                                  <span className="px-3 py-1 bg-blue-50 text-[#004a99] text-[10px] font-bold rounded-lg uppercase">
                                    {info.divisi}
                                  </span>
                                </td>
                                <td className="py-6 px-4 text-sm text-gray-500">{row.tanggal}</td>
                                <td className="py-6 px-4 font-bold text-[#004a99]">{row.jam_masuk}</td>
                                <td className="py-6 px-4 text-center">
                                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${row.status === "HADIR" ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"}`}>
                                    {row.status}
                                  </span>
                                </td>
                                <td className="py-6 px-8 text-right">
                                  <button className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:bg-[#004a99] hover:text-white transition-all"><Eye size={18} /></button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PresensiPage;