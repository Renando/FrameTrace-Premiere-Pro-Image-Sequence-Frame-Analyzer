<div align="center">

# 🎬 FrameTrace
**Professional Frame Analysis Tool for VFX & Blender Pipelines**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)

<img src="https://via.placeholder.com/1200x400?text=FrameTrace+Hero+Image" alt="FrameTrace Hero Image" width="100%">

</div>

---

## 📖 Project Overview / Ringkasan Proyek

### 🇬🇧 English
**FrameTrace** is an Adobe Premiere Pro extension designed specifically for VFX artists, 3D animators, and Blender users who work with image sequence pipelines.

**The Problem:**
When you trim or edit image sequences in Premiere Pro, the timeline resetting makes it difficult to track back to the original source frames. Premiere Pro resets the frame numbers when trimming image sequences, making re-rendering or compositing a nightmare.

**The Solution:**
FrameTrace reads the original frame numbers directly from your file names or metadata and automatically calculates the correct, exact render range needed for your 3D software (like Blender) or compositing tools.

### 🇮🇩 Indonesian
**FrameTrace** adalah ekstensi Adobe Premiere Pro yang dirancang khusus untuk seniman VFX, animator 3D, dan pengguna Blender yang bekerja dengan pipeline *image sequence* (urutan gambar).

**Masalah:**
Saat Anda memotong (trim) atau mengedit *image sequence* di Premiere Pro, reset *timeline* membuatnya sulit untuk melacak kembali ke *frame* sumber asli. Premiere Pro mengatur ulang nomor *frame* saat memotong *image sequence*, membuat proses *re-render* atau *compositing* menjadi sangat rumit.

**Solusi:**
FrameTrace membaca nomor *frame* asli langsung dari nama file atau metadata Anda dan secara otomatis menghitung rentang *render* yang benar dan tepat yang dibutuhkan untuk perangkat lunak 3D Anda (seperti Blender) atau alat *compositing*.

---

## ✨ Key Features / Fitur Utama

| Feature / Fitur | 🇬🇧 Description | 🇮🇩 Deskripsi |
| :--- | :--- | :--- |
| 🔍 **Frame Range Detection** | Accurately detects original source frame ranges of trimmed clips. | Mendeteksi rentang *frame* sumber asli dari klip yang dipotong dengan akurat. |
| ⚠️ **Missing Frame Detection** | Identifies dropped or missing frames in your sequence. | Mengidentifikasi *frame* yang terlewat atau hilang dalam *sequence* Anda. |
| 🔢 **Frame Padding Detection** | Automatically recognizes file padding (e.g., `0001` vs `1`). | Secara otomatis mengenali *padding* file (contoh: `0001` vs `1`). |
| 🌡️ **Timeline Heatmap** | Visualizes sequence usage and overlaps directly in the timeline. | Memvisualisasikan penggunaan *sequence* dan tumpang tindih langsung di *timeline*. |
| 🔄 **Smart Replace Sequence** | Refresh renders with a single click after updating source files. | Segarkan *render* dengan satu klik setelah memperbarui file sumber (Render Refresh). |
| 📝 **Shot Notes System** | Attach custom notes to specific shots for collaborative review. | Lampirkan catatan khusus pada *shot* tertentu untuk ulasan kolaboratif. |
| ⚙️ **Blender Range Generator** | Outputs exact start/end frames formatted for Blender pipelines. | Menghasilkan *frame* awal/akhir yang diformat khusus untuk pipeline Blender. |
| 📋 **Shot List Generator** | Export organized shot lists based on your current edit. | Mengekspor daftar *shot* yang terorganisir berdasarkan editan Anda saat ini. |
| 🖼️ **Sequence Inspector** | Deep dive into image sequence metadata and properties. | Menelusuri metadata dan properti *image sequence* secara mendalam. |

---

## 📸 Screenshots / Tangkapan Layar

### 🇬🇧 Interface Overview / 🇮🇩 Gambaran Antarmuka

| UI Panel | Timeline Heatmap |
|:---:|:---:|
| <img src="https://via.placeholder.com/600x400?text=UI+Panel+Placeholder" alt="UI Panel" width="100%"> | <img src="https://via.placeholder.com/600x400?text=Timeline+Heatmap" alt="Timeline Heatmap" width="100%"> |

| Sequence Inspector | Shot Notes Panel |
|:---:|:---:|
| <img src="https://via.placeholder.com/600x400?text=Sequence+Inspector" alt="Sequence Inspector" width="100%"> | <img src="https://via.placeholder.com/600x400?text=Shot+Notes" alt="Shot Notes Panel" width="100%"> |

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
     *(Change `CSXS.11` to match your Premiere Pro CSXS version if needed).*
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
3. **Aktifkan** mode debug CEP (jika plugin tidak ada *signature*):
   - Buka Command Prompt dan jalankan:
     ```cmd
     reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.11" /v PlayerDebugMode /t REG_SZ /d 1 /f
     ```
     *(Ubah `CSXS.11` sesuai dengan versi CSXS Premiere Pro Anda jika perlu).*
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
*You can now paste these values directly into Blender to render only what is visible in your Premiere edit!*

### 🇮🇩 Indonesian
1. **Impor:** Impor *image sequence* yang telah di-*render* (contoh: dari Blender) ke Premiere Pro.
2. **Edit:** Potong dan edit klip seperti biasa di *timeline* Premiere.
3. **Pilih:** Pilih klip yang dipotong di *timeline*.
4. **Analisis:** Buka FrameTrace dan klik tombol **"Analyze Selected Clip"**.
5. **Salin:** FrameTrace akan menghitung *frame* asli dengan tepat. Salin rentang *render* Blender.

**Contoh Output:**
```text
Start Frame: 216
End Frame: 500
```
*Kini Anda dapat menempelkan nilai ini langsung ke Blender untuk me-render hanya bagian yang terlihat di editan Premiere Anda!*

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
- 🧑‍🎨 **Seniman VFX:** Melacak data *frame* antara alur kerja editan dan *composite*.
- 🧊 **Animator Blender:** Menghindari me-render *frame* yang tidak perlu.
- 🎬 **Pembuat Film 3D:** Mengelola pipeline kompleks dari *animatic* ke hasil *render* akhir.
- ⚙️ **Technical Artist & Pengembang Pipeline:** Mengotomatisasi perhitungan *frame* dan pembuatan daftar *shot* yang membosankan.

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
- [ ] Deteksi *shot* otomatis berbasis AI
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
Kontribusi, masalah, dan permintaan fitur sangat dipersilakan! Jangan ragu untuk memeriksa [halaman issues](#) untuk melaporkan *bug* atau menyarankan fitur baru. Jika Anda ingin berkontribusi kode:
1. *Fork* proyek ini.
2. Buat *branch* fitur Anda (`git checkout -b feature/FiturKeren`).
3. *Commit* perubahan Anda (`git commit -m 'Menambahkan FiturKeren'`).
4. *Push* ke *branch* tersebut (`git push origin feature/FiturKeren`).
5. Buka sebuah *Pull Request*.

---

## 📄 License / Lisensi

### 🇬🇧 English
Distributed under the MIT License. See `LICENSE` for more information.

### 🇮🇩 Indonesian
Didistribusikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk informasi lebih lanjut.

---

<p align="center">
  <i>Built to optimize your pipeline.</i> 🚀<br>
  <b>Search Keywords:</b> Premiere Pro plugin, image sequence frame tool, Blender pipeline tool, VFX workflow tool, Premiere frame analyzer, animation render range tool, Blender render frame calculator, Premiere Pro extension, VFX pipeline plugin.
</p>
