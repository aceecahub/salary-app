"use client";
import React from "react";
import Navigation from "../layout/navigation";
import Header from "../layout/header";
import { Plus, Pencil, Trash2 } from "lucide-react";

const UserPage = () => {
return (
<div className="flex min-h-screen bg-gray-50">
    <Navigation />
    <div className="flex-1 flex flex-col">
        <Header title="Data User" />
        <main className="p-7">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Management User</h1>
            <p className="text-gray-600 mb-6">Configure and manage company departments.</p>
            <div className="flex gap-10 items-start">

                {/* card tambah user */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-auto w-120">
                    <div className="flex p-2 items-center gap-2">
                        {/* icon plus */}
                        <div className="bg-gray-200 p-2 rounded-xl">
                            <Plus size={20} strokeWidth={4} color="gray" />
                        </div>
                        <p className="text-lg font-bold text-gray-800">Tambah User</p>

                    </div>
                    {/* form */}
                    <div className="p-2">
                        <form action="">
                            <div className="mb-4">
                                <label htmlFor="nama" className="font-bold text-gray-800">Nama</label>
                                <input type="text" id="nama" name="nama"
                                    className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1"
                                    placeholder="Contoh: Software Manager" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="font-bold text-gray-800">Email</label>
                                <input type="email" id="email" name="email"
                                    className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1"
                                    placeholder="Contoh: bio3xxx@gmail.com" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="font-bold text-gray-800">Password</label>
                                <input type="password" id="password" name="password"
                                    className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1"
                                    placeholder="Contoh: 123456" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role" className="font-bold text-gray-800">Role</label>
                                <select id="role" name="role"
                                    className="border border-gray-200 bg-gray-100 rounded-xl py-2 px-4 w-full my-1">
                                    <option value="">Pilih Role</option>
                                    <option value="">Admin</option>
                                    <option value="">User</option>
                                </select>
                            </div>
                            <button type="submit" className="cursor-pointer bg-blue-900 text-white p-2 rounded-xl w-full mt-5 hover:bg-blue-800 transition-colors"><span
                                    className="font-bold">Tambah</span></button>
                        </form>
                    </div>
                </div>

                {/* card table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 h-auto w-full">
                    <div className="flex p-2 items-center gap-2 p-6">
                        <div className="flex justify-between w-full">
                            <p className="text-lg font-bold text-gray-800">Daftar Jabatan</p>
                            <div className="bg-green-200 h-6 w-25 rounded-xl flex justify-center items-center">
                                <p className="text-center text-gray-800 text-sm">Total Jabatan</p>
                            </div>
                        </div>
                    </div>

                    {/* table */}
                    <div className="overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-100/50">
                                    <th className="py-4 px-4 font-bold text-gray-800/60 w-16 text-sm text-center">No</th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-sm">Nama</th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-sm">Email</th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-sm">Role</th>
                                    <th className="py-4 px-4 font-bold text-gray-800/60 text-center w-32 text-sm">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 text-gray-600 text-center font-medium">1</td>
                                    <td className="py-4 px-4 text-gray-800">Json</td>
                                    <td className="py-4 px-4 text-gray-600">json@gmail.com</td>
                                    <td className="py-4 px-4 text-green-600">Admin</td>
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
                                    <td className="py-4 px-4 text-gray-800">Jsie</td>
                                    <td className="py-4 px-4 text-gray-600">jsie@gmail.com</td>
                                    <td className="py-4 px-4 text-green-600">User</td>
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

export default UserPage;
