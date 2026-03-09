"use client";
import Navigation from "../../layout/navigation";
import Header from "../../layout/header";
import { 
  PlayCircle, 
  Edit3,
  ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";

interface SalaryRecord {
  id: number;
  name: string;
  employeeId: string;
  role: string;
  basicSalary: number;
  leaveAllowance: number;
  deduction: number;
  totalReceived: number;
}

const ProsesGajiPage = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  // Mock Data sesuai foto
  const salaryData: SalaryRecord[] = [
    { 
      id: 1, 
      name: "Ahmad Fauzi", 
      employeeId: "EMP001", 
      role: "Manager IT", 
      basicSalary: 15000000, 
      leaveAllowance: 500000, 
      deduction: 200000, 
      totalReceived: 15300000 
    },
    { 
      id: 2, 
      name: "Siti Aminah", 
      employeeId: "EMP002", 
      role: "HR Specialist", 
      basicSalary: 8000000, 
      leaveAllowance: 0, 
      deduction: 100000, 
      totalReceived: 7900000 
    },
    { 
      id: 3, 
      name: "Budi Santoso", 
      employeeId: "EMP003", 
      role: "Frontend Developer", 
      basicSalary: 10000000, 
      leaveAllowance: 200000, 
      deduction: 0, 
      totalReceived: 10200000 
    },
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

  // Format Currency Helper
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount).replace("Rp", "Rp ");
  };

  if (userRole !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <p className="font-bold text-[#001d3d]">Akses Terbatas: Hanya Administrator</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />

      <div className="flex-1 flex flex-col">
        <Header title="Proses Gaji Bulanan" />

        <main className="p-10 w-full overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            
            {/* Header Section */}
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Proses Gaji Bulanan</h1>
                <p className="text-gray-500 text-lg">Generate dan hitung gaji seluruh karyawan dalam satu klik.</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <input 
                    type="text" 
                    value="2024-03" 
                    readOnly
                    className="px-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none font-bold text-gray-600 shadow-sm w-40"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#004267] text-white rounded-2xl hover:bg-[#003554] transition shadow-lg shadow-[#004267]/20 font-bold">
                  <PlayCircle size={20} /> Proses Gaji
                </button>
              </div>
            </div>

            {/* Stats Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Total Pengeluaran Gaji</p>
                <p className="text-3xl font-black text-[#001d3d]">Rp 33.400.000</p>
              </div>
              <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Total Karyawan</p>
                <p className="text-3xl font-black text-[#001d3d]">120 Orang</p>
              </div>
              <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50 flex flex-col justify-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Status Periode</p>
                <div>
                  <span className="px-5 py-1.5 bg-orange-50 text-orange-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100/50">
                    Draft
                  </span>
                </div>
              </div>
            </div>

            {/* Salary Table */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden px-4 pb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <th className="py-8 px-6">Karyawan</th>
                      <th className="py-8 px-4">Gaji Pokok</th>
                      <th className="py-8 px-4 text-center">Uang Cuti</th>
                      <th className="py-8 px-4 text-center">Potongan</th>
                      <th className="py-8 px-4">Total Diterima</th>
                      <th className="py-8 px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {salaryData.map((item) => (
                      <tr key={item.id} className="group hover:bg-[#f8fbff]/50 transition-colors">
                        <td className="py-7 px-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#001d3d] text-base">{item.name}</span>
                            <span className="text-[10px] text-gray-400 font-bold tracking-tight mt-0.5">
                              {item.employeeId} • {item.role}
                            </span>
                          </div>
                        </td>
                        <td className="py-7 px-4 font-bold text-gray-500">
                          {formatIDR(item.basicSalary)}
                        </td>
                        <td className="py-7 px-4 text-center font-black text-[#1eb47d]">
                          +{formatIDR(item.leaveAllowance)}
                        </td>
                        <td className="py-7 px-4 text-center font-black text-[#f44336]">
                          -{formatIDR(item.deduction)}
                        </td>
                        <td className="py-7 px-4 font-black text-[#001d3d] text-base">
                          {formatIDR(item.totalReceived)}
                        </td>
                        <td className="py-7 px-6 text-right">
                          <button className="p-3 bg-[#f8f9fa] text-gray-300 rounded-2xl hover:bg-[#004a99] hover:text-white transition-all shadow-sm">
                            <Edit3 size={18} />
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

export default ProsesGajiPage;