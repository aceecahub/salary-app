"use client";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Clock, Send, Calendar, Search, FileDown, Printer, Eye, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

// Types untuk Admin Table
interface AttendanceRecord {
  id: number;
  name: string;
  employeeId: string;
  division: string;
  checkInTime: string | "-";
  status: 'HADIR' | 'IZIN' | 'SAKIT';
  initials: string;
}

const PresensiPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("Sakit");
  const [userRole, setUserRole] = useState<string | null>(null);

  // Mock Data untuk Admin
  const adminData: AttendanceRecord[] = [
    { id: 1, name: "Ahmad Fauzi", employeeId: "EMP001", division: "IT", checkInTime: "08:00", status: "HADIR", initials: "A" },
    { id: 2, name: "Siti Aminah", employeeId: "EMP002", division: "HR", checkInTime: "08:15", status: "HADIR", initials: "S" },
    { id: 3, name: "Budi Santoso", employeeId: "EMP003", division: "Finance", checkInTime: "-", status: "IZIN", initials: "B" },
    { id: 4, name: "Rina Wijaya", employeeId: "EMP004", division: "Marketing", checkInTime: "-", status: "SAKIT", initials: "R" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserRole(user.role);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />

      <div className="flex-1 flex flex-col">
        <Header title="Presensi" />

        <main className="p-10 w-full overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            
            {/* TAMPILAN KHUSUS ADMIN */}
            {userRole === "admin" && (
              <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#001d3d] mb-1">Monitoring Presensi</h2>
                    <p className="text-gray-500">Laporan kehadiran seluruh karyawan secara real-time.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 transition shadow-sm font-bold text-sm">
                      <FileDown size={18} /> Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#004a99] text-white rounded-2xl hover:bg-[#003566] transition shadow-lg shadow-[#004a99]/20 font-bold text-sm">
                      <Printer size={18} /> Cetak Laporan
                    </button>
                  </div>
                </div>

                {/* Filter Box */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Cari karyawan..." className="w-full pl-12 pr-4 py-3 bg-[#f8f9fa] rounded-2xl focus:ring-2 focus:ring-[#004a99] outline-none text-sm transition-all" />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="dd / mm / yyyy" className="w-full pl-12 pr-4 py-3 bg-[#f8f9fa] rounded-2xl outline-none text-sm" />
                  </div>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-[#f8f9fa] rounded-2xl outline-none text-sm appearance-none font-medium text-gray-600">
                      <option>Semua Divisi</option>
                      <option>IT</option>
                      <option>HR</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Table Monitoring */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
                  <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#001d3d]">Data Kehadiran Hari Ini</h3>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Hadir: 120</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Izin: 5</span>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#f8fbff]">
                        <tr>
                          <th className="py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">No</th>
                          <th className="py-5 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Karyawan</th>
                          <th className="py-5 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Divisi</th>
                          <th className="py-5 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Jam Masuk</th>
                          <th className="py-5 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Status</th>
                          <th className="py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {adminData.map((row) => (
                          <tr key={row.id} className="group hover:bg-[#f8fbff]/50 transition-colors">
                            <td className="py-6 px-8 font-bold text-gray-400">{row.id}</td>
                            <td className="py-6 px-4">
                              <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-2xl bg-[#eef5ff] text-[#004a99] flex items-center justify-center font-black text-sm border border-blue-50">
                                  {row.initials}
                                </div>
                                <div>
                                  <p className="font-bold text-[#001d3d] leading-none mb-1">{row.name}</p>
                                  <p className="text-xs text-gray-400 font-medium">{row.employeeId}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-6 px-4">
                              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                {row.division}
                              </span>
                            </td>
                            <td className="py-6 px-4 font-bold text-[#001d3d]">{row.checkInTime}</td>
                            <td className="py-6 px-4 text-center">
                              <span className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest inline-block ${
                                row.status === "HADIR" ? "bg-[#e2f9f0] text-[#1eb47d]" : 
                                row.status === "IZIN" ? "bg-[#fff4e5] text-[#ff9800]" : "bg-[#ffeeee] text-[#ff4d4d]"
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="py-6 px-8 text-right">
                              <button className="p-2.5 bg-[#f8f9fa] text-gray-400 rounded-xl hover:bg-[#004a99] hover:text-white transition-all shadow-sm">
                                <Eye size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr className="my-12 border-gray-100" />
              </div>
            )}
            
            {/* TAMPILAN KHUSUS USER (Hanya muncul jika role adalah user) */}
            {userRole === "user" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Presensi Kehadiran</h1>
                <p className="text-gray-500 text-lg">Silahkan melakukan presensi harian Anda.</p>
              </div>

              {/* Digital Clock Widget */}
              <div className="bg-white shadow-sm rounded-3xl px-8 py-4 flex items-center gap-6 border border-gray-50 shrink-0">
                <div className="bg-[#eef5ff] p-3 rounded-2xl text-[#004a99]">
                  <Clock size={32} />
                </div>
                <div className="text-right">
                  <h2 className="text-3xl font-extrabold text-[#001d3d] tracking-tight whitespace-nowrap">
                    {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':')}
                  </h2>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
              {/* KOLOM KIRI & KANAN (Tetap seperti kode awal Anda) */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                {/* Form Card */}
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="bg-[#e0f7f6] p-2 rounded-xl text-[#00b5ad]">
                      <Send size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-[#001d3d]">Form Presensi</h3>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Status Kehadiran</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Hadir', 'Izin', 'Sakit'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`py-3.5 rounded-2xl font-bold text-sm transition-all ${
                              status === s 
                              ? 'bg-[#004a99] text-white' 
                              : 'bg-[#f8f9fa] text-gray-400 hover:bg-gray-100'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                        
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Keterangan (Opsional)</label>
                      <textarea 
                        placeholder="Contoh: Sakit flu, Izin urusan keluarga..."
                        className="w-full bg-[#f8f9fa] border-none rounded-[24px] p-5 text-sm text-gray-600 focus:ring-2 focus:ring-[#004a99] h-36 resize-none placeholder:text-gray-300"
                      />
                    </div>

                    <button className="w-full bg-[#004a99] hover:bg-[#003566] text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-[#004a99]/20 flex items-center justify-center gap-3">
                      <span className="text-xl">✓</span> Submit Kehadiran
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1e4da1] to-[#00214d] p-10 rounded-[35px] text-white shadow-2xl shadow-blue-900/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 border-2 border-white/50 rounded-full flex items-center justify-center text-[12px] font-black">i</div>
                    <h4 className="font-bold text-xl">Info Penting</h4>
                  </div>
                  <p className="text-blue-100/80 text-base leading-relaxed">
                    Batas waktu presensi masuk adalah pukul 08:30 WIB. Keterlambatan akan dicatat secara otomatis oleh sistem.
                  </p>
                </div>
              </div>

              {/* KOLOM KANAN: Riwayat Table */}
              <div className="col-span-12 lg:col-span-8 bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden flex flex-col">
                <div className="p-10 pb-6 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#001d3d]">Riwayat Kehadiran Pribadi</h3>
                  <button className="text-[#004a99] font-bold text-sm hover:underline tracking-tight">Lihat Semua</button>
                </div>

                <div className="px-6 pb-6 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="pb-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Tanggal</th>
                        <th className="pb-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Masuk</th>
                        <th className="pb-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Pulang</th>
                        <th className="pb-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Status</th>
                        <th className="pb-6 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Ket</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { tgl: "1 Mar 2024", m: "08:00", p: "17:00", s: "HADIR", k: "-" },
                        { tgl: "28 Feb 2024", m: "08:15", p: "17:05", s: "HADIR", k: "-" },
                        { tgl: "27 Feb 2024", m: "-", p: "-", s: "IZIN", k: "Urusan Keluarga" },
                        { tgl: "26 Feb 2024", m: "07:55", p: "17:00", s: "HADIR", k: "-" },
                      ].map((row, idx) => (
                        <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-6 px-4 font-bold text-[#001d3d] border-t border-gray-50">{row.tgl}</td>
                          <td className="py-6 px-4 text-gray-500 font-medium border-t border-gray-50">{row.m}</td>
                          <td className="py-6 px-4 text-gray-500 font-medium border-t border-gray-50">{row.p}</td>
                          <td className="py-6 px-4 text-center border-t border-gray-50">
                            <span className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest inline-block ${
                              row.s === "HADIR" ? "bg-[#e2f9f0] text-[#1eb47d]" : "bg-[#fff4e5] text-[#ff9800]"
                            }`}>
                              {row.s}
                            </span>
                          </td>
                          <td className="py-6 px-4 text-gray-400 italic text-sm border-t border-gray-50">{row.k}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  </div>
);
};

export default PresensiPage;