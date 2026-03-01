"use client";
import React from "react";
import { Bell, User, Search } from "lucide-react";

export default function Header({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 gap-3 w-64 focus-within:ring-2 focus-within:ring-[#00b5ad]/20 focus-within:border-[#00b5ad] transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm text-gray-600 w-full"
          />
        </div>

        {/* Notifications */}
        <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 hover:text-[#00b5ad] transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Administrator</p>
            <p className="text-xs text-gray-400 font-medium">Admin</p>
          </div>
          <div className="h-10 w-10 bg-[#00b5ad]/10 text-[#00b5ad] rounded-xl flex justify-center items-center font-bold">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
