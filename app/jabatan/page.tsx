"use client";
import React from "react";
import Navigation from "../layout/navigation";
import Header from "../layout/header";

const JabatanPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header title="Data Jabatan" />
        <main className="p-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
             Jabatan Page Content
          </div>
        </main>
      </div>
    </div>
  );
};

export default JabatanPage;