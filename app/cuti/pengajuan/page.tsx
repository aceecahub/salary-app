"use client";
import Navigation from "../../layout/navigation";
import Header from "../../layout/header";
import { 
  Calendar, 
  Heart, 
  AlertCircle, 
  Users, 
  Upload, 
  Send, 
  Info 
} from "lucide-react";
import { useState } from "react";

const PengajuanCutiPage = () => {
  const [jenisCuti, setJenisCuti] = useState("Cuti Tahunan");

  const leaveTypes = [
    { id: "Cuti Tahunan", label: "Cuti Tahunan", icon: <Calendar size={24} />, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: "Cuti Sakit", label: "Cuti Sakit", icon: <Heart size={24} />, color: "text-rose-500", bg: "bg-rose-50" },
    { id: "Alasan Penting", label: "Alasan Penting", icon: <AlertCircle size={24} />, color: "text-amber-500", bg: "bg-amber-50" },
    { id: "Cuti Bersama", label: "Cuti Bersama", icon: <Users size={24} />, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Pengajuan Cuti" />

        <main className="p-10 w-full overflow-y-auto">
          <div className="max-w-[1440px] mx-auto w-full">
            
            {/* Title Section */}
            <div className="mb-10">
              <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Form Pengajuan Cuti</h1>
              <p className="text-gray-500 text-lg">Silahkan lengkapi data di bawah ini untuk mengajukan cuti.</p>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
              
              {/* KOLOM KIRI: Form Input */}
              <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[40px] shadow-sm border border-gray-50">
                <div className="space-y-8">
                  
                  {/* Pilih Jenis Cuti */}
                  <div>
                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">Pilih Jenis Cuti</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {leaveTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setJenisCuti(type.id)}
                          className={`flex flex-col items-center justify-center p-6 rounded-[24px] border-2 transition-all ${
                            jenisCuti === type.id 
                            ? "border-[#001d3d] bg-white shadow-md scale-[1.02]" 
                            : "border-transparent bg-[#f8f9fa] hover:bg-gray-100"
                          }`}
                        >
                          <div className={`${type.color} mb-3`}>
                            {type.icon}
                          </div>
                          <span className="text-[11px] font-bold text-[#001d3d] text-center">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-bold text-[#001d3d] mb-3">Tanggal Mulai</label>
                      <input 
                        type="date" 
                        className="w-full bg-[#f8f9fa] border-none rounded-2xl p-4 text-gray-500 focus:ring-2 focus:ring-[#001d3d]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#001d3d] mb-3">Tanggal Berakhir</label>
                      <input 
                        type="date" 
                        className="w-full bg-[#f8f9fa] border-none rounded-2xl p-4 text-gray-500 focus:ring-2 focus:ring-[#001d3d]"
                      />
                    </div>
                  </div>

                  {/* Alasan Cuti */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#001d3d] mb-3">Alasan Cuti</label>
                    <textarea 
                      placeholder="Berikan alasan yang jelas untuk pengajuan cuti Anda..."
                      className="w-full bg-[#f8f9fa] border-none rounded-[24px] p-6 text-sm text-gray-600 focus:ring-2 focus:ring-[#001d3d] h-44 resize-none placeholder:text-gray-400"
                    />
                  </div>

                  {/* Upload Section */}
                  <div className="border-2 border-dashed border-gray-200 rounded-[24px] p-10 flex flex-col items-center justify-center group hover:border-[#001d3d] transition-colors cursor-pointer bg-[#fbfcfd]">
                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 text-gray-400 group-hover:text-[#001d3d] transition-colors">
                      <Upload size={28} />
                    </div>
                    <p className="text-[13px] font-bold text-[#001d3d] mb-1">Upload Dokumen Pendukung (Opsional)</p>
                    <p className="text-[11px] text-gray-400">PDF, JPG, atau PNG (Maks 2MB)</p>
                  </div>

                  {/* Submit Button */}
                  <button className="w-full bg-[#003d66] hover:bg-[#002d4d] text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3">
                    <Send size={20} />
                    Kirim Pengajuan
                  </button>
                </div>
              </div>

              {/* KOLOM KANAN: Ketentuan Cuti */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                <div className="bg-[#0b1629] p-10 rounded-[35px] text-white shadow-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="text-cyan-400">
                      <Info size={24} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Ketentuan Cuti</h3>
                  </div>

                  <ul className="space-y-8">
                    {[
                      "Pengajuan cuti dilakukan minimal 3 hari sebelum tanggal mulai.",
                      "Cuti sakit wajib melampirkan surat keterangan dokter.",
                      "Persetujuan cuti bergantung pada kebijakan manajer divisi."
                    ].map((text, index) => (
                      <li key={index} className="flex gap-4 items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                          {index + 1}
                        </span>
                        <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                      </li>
                    ))}
                  </ul>

                  {/* Contact Help */}
                  <div className="mt-12 p-6 bg-white/5 rounded-[24px] border border-white/10">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Butuh Bantuan?</p>
                    <p className="text-sm text-gray-300">
                      Hubungi HRD melalui email <br />
                      <span className="text-white font-medium">hrd@company.com</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PengajuanCutiPage;