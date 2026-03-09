"use client";
import Navigation from "../../layout/navigation";
import Header from "../../layout/header";
import { Search, Download, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

// --- Interface Data Saldo Cuti ---
interface LeaveBalance {
  id: number;
  name: string;
  employeeId: string;
  division: string;
  total: number;
  used: number;
  remaining: number;
}

const ReportSaldoCutiPage = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  // --- Mock Data Sesuai Foto ---
  const leaveData: LeaveBalance[] = [
    { id: 1, name: "Ahmad Fauzi", employeeId: "EMP001", division: "IT", total: 12, used: 4, remaining: 8 },
    { id: 2, name: "Siti Aminah", employeeId: "EMP002", division: "HR", total: 12, used: 2, remaining: 10 },
    { id: 3, name: "Budi Santoso", employeeId: "EMP003", division: "Finance", total: 12, used: 12, remaining: 0 },
    { id: 4, name: "Rina Wijaya", employeeId: "EMP004", division: "Marketing", total: 15, used: 5, remaining: 10 },
  ];

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserRole(user.role);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

  // Proteksi Halaman Admin
  if (userRole !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <p className="font-bold text-[#001d3d]">Memuat data atau akses ditolak...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />

      <div className="flex-1 flex flex-col">
        <Header title="Report Saldo Cuti" />

        <main className="p-10 w-full overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            
            {/* Header Section */}
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Report Saldo Cuti</h1>
                <p className="text-gray-500 text-lg">Monitor saldo dan penggunaan cuti seluruh karyawan.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#004267] text-white rounded-2xl hover:bg-[#003554] transition shadow-lg shadow-[#004267]/20 font-bold">
                <Download size={20} /> Download Report
              </button>
            </div>

            {/* Search & Stats Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Cari nama karyawan..." 
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[24px] shadow-sm focus:ring-2 focus:ring-[#004a99]/20 outline-none transition-all"
                />
              </div>

              {/* Total Saldo Card */}
              <div className="bg-[#eefcf5] px-8 py-4 rounded-[24px] border border-[#d1f5e4] flex justify-between items-center min-w-[300px] shadow-sm">
                <span className="text-[11px] font-black text-[#1eb47d] uppercase tracking-widest">Total Saldo</span>
                <span className="text-2xl font-black text-[#1eb47d]">450 Hari</span>
              </div>

              {/* Terpakai Card */}
              <div className="bg-[#fff1f1] px-8 py-4 rounded-[24px] border border-[#ffe4e4] flex justify-between items-center min-w-[300px] shadow-sm">
                <span className="text-[11px] font-black text-[#f44336] uppercase tracking-widest">Terpakai</span>
                <span className="text-2xl font-black text-[#f44336]">124 Hari</span>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="py-8 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Karyawan</th>
                      <th className="py-8 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Divisi</th>
                      <th className="py-8 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Total</th>
                      <th className="py-8 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Terpakai</th>
                      <th className="py-8 px-4 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Sisa Saldo</th>
                      <th className="py-8 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leaveData.map((row) => (
                      <tr key={row.id} className="group hover:bg-[#f8fbff]/50 transition-colors">
                        <td className="py-6 px-8">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#001d3d] text-base leading-tight">{row.name}</span>
                            <span className="text-[10px] text-gray-400 font-bold tracking-tight uppercase mt-1">{row.employeeId}</span>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-100">
                            {row.division}
                          </span>
                        </td>
                        <td className="py-6 px-4 text-center font-black text-[#001d3d]">
                          {row.total}
                        </td>
                        <td className="py-6 px-4 text-center font-black text-[#f44336]">
                          {row.used}
                        </td>
                        <td className="py-6 px-4 text-center font-black text-[#1eb47d]">
                          {row.remaining}
                        </td>
                        <td className="py-6 px-8 text-right">
                          <button className="p-2.5 bg-[#f8f9fa] text-gray-300 rounded-full hover:bg-[#004a99] hover:text-white transition-all shadow-sm group-hover:scale-110">
                            <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center text-[10px] font-black">i</div>
                          </button>
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

export default ReportSaldoCutiPage;