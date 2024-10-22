// src/components/Fakultas/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request
import { useEffect } from "react";

export default function CreateProdi() {
  // Inisialisasi state untuk menyimpan nama prodi
  const [namaProdi, setNamaProdi] = useState("");
  // Inisialisasi state untuk menyimpan ID fakultas yang dipilih
  const [fakultasId, setFakultasId] = useState("");
  // Inisialisasi state untuk menyimpan daftar fakultas yang tersedia
  const [fakultasList, setFakultasList] = useState([]);
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchFakultas = async () => {
      try {
        const response = await axios.get(
          "https://project-apiif-3-b.vercel.app/api/api/fakultas"
        );
        setFakultasList(response.data.result); //simpan data fakultas kedalam state
      } catch (error) {
        setError("Failed to fetch fakultas data");
      }
    };

    fetchFakultas(); //panggil fungsi untuk mengambil data fakultas
  }, []); //kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat

  //fungsi yang akan dijalankan saat form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); //mencegah reload halaman setelah event di submit
    setError(""); //reset pesan error sebelum proses
    setSuccess(""); //reset pesan sukses sebelum proses

    //validasi input: jika namaProdi atau fakultasId kosong, set pesan error
    if (namaProdi.trim() === "" || fakultasId.trim() === "") {
      setError("Nama Prodi dan Fakultas Kosong"); //set pesan error
      return; //stop eksekusi fungsi jika input tidak valid
    }

    try {
      // melakukan HTTP Post request untuk menyimpan data prodi
      const response = await axios.post(
        "https://project-apiif-3-b.vercel.app/api/api/prodi",
        {
          nama: namaProdi, //data nama prodi
          fakultas_id: fakultasId, //data id fakultas
        }
      );
      if (response.status === 201) {
        //tampilkan pesan sukses jika prodi berhasil dibuat
        setSuccess("Prodi Created Successfully");
        setNamaProdi(""); //kosongkan input form setelah sukses di submit
        setFakultasId(""); //kosongkan dropdown setelah sukses di submit
      } else {
        //tampilkan pesan error jika prodi gagal dibuat
        setError("Failed to create Prodi");
      }
    } catch (error) {
      //jika terjadi error(misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating prodi");
    }
  };
  return (
    <div className="container mt-5">
      <h2>Create Prodi</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Prodi</label>
          <input
            type="text"
            className="form-control"
            value={namaProdi}
            onChange={(e) => setNamaProdi(e.target.value)}
            placeholder="Enter Prodi Name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fakultas</label>
          <select
            className="form-select"
            value={fakultasId}
            onChange={(e) => setFakultasId(e.target.value)}
          >
            <option value="">Select Fakultas</option>
            {fakultasList.map((fakultas) => (
              <option key={fakultas.id} value={fakultas.id}>
                {fakultas.nama}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
