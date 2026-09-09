# Induk — SPT Masa PPN

Workspace digital untuk formulir **Induk SPT Masa PPN** (rekonstruksi struktur resmi: identitas PKP, I Penyerahan, II Perolehan, III Penghitungan kurang/lebih bayar, IV–IX).

Bukan saluran resmi DJP. Untuk arsip, pencatatan, dan hitungan internal PKP.

Repositori privat: [fahruldengo/induk-spt-ppn](https://github.com/fahruldengo/induk-spt-ppn)

## Isi

- Halaman masuk (Google, X, atau email)
- Editor formulir dengan rumus resmi (III.A = I.A.2+3+4+5, III.E = A−B−C−D, dst.)
- Lembar cetak yang meniru tata letak Induk halaman 1–2
- Buku spreadsheet + unduhan CSV
- Sinkronisasi ke Google Sheets lewat Apps Script (`apps-script/Code.gs`)

Data contoh: SPT Masa Juli 2026 PKP Vidya Amaliah, hasil reverse-engineering dokumen sumber.

## Google Sheets

1. Buat spreadsheet baru.
2. Extensions → Apps Script, tempel `apps-script/Code.gs`.
3. Deploy → Web app (Execute as: Me, Who has access: Anyone).
4. Tempel URL di halaman Pengaturan, lalu Sinkronkan.

## Catatan

Angka rupiah disimpan utuh. Tarif 12% dengan DPP 11/12 tersedia sebagai tombol bantu, tidak dipaksa — sesuai fakta bahwa baris faktur bisa campur tarif.
