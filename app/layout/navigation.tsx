"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
Wallet,
LogOut,
} from "lucide-react";

export default function Navigation() {
const [isMasterOpen, setIsMasterOpen] = useState(true);
const [isPresensiOpen, setIsPresensiOpen] = useState(false);
const [isCutiOpen, setIsCutiOpen] = useState(false);
const [isGajiOpen, setIsGajiOpen] = useState(false);
const [userRole, setUserRole] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    router.push("/login");
    };

    // login berdasarkan role
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

    // dropdown active logic
    useEffect(() => {
        const masterRoutes = ["/divisi", "/jabatan", "/karyawan", "/user", "/konfigurasi"];
        const presensiRoutes = ["/presensi"];
        const cutiRoutes = ["/cuti"];
        const gajiRoutes = ["/gaji"];

        setIsMasterOpen(masterRoutes.some(route => pathname.startsWith(route)));
        setIsPresensiOpen(presensiRoutes.some(route => pathname.startsWith(route)));
        setIsCutiOpen(cutiRoutes.some(route => pathname.startsWith(route)));
        setIsGajiOpen(gajiRoutes.some(route => pathname.startsWith(route)));
    }, [pathname]);

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
            <div className={`flex items-center gap-4 px-4 h-14 rounded-2xl cursor-pointer transition-all
                hover:bg-white/10 ${ pathname === "/dashboard" ? "bg-white/15 text-white" : "text-white/70" }`}>
                <LayoutDashboard className={`w-6 h-6 ${pathname === "/dashboard" ? "text-[#00b5ad]" : "" }`} />
                <span className="text-lg font-medium">Dashboard</span>
            </div>
            </Link>

            {/* Master Menu Group */}
            {userRole === "admin" && (
            <div className="flex flex-col">
                <div onClick={()=> setIsMasterOpen(!isMasterOpen)}
                    className={`flex items-center justify-between px-4 h-14 border-2 rounded-2xl cursor-pointer
                    bg-transparent transition-all ${
                    pathname.startsWith("/divisi") || pathname.startsWith("/jabatan") || pathname.startsWith("/karyawan") || pathname.startsWith("/user") || pathname.startsWith("/konfigurasi")
                    ? "border-[#00b5ad]/50 bg-white/5"
                    : "border-white/10 hover:border-white/30"
                    }`}
                    >
                    <div className="flex items-center gap-4">
                        <Database className="text-white w-6 h-6" />
                        <span className="text-white text-lg font-medium">Master</span>
                    </div>
                    <ChevronUp className={`text-white transition-transform ${!isMasterOpen ? 'rotate-180' : '' }`} />
                </div>

                {/* Sub-menu Master */}

                {isMasterOpen && (
                <div className="flex flex-col ml-8 mt-2 gap-1 border-l border-white/10">
                    <Link href="/divisi" className="w-full">
                    <SubMenuItem icon={<Building2 size={18} />}
                    label="Divisi"
                    isActive={pathname === "/divisi"}
                    />
                    </Link>

                    <Link href="/jabatan" className="w-full">
                    <SubMenuItem icon={<Briefcase size={18} />}
                    label="Jabatan"
                    isActive={pathname === "/jabatan"}
                    />
                    </Link>

                    <Link href="/karyawan" className="w-full">
                    <SubMenuItem icon={<Users size={18} />}
                    label="Karyawan"
                    isActive={pathname === "/karyawan"}
                    />
                    </Link>

                    <Link href="/user" className="w-full">
                    <SubMenuItem icon={<Contact2 size={18} />}
                    label="User"
                    isActive={pathname === "/user"}
                    />
                    </Link>

                    <Link href="/konfigurasi" className="w-full">
                    <SubMenuItem icon={<Settings size={18} />}
                    label="Konfigurasi"
                    isActive={pathname === "/konfigurasi"}
                    />
                    </Link>
                </div>
                )}
            </div>
            )}

            {/* Menu Lainnya */}
            {/* Presensi Menu Group */}
            {userRole === "user" && (
            <div className="flex flex-col">
                <div onClick={()=> setIsPresensiOpen(!isPresensiOpen)}
                    className={`flex items-center justify-between px-4 h-14 border-2 rounded-2xl cursor-pointer
                    bg-transparent transition-all ${
                    pathname.startsWith("/presensi")
                    ? "border-[#00b5ad]/50 bg-white/5"
                    : "border-white/10 hover:border-white/30"
                    }`}
                    >
                    <div className="flex items-center gap-4">
                        <CalendarCheck className="text-white w-6 h-6" />
                        <span className="text-white text-lg font-medium">Presensi</span>
                    </div>
                    <ChevronUp className={`text-white transition-transform ${!isPresensiOpen ? 'rotate-180' : '' }`} />
                </div>

                {/* Sub-menu Presensi */}

                {isPresensiOpen && (
                <div className="flex flex-col ml-8 mt-2 gap-1 border-l border-white/10">
                    <Link href="/presensi" className="w-full">
                    <SubMenuItem icon={<Building2 size={0} />}
                    label="Kehadiran"
                    isActive={pathname === "/presensi"}
                    />
                    </Link>
                </div>
                )}
            </div>
            )}

            {/* Cuti Menu Group */}
            {userRole === "user" && (
            <div className="flex flex-col">
                <div onClick={()=> setIsCutiOpen(!isCutiOpen)}
                    className={`flex items-center justify-between px-4 h-14 border-2 rounded-2xl cursor-pointer
                    bg-transparent transition-all ${
                    pathname.startsWith("/cuti")
                    ? "border-[#00b5ad]/50 bg-white/5"
                    : "border-white/10 hover:border-white/30"
                    }`}
                    >
                    <div className="flex items-center gap-4">
                        <CalendarOff className="text-white w-6 h-6" />
                        <span className="text-white text-lg font-medium">Cuti</span>
                    </div>
                    <ChevronUp className={`text-white transition-transform ${!isCutiOpen ? 'rotate-180' : '' }`} />
                </div>

                {/* Sub-menu Cuti */}

                {isCutiOpen && (
                <div className="flex flex-col ml-8 mt-2 gap-1 border-l border-white/10">
                    <Link href="/cuti/pengajuan" className="w-full">
                    <SubMenuItem icon={<Building2 size={0} />}
                    label="Form Pengajuan"
                    isActive={pathname === "/cuti/pengajuan"}
                    />
                    </Link>
                    <Link href="/cuti/riwayat" className="w-full">
                    <SubMenuItem icon={<Building2 size={0} />}
                    label="Riwayat dan Saldo Cuti"
                    isActive={pathname === "/cuti/riwayat"}
                    />
                    </Link>
                </div>
                )}
            </div>
            )}

            {/* Gaji Menu Group */}
            {userRole === "user" && (
            <div className="flex flex-col">
                <div onClick={()=> setIsGajiOpen(!isGajiOpen)}
                    className={`flex items-center justify-between px-4 h-14 border-2 rounded-2xl cursor-pointer
                    bg-transparent transition-all ${
                    pathname.startsWith("/gaji")
                    ? "border-[#00b5ad]/50 bg-white/5"
                    : "border-white/10 hover:border-white/30"
                    }`}
                    >
                    <div className="flex items-center gap-4">
                        <Wallet className="text-white w-6 h-6" />
                        <span className="text-white text-lg font-medium">Gaji</span>
                    </div>
                    <ChevronUp className={`text-white transition-transform ${!isGajiOpen ? 'rotate-180' : '' }`} />
                </div>

                {/* Sub-menu Gaji */}

                {isGajiOpen && (
                <div className="flex flex-col ml-8 mt-2 gap-1 border-l border-white/10">
                    <Link href="/gaji/slip" className="w-full">
                    <SubMenuItem icon={<Building2 size={0} />}
                    label="Slip Gaji"
                    isActive={pathname === "/gaji/slip"}
                    />
                    </Link>
                </div>
                )}
            </div>
            )}

            {/* Menu Lainnya admin */}
            {userRole === "admin" && (
            <>
                <div className="flex flex-col">
                    <div onClick={()=> setIsPresensiOpen(!isPresensiOpen)}
                        className={`flex items-center justify-between px-4 h-14 border-2 rounded-2xl cursor-pointer
                        bg-transparent transition-all ${
                        pathname.startsWith("/presensi")
                        ? "border-[#00b5ad]/50 bg-white/5"
                        : "border-white/10 hover:border-white/30"
                        }`}
                        >
                        <div className="flex items-center gap-4">
                            <CalendarCheck className="text-white w-6 h-6" />
                            <span className="text-white text-lg font-medium">Presensi</span>
                        </div>
                        <ChevronUp className={`text-white transition-transform ${!isPresensiOpen ? 'rotate-180' : ''
                            }`} />
                    </div>

                    {/* Sub-menu Presensi */}

                    {isPresensiOpen && (
                    <div className="flex flex-col ml-8 mt-2 gap-1 border-l border-white/10">
                        <Link href="/presensi" className="w-full">
                        <SubMenuItem icon={<Building2 size={0} />}
                        label="Kehadiran"
                        isActive={pathname === "/presensi"}
                        />
                        </Link>
                    </div>
                    )}
                </div>

                {userRole === "admin" && (
            <>
                <div className="flex flex-col">
                    <div onClick={()=> setIsCutiOpen(!isCutiOpen)}
                        className={`flex items-center justify-between px-4 h-14 border-2 rounded-2xl cursor-pointer
                        bg-transparent transition-all ${
                        pathname.startsWith("/cuti")
                        ? "border-[#00b5ad]/50 bg-white/5"
                        : "border-white/10 hover:border-white/30"
                        }`}
                        >
                        <div className="flex items-center gap-4">
                            <CalendarCheck className="text-white w-6 h-6" />
                            <span className="text-white text-lg font-medium">Cuti</span>
                        </div>
                        <ChevronUp className={`text-white transition-transform ${!isCutiOpen ? 'rotate-180' : ''
                            }`} />
                    </div>

                    {/* Sub-menu Cuti */}

                    {isCutiOpen && (
                    <div className="flex flex-col ml-8 mt-2 gap-1 border-l border-white/10">
                        <Link href="/cuti/report" className="w-full">
                        <SubMenuItem icon={<Building2 size={0} />}
                        label="Report Cuti"
                        isActive={pathname === "/cuti/report"}
                        />
                        </Link>
                    </div>
                    )}
                </div>
            </>
            )}

            {userRole === "admin" && (
            <div className="flex flex-col">
                <div onClick={()=> setIsGajiOpen(!isGajiOpen)}
                    className={`flex items-center justify-between px-4 h-14 border-2 rounded-2xl cursor-pointer
                    bg-transparent transition-all ${
                    pathname.startsWith("/gaji")
                    ? "border-[#00b5ad]/50 bg-white/5"
                    : "border-white/10 hover:border-white/30"
                    }`}
                    >
                    <div className="flex items-center gap-4">
                        <CalendarOff className="text-white w-6 h-6" />
                        <span className="text-white text-lg font-medium">Gaji</span>
                    </div>
                    <ChevronUp className={`text-white transition-transform ${!isGajiOpen ? 'rotate-180' : '' }`} />
                </div>

                {/* Sub-menu Gaji */}

                {isGajiOpen && (
                <div className="flex flex-col ml-8 mt-2 gap-1 border-l border-white/10">
                    <Link href="/gaji/proses" className="w-full">
                    <SubMenuItem icon={<Building2 size={0} />}
                    label="Proses Gaji"
                    isActive={pathname === "/gaji/proses"}
                    />
                    </Link>
                    <Link href="/gaji/report" className="w-full">
                    <SubMenuItem icon={<Building2 size={0} />}
                    label="Report Gaji"
                    isActive={pathname === "/gaji/report"}
                    />
                    </Link>
                </div>
                )}
            </div>
            )}
            </>
            )}
            

            {/* Logout */}
            <MenuItem icon={<LogOut className="text-red-400" />}
            label="Logout"
            onClick={handleLogout}
            />
        </nav>
    </aside>
    );
    }

    function MenuItem({ icon, label, onClick, isActive }: { icon: React.ReactNode; label: string; onClick?: () => void;
    isActive?: boolean }) {
    return (
    <div onClick={onClick} className={`flex items-center gap-4 px-4 h-12 rounded-2xl cursor-pointer hover:bg-white/5
        transition-colors text-white/70 hover:text-white ${isActive ? "bg-white/5 text-white" : "" }`}>
        <div className="w-6 h-6 flex justify-center items-center">{icon}</div>
        <span className="text-lg font-medium">{label}</span>
    </div>
    );
    }

    function SubMenuItem({ icon, label, isActive }: { icon: React.ReactNode; label: string; isActive?: boolean }) {
    return (
    <div className={`flex items-center mx-2 gap-4 px-6 py-2.5 cursor-pointer group transition-all rounded-xl ${ isActive
        ? "bg-[#00b5ad]/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5" }`}>
        <div className={`${isActive ? "text-[#00b5ad]" : "group-hover:text-[#00b5ad]" } transition-colors`}>
            {icon}
        </div>
        <span className="text-base font-medium transition-colors">{label}</span>
    </div>
    );
    }
