"use client";
import Navigation from "../../layout/navigation";
import Header from "../../layout/header";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

const SaldoCutiPage = () => {
  const [activeTab, setActiveTab] = useState("Semua");

  const stats = [
    { label: "TOTAL CUTI", value: "12", unit: "Hari / Tahun", icon: <Calendar className="text-[#6366f1]" />, bg: "bg-[#f5f3ff]" },
    { label: "CUTI DIAMBIL", value: "4", unit: "Hari", icon: <Calendar className="text-[#ef4444]" />, bg: "bg-[#fef2f2]" },
    { label: "SISA CUTI", value: "8", unit: "Hari Tersisa", icon: <Clock className="text-[#10b981]" />, bg: "bg-[#ecfdf5]" },
  ];

  const riwayat = [
    { jenis: "Tahunan", tgl: "15 Feb - 17 Feb 2024", durasi: "3 Hari", alasan: "Acara Keluarga", status: "APPROVED" },
    { jenis: "Sakit", tgl: "10 Jan - 11 Jan 2024", durasi: "1 Hari", alasan: "Flu & Demam", status: "APPROVED" },
    { jenis: "Tahunan", tgl: "10 Mar - 12 Mar 2024", durasi: "3 Hari", alasan: "Liburan Akhir Pekan", status: "PENDING" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Data & Saldo Cuti" />

        <main className="p-10 w-full overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            
            {/* Header Section */}
            <div className="mb-10">
              <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Data & Saldo Cuti</h1>
              <p className="text-gray-500 text-lg">Informasi kuota dan riwayat pengajuan cuti Anda.</p>
            </div>

            {/* Statistik Saldo Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {stats.map((item, index) => (
                <div key={index} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 flex justify-between items-center transition-transform hover:scale-[1.02]">
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{item.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-[#001d3d]">{item.value}</span>
                      <span className="text-sm font-bold text-gray-400">{item.unit}</span>
                    </div>
                  </div>
                  <div className={`${item.bg} p-5 rounded-3xl`}>
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Riwayat Pengajuan Section */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
              <div className="p-10 pb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#001d3d]">Riwayat Pengajuan</h3>
                
                {/* Status Tabs */}
                <div className="flex bg-[#f4f7fa] p-1.5 rounded-[20px]">
                  {["Semua", "Pending", "Approved", "Rejected"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2.5 rounded-[14px] text-xs font-black transition-all ${
                        activeTab === tab 
                        ? "bg-white text-[#001d3d] shadow-sm" 
                        : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="px-6 pb-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-6 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Jenis Cuti</th>
                      <th className="px-6 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Tanggal</th>
                      <th className="px-6 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Durasi</th>
                      <th className="px-6 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Alasan</th>
                      <th className="px-6 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {riwayat.map((row, idx) => (
                      <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-8">
                          <span className="bg-[#f8f9fa] text-[#001d3d] px-5 py-2.5 rounded-2xl font-bold text-sm border border-gray-100">
                            {row.jenis}
                          </span>
                        </td>
                        <td className="px-6 py-8 text-[#001d3d] font-bold text-sm">
                          {row.tgl}
                        </td>
                        <td className="px-6 py-8 text-[#004a99] font-black text-sm">
                          {row.durasi}
                        </td>
                        <td className="px-6 py-8 text-gray-400 italic text-sm">
                          {row.alasan}
                        </td>
                        <td className="px-6 py-8 text-center">
                          <span className={`px-5 py-2 rounded-full text-[10px] font-black tracking-[0.15em] inline-block ${
                            row.status === "APPROVED" 
                            ? "bg-[#e2f9f0] text-[#1eb47d]" 
                            : "bg-[#fff7ed] text-[#f59e0b]"
                          }`}>
                            {row.status}
                          </span>
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

export default SaldoCutiPage;