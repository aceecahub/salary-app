"use client";
import Navigation from "../../layout/navigation";
import Header from "../../layout/header";
import { 
  FileDown, 
  Search 
} from "lucide-react";
import { useState } from "react";

// --- Interface Data Laporan ---
interface PayrollReport {
  id: number;
  name: string;
  employeeId: string;
  role: string;
  basicSalary: number;
  leaveAllowance: number;
  deduction: number;
  netTotal: number;
  status: 'PAID' | 'UNPAID';
}

const UserSalaryReportPage = () => {
  // Mock Data Sesuai Foto
  const reportData: PayrollReport[] = [
    { id: 1, name: "Ahmad Fauzi", employeeId: "EMP001", role: "Manager IT", basicSalary: 15000000, leaveAllowance: 500000, deduction: 200000, netTotal: 15300000, status: 'PAID' },
    { id: 2, name: "Siti Aminah", employeeId: "EMP002", role: "HR Specialist", basicSalary: 8000000, leaveAllowance: 0, deduction: 100000, netTotal: 7900000, status: 'PAID' },
    { id: 3, name: "Budi Santoso", employeeId: "EMP003", role: "Frontend Developer", basicSalary: 10000000, leaveAllowance: 200000, deduction: 0, netTotal: 10200000, status: 'PAID' },
    { id: 4, name: "Rina Wijaya", employeeId: "EMP004", role: "Marketing", basicSalary: 7500000, leaveAllowance: 100000, deduction: 50000, netTotal: 7550000, status: 'PAID' },
  ];

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount).replace("Rp", "Rp ");
  };

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />

      <div className="flex-1 flex flex-col">
        <Header title="Laporan Gaji" />

        <main className="p-10 w-full overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            
            {/* Header Laporan */}
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Laporan Gaji Karyawan</h1>
                <p className="text-gray-500 text-lg">Laporan rekapitulasi penggajian seluruh divisi.</p>
              </div>
              <div className="flex gap-4 items-center">
                <input 
                  type="text" 
                  value="2024-03" 
                  readOnly
                  className="px-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none font-bold text-gray-600 shadow-sm w-40 text-center"
                />
                <button className="flex items-center gap-2 px-6 py-3 bg-[#004267] text-white rounded-2xl hover:bg-[#003554] transition shadow-lg shadow-[#004267]/20 font-bold">
                  <FileDown size={20} /> Export Excel
                </button>
              </div>
            </div>

            {/* Summary Grid (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Total Payroll</p>
                <p className="text-[26px] font-black text-[#004a99]">Rp 40.950.000</p>
              </div>
              <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Total Potongan</p>
                <p className="text-[26px] font-black text-[#f44336]">Rp 350.000</p>
              </div>
              <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Uang Cuti Dibayar</p>
                <p className="text-[26px] font-black text-[#1eb47d]">Rp 800.000</p>
              </div>
              <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Jumlah Karyawan</p>
                <p className="text-[26px] font-black text-[#001d3d]">120</p>
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#001d3d]">Rincian Laporan Gaji</h3>
                <div className="relative w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="Cari karyawan..." 
                    className="w-full pl-12 pr-4 py-3 bg-[#f8f9fa] rounded-2xl outline-none text-sm border-none focus:ring-2 focus:ring-[#004a99]/10"
                  />
                </div>
              </div>

              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      <th className="py-8 px-6">Karyawan</th>
                      <th className="py-8 px-4">Gaji Pokok</th>
                      <th className="py-8 px-4 text-center">Uang Cuti</th>
                      <th className="py-8 px-4 text-center">Potongan</th>
                      <th className="py-8 px-4">Total Netto</th>
                      <th className="py-8 px-6 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {reportData.map((item) => (
                      <tr key={item.id} className="group hover:bg-[#f8fbff]/50 transition-colors">
                        <td className="py-7 px-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#001d3d] text-base">{item.name}</span>
                            <span className="text-[10px] text-gray-400 font-bold tracking-tight mt-0.5 uppercase">
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
                          {formatIDR(item.netTotal)}
                        </td>
                        <td className="py-7 px-6 text-center">
                          <span className="px-4 py-1.5 bg-[#e2f9f0] text-[#1eb47d] rounded-xl text-[9px] font-black tracking-widest border border-[#d1f5e4]">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* Grand Total Row */}
                    <tr className="bg-[#f8fbff]/30">
                      <td colSpan={4} className="py-10 px-6 text-right font-black italic text-[#001d3d] uppercase tracking-widest text-sm">
                        Grand Total
                      </td>
                      <td colSpan={2} className="py-10 px-4 font-black text-[#004a99] text-xl">
                        {formatIDR(40950000)}
                      </td>
                    </tr>
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

export default UserSalaryReportPage;