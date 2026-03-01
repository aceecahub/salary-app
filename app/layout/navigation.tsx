"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  ChevronUp,
  Building2,
  Briefcase,
  Users,
  Contact2,
  Settings,
  CalendarCheck,
  CalendarOff,
  Wallet
} from "lucide-react";

export default function Navigation() {
  const [isMasterOpen, setIsMasterOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside className="bg-[#01476e] w-64 h-screen p-4 flex flex-col gap-6 sticky top-0 overflow-y-auto">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-4">
        <div className="h-10 w-10 bg-[#00b5ad] rounded-xl flex justify-center items-center shadow-lg">
          <span className="text-white text-xl font-bold">S</span>
        </div>
        <h1 className="text-white text-2xl font-bold tracking-tight">
          Salary<span className="text-[#00b5ad]">App</span>
        </h1>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col gap-2">
        {/* Dashboard */}
        <Link href="/dashboard">
          <div className={`flex items-center gap-4 px-4 h-14 rounded-2xl cursor-pointer transition-all hover:bg-white/10 ${
            pathname === "/dashboard" ? "bg-white/15 text-white" : "text-white/70"
          }`}>
            <LayoutDashboard className={`w-6 h-6 ${pathname === "/dashboard" ? "text-[#00b5ad]" : ""}`} />
            <span className="text-lg font-medium">Dashboard</span>
          </div>
        </Link>

        {/* Master Menu Group */}
        <div className="flex flex-col">
          <div 
            onClick={() => setIsMasterOpen(!isMasterOpen)}
            className={`flex items-center justify-between px-4 h-14 border-2 rounded-2xl cursor-pointer bg-transparent transition-all ${
              pathname === "/divisi" || pathname === "/jabatan" || pathname === "/karyawan" 
                ? "border-[#00b5ad]/50 bg-white/5" 
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <Database className="text-white w-6 h-6" />
              <span className="text-white text-lg font-medium">Master</span>
            </div>
            <ChevronUp className={`text-white transition-transform ${!isMasterOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Sub-menu Master */}
          {isMasterOpen && (
            <div className="flex flex-col ml-8 mt-2 gap-1 border-l border-white/10">
              <Link href="/divisi" className="w-full">
                <SubMenuItem 
                  icon={<Building2 size={18} />} 
                  label="Divisi" 
                  isActive={pathname === "/divisi"} 
                />
              </Link>

              <Link href="/jabatan" className="w-full">
                <SubMenuItem 
                  icon={<Briefcase size={18} />} 
                  label="Jabatan" 
                  isActive={pathname === "/jabatan"} 
                />
              </Link>

              <Link href="/karyawan" className="w-full">
                <SubMenuItem 
                  icon={<Users size={18} />} 
                  label="Karyawan" 
                  isActive={pathname === "/karyawan"} 
                />
              </Link>

              <Link href="/user" className="w-full">
                <SubMenuItem 
                  icon={<Contact2 size={18} />} 
                  label="User" 
                  isActive={pathname === "/user"} 
                />
              </Link>

              <Link href="/konfigurasi" className="w-full">
                <SubMenuItem 
                  icon={<Settings size={18} />} 
                  label="Konfigurasi" 
                  isActive={pathname === "/konfigurasi"} 
                />
              </Link>
            </div>
          )}
        </div>

        {/* Menu Lainnya */}
        <MenuItem icon={<CalendarCheck className="text-white/70" />} label="Presensi" />
        <MenuItem icon={<CalendarOff className="text-white/70" />} label="Cuti" />
        <MenuItem icon={<Wallet className="text-white/70" />} label="Gaji" />
      </nav>
    </aside>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-4 px-4 h-12 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors text-white/70 hover:text-white">
      <div className="w-6 h-6 flex justify-center items-center">{icon}</div>
      <span className="text-lg font-medium">{label}</span>
    </div>
  );
}

function SubMenuItem({ icon, label, isActive }: { icon: React.ReactNode; label: string; isActive?: boolean }) {
  return (
    <div className={`flex items-center mx-2 gap-4 px-6 py-2.5 cursor-pointer group transition-all rounded-xl ${
      isActive ? "bg-[#00b5ad]/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"
    }`}>
      <div className={`${isActive ? "text-[#00b5ad]" : "group-hover:text-[#00b5ad]"} transition-colors`}>
        {icon}
      </div>
      <span className="text-base font-medium transition-colors">{label}</span>
    </div>
  );
}
