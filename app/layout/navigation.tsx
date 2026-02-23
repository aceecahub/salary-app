import { useState } from "react";
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
} from "lucide-react"; // Pastikan install lucide-react

export default function Navigation() {
  const [isMasterOpen, setIsMasterOpen] = useState(true);

  return (
    <div className="flex">
      <aside className="bg-[#01476e] w-72 h-screen p-4 flex flex-col gap-6">
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
          
          {/* Dashboard - State Active */}
          <div className="flex items-center gap-4 px-4 h-14 bg-white/10 rounded-2xl cursor-pointer transition-all hover:bg-white/20">
            <LayoutDashboard className="text-[#00b5ad] w-6 h-6" />
            <span className="text-white text-lg font-medium">Dashboard</span>
          </div>

          {/* Master Menu Group */}
          <div className="flex flex-col">
            <div 
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              className="flex items-center justify-between px-4 h-14 border-2 border-white/90 rounded-2xl cursor-pointer bg-transparent"
            >
              <div className="flex items-center gap-4">
                <Database className="text-white w-6 h-6" />
                <span className="text-white text-lg font-medium">Master</span>
              </div>
              <ChevronUp className={`text-white transition-transform ${!isMasterOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Sub-menu Master */}
            {isMasterOpen && (
              <div className="flex flex-col ml-10 mt-2 gap-1 border-l border-white/20">
                <SubMenuItem icon={<Building2 size={20} />} label="Divisi" />
                <SubMenuItem icon={<Briefcase size={20} />} label="Jabatan" />
                <SubMenuItem icon={<Users size={20} />} label="Karyawan" />
                <SubMenuItem icon={<Contact2 size={20} />} label="User" />
                <SubMenuItem icon={<Settings size={20} />} label="Konfigurasi" />
              </div>
            )}
          </div>

          {/* Menu Lainnya */}
          <MenuItem icon={<CalendarCheck className="text-white/70" />} label="Presensi" />
          <MenuItem icon={<CalendarOff className="text-white/70" />} label="Cuti" />
          <MenuItem icon={<Wallet className="text-white/70" />} label="Gaji" />

        </nav>
      </aside>
    </div>
  );
}

// Komponen Helper untuk Reusability
function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-4 px-4 h-14 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
      <div className="w-6 h-6 flex justify-center items-center">{icon}</div>
      <span className="text-white/80 text-lg font-medium">{label}</span>
    </div>
  );
}

function SubMenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-3 cursor-pointer group">
      <div className="text-white/50 group-hover:text-[#00b5ad] transition-colors">
        {icon}
      </div>
      <span className="text-white/70 group-hover:text-white transition-colors">{label}</span>
    </div>
  );
}