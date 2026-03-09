"use client";
import Navigation from "../../layout/navigation";
import Header from "../../layout/header";
import { Eye, Download } from "lucide-react";

const SlipGajiPage = () => {
  const salaryData = [
    {
      periode: "Maret 2024",
      total: "Rp 15.300.000",
      tanggal: "2024-03-25",
      status: "PAID",
    },
    {
      periode: "Februari 2024",
      total: "Rp 14.800.000",
      tanggal: "2024-02-25",
      status: "PAID",
    },
    {
      periode: "Januari 2024",
      total: "Rp 15.150.000",
      tanggal: "2024-01-25",
      status: "PAID",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Gaji" />

        <main className="p-10 w-full overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            
            {/* Header Section */}
            <div className="mb-10">
              <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Riwayat Slip Gaji</h1>
              <p className="text-gray-500 text-lg">Unduh slip gaji bulanan Anda dengan mudah.</p>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden px-8 py-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-6 py-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Periode</th>
                      <th className="px-6 py-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Gaji Netto</th>
                      <th className="px-6 py-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Tanggal Pembayaran</th>
                      <th className="px-6 py-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-6 py-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {salaryData.map((item, index) => (
                      <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-10 font-bold text-[#001d3d] text-base">
                          {item.periode}
                        </td>
                        <td className="px-6 py-10 font-black text-[#001d3d] text-lg">
                          {item.total}
                        </td>
                        <td className="px-6 py-10 text-gray-500 font-semibold text-sm">
                          {item.tanggal}
                        </td>
                        <td className="px-6 py-10">
                          <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] bg-[#e2f9f0] text-[#1eb47d] inline-block">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-10">
                          <div className="flex justify-end gap-3">
                            {/* Tombol View */}
                            <button className="p-3 rounded-xl bg-[#f8f9fa] text-gray-400 hover:text-[#001d3d] hover:bg-gray-100 transition-all border border-gray-100">
                              <Eye size={20} />
                            </button>
                            {/* Tombol Download */}
                            <button className="p-3 rounded-xl bg-[#f8f9fa] text-gray-400 hover:text-[#001d3d] hover:bg-gray-100 transition-all border border-gray-100">
                              <Download size={20} />
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

export default SlipGajiPage;