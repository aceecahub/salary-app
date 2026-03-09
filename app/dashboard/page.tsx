"use client";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { 
  Users, Building2, Wallet, Hourglass, 
  FileEdit, Rocket, Calendar, Umbrella, 
  Banknote, ClipboardCheck, Megaphone 
} from "lucide-react";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [userData, setUserData] = useState<{ name: string; role: string }>({
    name: "Loading...",
    role: "user", // Default ke user untuk keamanan
  });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserData({
          name: user.name || "User",
          role: user.role || "user",
        });
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  // ==========================================
  // 1. TAMPILAN KHUSUS USER (Berdasarkan Foto)
  // ==========================================
  const UserDashboard = () => (
    <div className="max-w-[1440px] mx-auto w-full">
      {/* Welcome Section User */}
      <div className="mb-10">
        <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Welcome back, {userData.name}!</h1>
        <p className="text-gray-500 text-lg">Here's your overview for this month.</p>
      </div>

      {/* Stats Grid User */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50 group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><Calendar size={24} /></div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-blue-50 text-blue-500">On Track</span>
          </div>
          <p className="text-[13px] font-bold text-gray-400 mb-1">Kehadiran Bulan Ini</p>
          <h3 className="text-3xl font-black text-[#001d3d]">22/24</h3>
        </div>

        <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50 group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><Umbrella size={24} /></div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-blue-50 text-blue-500">Stable</span>
          </div>
          <p className="text-[13px] font-bold text-gray-400 mb-1">Sisa Cuti</p>
          <h3 className="text-3xl font-black text-[#001d3d]">8 Hari</h3>
        </div>

        <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50 group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><Banknote size={24} /></div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-emerald-50 text-emerald-500">Paid</span>
          </div>
          <p className="text-[13px] font-bold text-gray-400 mb-1">Gaji Terakhir</p>
          <h3 className="text-3xl font-black text-[#001d3d]">Rp 5.5M</h3>
        </div>

        <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50 group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><ClipboardCheck size={24} /></div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-rose-50 text-rose-500">Action Required</span>
          </div>
          <p className="text-[13px] font-bold text-gray-400 mb-1">Tugas Pending</p>
          <h3 className="text-3xl font-black text-[#001d3d]">3</h3>
        </div>
      </div>

      {/* History & Announcement User */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <h3 className="text-xl font-bold text-[#001d3d]">Your Recent History</h3>
          </div>
          <div className="space-y-8">
            {[1, 2].map((_, idx) => (
              <div key={idx} className="flex items-center gap-5">
                <div className="bg-yellow-50 p-3 rounded-2xl text-yellow-500"><Banknote size={20} /></div>
                <div>
                  <h4 className="font-bold text-[#001d3d] text-sm">Gaji Bulan Januari Telah Dibayar</h4>
                  <p className="text-xs text-gray-400 font-medium">{idx === 0 ? '2 hours ago' : '4 hours ago'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f8fbff] p-10 rounded-[40px] shadow-sm border border-gray-100 border-dashed flex flex-col items-center justify-center text-center">
          <div className="bg-white p-4 rounded-full mb-6 text-rose-500 shadow-sm"><Megaphone size={32} /></div>
          <h3 className="text-xl font-bold text-[#001d3d] mb-2">Pengumuman Kantor</h3>
          <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed">Libur nasional jatuh pada tanggal 25 Maret.</p>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 2. TAMPILAN KHUSUS ADMIN (Kode Sebelumnya)
  // ==========================================
  const AdminDashboard = () => {
    const stats = [
      { label: "Total Karyawan", value: "124", trend: "+12%", icon: <Users size={24} />, trendColor: "bg-emerald-50 text-emerald-500" },
      { label: "Divisi", value: "8", trend: "Stable", icon: <Building2 size={24} />, trendColor: "bg-blue-50 text-blue-500" },
      { label: "Payroll Bulan Ini", value: "Rp 450M", trend: "+5%", icon: <Wallet size={24} />, trendColor: "bg-emerald-50 text-emerald-500" },
      { label: "Pending Approval", value: "12", trend: "-2", icon: <Hourglass size={24} />, trendColor: "bg-rose-50 text-rose-500" },
    ];

    const activities = [
      { title: 'Updated Divisi "IT Support"', time: "2 hours ago" },
      { title: 'Updated Divisi "IT Support"', time: "4 hours ago" },
      { title: 'Updated Divisi "IT Support"', time: "6 hours ago" },
    ];

    return (
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-[32px] font-bold text-[#001d3d] mb-1">Welcome back, {userData.name}!</h1>
          <p className="text-gray-500 text-lg">Here's what's happening with your payroll system today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-50 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="text-gray-300 group-hover:text-[#001d3d] transition-colors">{stat.icon}</div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider ${stat.trendColor}`}>{stat.trend}</span>
              </div>
              <p className="text-[13px] font-bold text-gray-400 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-[#001d3d] tracking-tight">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <h3 className="text-xl font-bold text-[#001d3d]">Recent Activities</h3>
            </div>
            <div className="space-y-8">
              {activities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-5">
                  <div className="bg-[#f0f7ff] p-3 rounded-2xl text-blue-500"><FileEdit size={20} /></div>
                  <div>
                    <h4 className="font-bold text-[#001d3d] text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-400 font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 border-dashed flex flex-col items-center justify-center text-center">
            <div className="bg-[#fff8f8] p-4 rounded-full mb-6 text-[#ef4444] animate-bounce"><Rocket size={32} fill="currentColor" /></div>
            <h3 className="text-xl font-bold text-[#001d3d] mb-2">New Reports Coming Soon</h3>
            <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed">We're building advanced analytics for your payroll.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />
        <main className="p-10 w-full overflow-y-auto">
          {userData.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;