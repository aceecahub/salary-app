"use client";
import React from "react";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Plus, Pencil, Trash2 } from "lucide-react";

const KaryawanPage = () => {
return (
<div className="flex min-h-screen bg-gray-50">
    <Navigation />
    <div className="flex-1 flex flex-col">
        <Header title="Data Karyawan" />
        <main className="p-7">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Management Karyawan</h1>
            <p className="text-gray-600 mb-6">Configure and manage company departments.</p>
            <div className="flex gap-10 items-start">

                {/* card tambah karyawan */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-auto w-120">
                    <div className="flex p-2 items-center gap-2">
                        {/* icon plus */}
                        <div className="bg-gray-200 p-2 rounded-xl">
                            <Plus size={20} strokeWidth={4} color="gray" />
                        </div>
                        <p className="text-lg font-bold text-gray-800">Tambah Karyawan</p>

                    </div>
                    {/* form */}
                    <div className="p-2">
                        <form action="">

                            {/* nik and name */}
                            <div className="flex justify-between gap-2">
                                <div className="mb-4">
                                    <label htmlFor="nik" className="font-bold text-gray-800">NIK</label>
                                    <input type="text" id="nik" name="nik"
                                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1"
                                        placeholder="Masukan NIK" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nama_karyawan" className="font-bold text-gray-800">Nama</label>
                                    <input type="text" id="nama_karyawan" name="nama_karyawan"
                                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1"
                                        placeholder="Masukan Nama" />
                                </div>
                            </div>

                            {/* email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="font-bold text-gray-800">Email</label>
                                <input type="text" id="email" name="email"
                                    className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1"
                                    placeholder="Masukan Email" />
                            </div>

                            {/* tempat lahir and tanggal lahir */}
                            <div className="flex justify-between gap-2">
                                <div className="mb-4">
                                    <label htmlFor="tempat_lahir" className="font-bold text-gray-800">Tempat Lahir</label>
                                    <input type="text" id="tempat_lahir" name="tempat_lahir"
                                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1"
                                        placeholder="Kota" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="tanggal_lahir" className="font-bold text-gray-800">Tanggal Lahir</label>
                                    <input type="date" id="tanggal_lahir" name="tanggal_lahir"
                                        className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1"/>
                                </div>
                            </div>

                            {/* address */}
                            <div className="mb-4">
                                <label htmlFor="alamat" className="font-bold text-gray-800">Alamat</label>
                                <textarea id="alamat" name="alamat"
                                    className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1 resize-y min-h-[100px]"
                                    placeholder="Masukan Alamat" />
                            </div>

                            {/* jabatan */}
                            <div className="mb-4">
                                <label htmlFor="jabatan" className="font-bold text-gray-800">Jabatan</label>
                                <select id="jabatan" name="jabatan"
                                    className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1">
                                    <option value="">Pilih Jabatan</option>
                                    <option value="manager">Manager</option>
                                    <option value="staff">Staff</option>
                                </select>
                            </div>

                            {/* Status Aktif */}
                            <div className="mb-2">
                                <label htmlFor="status_aktif" className="font-bold text-gray-800">Status Aktif</label>
                                <select id="status_aktif" name="status_aktif"
                                    className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1">
                                    <option value="">Pilih Status Aktif</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="tidak aktif">Tidak Aktif</option>
                                </select>
                            </div>

                            {/* button */}
                            <button type="submit"
                                className="cursor-pointer bg-blue-900 text-white p-2 rounded-xl w-full mt-5 hover:bg-blue-800 transition-colors"><span
                                    className="font-bold">Tambah</span></button>
                        </form>
                    </div>
                </div>

                {/* card table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 h-auto w-full">
                    <div className="flex p-2 items-center gap-2 p-6">
                        <div className="flex justify-between w-full">
                            <p className="text-lg font-bold text-gray-800">Daftar Karyawan</p>
                            <div className="bg-green-200 h-6 w-25 rounded-xl flex justify-center items-center">
                                <p className="text-center text-gray-800 text-sm">Total Karyawan</p>
                            </div>
                        </div>
                    </div>

                    {/* table */}
                    <div className="overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-100/50">
                                    <th className="py-4 px-4 font-bold text-gray-800/60 w-16 text-sm text-center">No
                                    </th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-sm">NIK</th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-sm">Nama</th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-sm">Jabatan</th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-sm text-center">Status</th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-center w-32 text-sm">Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 text-gray-600 text-center font-medium">1</td>
                                    <td className="py-4 px-4 text-gray-800">2024001</td>
                                    <td className="py-4 px-4 text-gray-800">Budi Santoso</td>
                                    <td className="py-4 px-4 text-gray-600">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">Software Engineer</span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Aktif</span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit">
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 text-gray-600 text-center font-medium">2</td>
                                    <td className="py-4 px-4 text-gray-800">2024002</td>
                                    <td className="py-4 px-4 text-gray-800">Siti Aminah</td>
                                    <td className="py-4 px-4 text-gray-600">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">Marketing Manager</span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Aktif</span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit">
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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

export default KaryawanPage;
