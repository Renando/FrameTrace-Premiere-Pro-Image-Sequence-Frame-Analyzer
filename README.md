<div align="center">

# 🎬 FrameTrace

**Professional Frame Analysis Tool for VFX & Blender Pipelines**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)

<img src="https://github.com/user-attachments/assets/554690ed-005f-4e42-85f2-05ad5e7a6c1c" alt="FrameTrace Hero Image" width="100%">

</div>

---

## 📚 Table of Contents / Daftar Isi

- [📖 Project Overview](#-project-overview--ringkasan-proyek)
- [❓ Why FrameTrace Exists](#-why-frametrace-exists--mengapa-frametrace-dibuat)
- [✨ Features](#-key-features--fitur-utama)
- [📸 Screenshots](#-screenshots--tangkapan-layar)
- [🎥 Demo](#-demo--demo-penggunaan)
- [💻 Compatibility](#-compatibility--kompatibilitas)
- [🚀 Installation](#-installation-guide--panduan-instalasi)
- [🛠️ Usage](#️-how-to-use--cara-penggunaan)
- [🔄 Workflow](#-workflow-example--contoh-alur-kerja)
- [🎯 Who Is This For](#-who-is-this-for--untuk-siapa-ini)
- [🗺️ Roadmap](#️-roadmap--rencana-pengembangan)
- [🚀 Future Vision](#-future-vision--visi-masa-depan)
- [🤝 Contributing](#-contributing--berkontribusi)
- [⭐ Support](#-support-this-project--dukung-proyek-ini)
- [👨‍💻 Author](#-author--penulis)
- [📄 License](#-license--lisensi)

---

## 📖 Project Overview / Ringkasan Proyek

### 🇬🇧 English

**FrameTrace** is an Adobe Premiere Pro extension designed specifically for VFX artists, 3D animators, and Blender users who work with image sequence pipelines.

**The Problem:**
When you trim or edit image sequences in Premiere Pro, the timeline resetting makes it difficult to track back to the original source frames. Premiere Pro resets the frame numbers when trimming image sequences, making re-rendering or compositing a nightmare.

**The Solution:**
FrameTrace reads the original frame numbers directly from your file names or metadata and automatically calculates the correct, exact render range needed for your 3D software (like Blender) or compositing tools.

### 🇮🇩 Indonesian

**FrameTrace** adalah ekstensi Adobe Premiere Pro yang dirancang khusus untuk seniman VFX, animator 3D, dan pengguna Blender yang bekerja dengan pipeline _image sequence_ (urutan gambar).

**Masalah:**
Saat Anda memotong (trim) atau mengedit _image sequence_ di Premiere Pro, reset _timeline_ membuatnya sulit untuk melacak kembali ke _frame_ sumber asli. Premiere Pro mengatur ulang nomor _frame_ saat memotong _image sequence_, membuat proses _re-render_ atau _compositing_ menjadi sangat rumit.

**Solusi:**
FrameTrace membaca nomor _frame_ asli langsung dari nama file atau metadata Anda dan secara otomatis menghitung rentang _render_ yang benar dan tepat yang dibutuhkan untuk perangkat lunak 3D Anda (seperti Blender) atau alat _compositing_.

---

## ❓ Why FrameTrace Exists? / Mengapa FrameTrace Dibuat?

### 🇬🇧 English

In standard animation and VFX pipelines, a common pain point occurs when editing image sequences directly in Adobe Premiere Pro. Native Premiere behavior resets frame numbers starting from zero when you trim a clip. This breaks the link to the original sequence and makes exporting accurate render ranges back to 3D software (like Blender) or compositing packages almost impossible. 

**FrameTrace** exists to solve this exact problem by acting as a bridge. It reads the raw file data of your edited sequence and restores the original frame information, saving you hours of tedious manual calculation.

### 🇮🇩 Indonesian

Dalam alur kerja animasi dan VFX standar, masalah umum terjadi saat mengedit _image sequence_ secara langsung di Adobe Premiere Pro. Perilaku bawaan Premiere mereset nomor _frame_ kembali ke nol setiap kali Anda memotong (trim) sebuah klip. Hal ini memutuskan tautan ke _sequence_ asli dan membuat proses ekspor rentang _render_ yang akurat kembali ke perangkat lunak 3D (seperti Blender) atau aplikasi _compositing_ menjadi hampir mustahil.

**FrameTrace** hadir untuk memecahkan masalah ini dengan bertindak sebagai jembatan. Plugin ini membaca data file mentah dari _sequence_ yang Anda edit dan memulihkan informasi _frame_ asli, menghemat waktu Anda dari perhitungan manual yang membosankan.

---

## ✨ Key Features / Fitur Utama

| Feature / Fitur                | 🇬🇧 Description                                                    | 🇮🇩 Deskripsi                                                                         |
| :----------------------------- | :---------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| 🔍 **Frame Range Detection**   | Accurately detects original source frame ranges of trimmed clips. | Mendeteksi rentang _frame_ sumber asli dari klip yang dipotong dengan akurat.        |
| ⚠️ **Missing Frame Detection** | Identifies dropped or missing frames in your sequence.            | Mengidentifikasi _frame_ yang terlewat atau hilang dalam _sequence_ Anda.            |
| 🔢 **Frame Padding Detection** | Automatically recognizes file padding (e.g., `0001` vs `1`).      | Secara otomatis mengenali _padding_ file (contoh: `0001` vs `1`).                    |
| 🌡️ **Timeline Heatmap**        | Visualizes sequence usage and overlaps directly in the timeline.  | Memvisualisasikan penggunaan _sequence_ dan tumpang tindih langsung di _timeline_.   |
| 🔄 **Smart Replace Sequence**  | Refresh renders with a single click after updating source files.  | Segarkan _render_ dengan satu klik setelah memperbarui file sumber (Render Refresh). |
| 📝 **Shot Notes System**       | Attach custom notes to specific shots for collaborative review.   | Lampirkan catatan khusus pada _shot_ tertentu untuk ulasan kolaboratif.              |
| ⚙️ **Blender Range Generator** | Outputs exact start/end frames formatted for Blender pipelines.   | Menghasilkan _frame_ awal/akhir yang diformat khusus untuk pipeline Blender.         |
| 📋 **Shot List Generator**     | Export organized shot lists based on your current edit.           | Mengekspor daftar _shot_ yang terorganisir berdasarkan editan Anda saat ini.         |
| 🖼️ **Sequence Inspector**      | Deep dive into image sequence metadata and properties.            | Menelusuri metadata dan properti _image sequence_ secara mendalam.                   |

---

## 📸 Screenshots / Tangkapan Layar

### 🇬🇧 Interface Overview / 🇮🇩 Gambaran Antarmuka

|                                              UI Panel                                                |                                             Timeline Heatmap                                              |
| :---------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="../Preview/UI%20PANEL.png" alt="UI Panel" width="100%"> | <img src="../Preview/TIMELINE%20HEATMAP.png" alt="Timeline Heatmap" width="100%"> |

|                                              Sequence Inspector                                               |                                          Shot Notes Panel                                           |
| :-----------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
| <img src="../Preview/SEQUENCE%20INSPECTOR.png" alt="Sequence Inspector" width="100%"> | <img src="../Preview/SHOT%20NOTE%20PANEL.png" alt="Shot Notes Panel" width="100%"> |

|                                              Refresh Render Panel                                             |                                                                                                     |
| :-----------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
| <img src="../Preview/REFRESH%20RENDER%20PANEL.png" alt="Refresh Render Panel" width="100%"> |                                                                                                     |

---

## 🎥 Demo / Demo Penggunaan

### 🇬🇧 English

![FrameTrace Demo](../Preview/demo.gif)

Watch how FrameTrace instantly detects the original frame numbers from a heavily trimmed image sequence in the premiere timeline, allowing accurate extraction of Blender render ranges in a single click.

### 🇮🇩 Indonesian

Di atas adalah tampilan bagaimana FrameTrace secara instan mendeteksi nomor _frame_ asli dari _image sequence_ yang telah banyak dipotong di _timeline_ Premiere, memungkinkan pengekstrakan rentang _render_ Blender secara akurat hanya dengan satu klik.

---

## 💻 Compatibility / Kompatibilitas

| Software / Perangkat Lunak | Version / Versi |
| :--- | :--- |
| **Adobe Premiere Pro** | 2022 and newer (2022+) |
| **Operating System** | Windows / macOS |
| **CEP Extensions** | Supported / Didukung |

---

## 🚀 Installation Guide / Panduan Instalasi

### 🇬🇧 English

Follow these steps to install the FrameTrace extension in Adobe Premiere Pro:

1. **Download** the repository or the latest release `.zip`.
2. **Copy** the `FrameTrace` folder to the CEP extensions directory:
   - **Windows:**
     ```path
     C:\Program Files (x86)\Common Files\Adobe\CEP\extensions
     ```
   - **Mac:**
     ```path
     /Library/Application Support/Adobe/CEP/extensions/
     ```
3. **Enable** CEP debug mode (if the plugin is unsigned):
   - Open Command Prompt and run:
     ```cmd
     reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.11" /v PlayerDebugMode /t REG_SZ /d 1 /f
     ```
     _(Change `CSXS.11` to match your Premiere Pro CSXS version if needed)._
4. **Restart** Adobe Premiere Pro.
5. **Open** the plugin natively from the top menu:
   `Window → Extensions → FrameTrace`

### 🇮🇩 Indonesian

Ikuti langkah-langkah berikut untuk menginstal ekstensi FrameTrace di Adobe Premiere Pro:

1. **Unduh** repositori atau rilis `.zip` terbaru.
2. **Salin** folder `FrameTrace` ke direktori ekstensi CEP:
   - **Windows:**
     ```path
     C:\Program Files (x86)\Common Files\Adobe\CEP\extensions
     ```
   - **Mac:**
     ```path
     /Library/Application Support/Adobe/CEP/extensions/
     ```
3. **Aktifkan** mode debug CEP (jika plugin tidak ada _signature_):
   - Buka Command Prompt dan jalankan:
     ```cmd
     reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.11" /v PlayerDebugMode /t REG_SZ /d 1 /f
     ```
     _(Ubah `CSXS.11` sesuai dengan versi CSXS Premiere Pro Anda jika perlu)._
4. **Mulai ulang** Adobe Premiere Pro.
5. **Buka** plugin secara langsung dari menu atas:
   `Window → Extensions → FrameTrace`

---

## 🛠️ How to Use / Cara Penggunaan

### 🇬🇧 English

1. **Import:** Import your rendered image sequence (e.g., from Blender) into Premiere Pro.
2. **Edit:** Trim and edit the clip normally in the Premiere timeline.
3. **Select:** Select the trimmed clip in the timeline.
4. **Analyze:** Open FrameTrace and click the **"Analyze Selected Clip"** button.
5. **Copy:** FrameTrace will calculate the exact original frames. Copy the Blender render range.

**Example Output:**

```text
Start Frame: 216
End Frame: 500
```

_You can now paste these values directly into Blender to render only what is visible in your Premiere edit!_

### 🇮🇩 Indonesian

1. **Impor:** Impor _image sequence_ yang telah di-_render_ (contoh: dari Blender) ke Premiere Pro.
2. **Edit:** Potong dan edit klip seperti biasa di _timeline_ Premiere.
3. **Pilih:** Pilih klip yang dipotong di _timeline_.
4. **Analisis:** Buka FrameTrace dan klik tombol **"Analyze Selected Clip"**.
5. **Salin:** FrameTrace akan menghitung _frame_ asli dengan tepat. Salin rentang _render_ Blender.

**Contoh Output:**

```text
Start Frame: 216
End Frame: 500
```

_Kini Anda dapat menempelkan nilai ini langsung ke Blender untuk me-render hanya bagian yang terlihat di editan Premiere Anda!_

---

## 🔄 Workflow Example / Contoh Alur Kerja

### 🇬🇧 English

The standard pipeline optimized by FrameTrace:
`Blender` ➡️ `Image Sequence` ➡️ `Premiere Animatic` ➡️ `FrameTrace` ➡️ `Blender Re-render`

### 🇮🇩 Indonesian

Alur kerja standar yang dioptimalkan oleh FrameTrace:
`Blender` ➡️ `Image Sequence` ➡️ `Premiere Animatic` ➡️ `FrameTrace` ➡️ `Blender Re-render`

---

## 🎯 Who is this for? / Untuk Siapa Ini?

### 🇬🇧 English

- 🧑‍🎨 **VFX Artists:** Tracking frame data between edit and composite workflows.
- 🧊 **Blender Animators:** Avoiding rendering unnecessary frames.
- 🎬 **3D Filmmakers:** Managing complex animatic-to-final render pipelines.
- ⚙️ **Technical Artists & Pipeline Developers:** Automating tedious frame calculations and list generation.

### 🇮🇩 Indonesian

- 🧑‍🎨 **Seniman VFX:** Melacak data _frame_ antara alur kerja editan dan _composite_.
- 🧊 **Animator Blender:** Menghindari me-render _frame_ yang tidak perlu.
- 🎬 **Pembuat Film 3D:** Mengelola pipeline kompleks dari _animatic_ ke hasil _render_ akhir.
- ⚙️ **Technical Artist & Pengembang Pipeline:** Mengotomatisasi perhitungan _frame_ dan pembuatan daftar _shot_ yang membosankan.

---

## 🗺️ Roadmap / Rencana Pengembangan

### 🇬🇧 English

- [ ] Direct API integration with Blender (Add-on sync)
- [ ] Export directly to After Effects compositions
- [ ] AI-based automated shot detection
- [ ] Support for DaVinci Resolve

### 🇮🇩 Indonesian

- [ ] Integrasi API langsung dengan Blender (Sinkronisasi Add-on)
- [ ] Ekspor langsung ke komposisi After Effects
- [ ] Deteksi _shot_ otomatis berbasis AI
- [ ] Dukungan untuk DaVinci Resolve

---

## 🤝 Contributing / Berkontribusi

### 🇬🇧 English

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) to report bugs or suggest new features. If you'd like to contribute code:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### 🇮🇩 Indonesian

Kontribusi, masalah, dan permintaan fitur sangat dipersilakan! Jangan ragu untuk memeriksa [halaman issues](#) untuk melaporkan _bug_ atau menyarankan fitur baru. Jika Anda ingin berkontribusi kode:

1. _Fork_ proyek ini.
2. Buat _branch_ fitur Anda (`git checkout -b feature/FiturKeren`).
3. _Commit_ perubahan Anda (`git commit -m 'Menambahkan FiturKeren'`).
4. _Push_ ke _branch_ tersebut (`git push origin feature/FiturKeren`).
5. Buka sebuah _Pull Request_.

---

## 🚀 Future Vision / Visi Masa Depan

### 🇬🇧 English

Our long-term vision is to evolve FrameTrace from a simple frame calculator into a comprehensive, automated pipeline bridge connecting non-linear editors (Premiere/DaVinci) directly with 3D suites (Blender/Maya/Unreal) and compositing tools (Nuke/After Effects). We aim to automate round-tripping for modern filmmakers and indie animation studios.

### 🇮🇩 Indonesian

Visi jangka panjang kami adalah mengembangkan FrameTrace dari sekadar kalkulator _frame_ menjadi jembatan pipeline otomatis dan komprehensif yang menghubungkan editor non-linear (Premiere/DaVinci) secara langsung dengan paket 3D (Blender/Maya/Unreal) dan alat _compositing_ (Nuke/After Effects). Kami bertujuan untuk mengotomatisasi alur kerja bolak-balik bagi pembuat film modern dan studio animasi indie.

---

## ⭐ Support This Project / Dukung Proyek Ini

### 🇬🇧 English

If FrameTrace helps improve your rendering pipeline and workflow, please consider supporting the project:
- ⭐ **Star the repository** to help others discover it.
- 🐛 **Report bugs** in the issue tracker.
- 💡 **Suggest new features** or improvements.

### 🇮🇩 Indonesian

Jika FrameTrace membantu meningkatkan pipeline _rendering_ dan alur kerja Anda, mohon pertimbangkan untuk mendukung proyek ini:
- ⭐ **Beri Bintang (Star) pada repositori** untuk membantu orang lain menemukannya.
- 🐛 **Laporkan bug** di pelacak masalah (_issue tracker_).
- 💡 **Sarankan fitur baru** atau peningkatan.

---

## 👨‍💻 Author / Penulis

Created and maintained by **Renando (Nando)** <br>
*VFX Artist, 3D Animator & Creative Tool Developer*

---

## 📄 License / Lisensi

### 🇬🇧 English

Distributed under the MIT License. See `LICENSE` for more information.

### 🇮🇩 Indonesian

Didistribusikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk informasi lebih lanjut.

---

<p align="center">
  <i>Built to optimize your pipeline.</i> 🚀<br>
  <b>Search Keywords:</b> premiere pro plugin, image sequence tool, vfx pipeline, blender workflow, frame range calculator, render range tool, animation pipeline, timeline analysis plugin, premiere frame analyzer, premiere-extension, blender-render-tool, vfx-tools.
</p>
