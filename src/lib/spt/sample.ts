import type { SptPayload } from "./types";

/** Rekonstruksi SPT Masa PPN Juli 2026 — PKP Vidya Amaliah (dokumen sumber). */
export const SAMPLE_VIDYA_JULI_2026: SptPayload = {
  identitas: {
    namaPkp: "VIDYA AMALIAH",
    npwp: "0934538901822000",
    alamat: "JL NANI WARTABONE RUKO BONANZA NO.2, RT 002, RW 004, LIMBA U I, KOTA SELATAN, KOTA GORONTALO, GORONTALO, Indonesia 96115",
    telepon: "62811435431",
    hp: "0811435431",
    klu: "AKTIVITAS TELEKOMUNIKASI LAINNYA YTDL",
  },
  header: { masaBulan: 7, masaTahun: 2026, tahunBukuAwal: 1, tahunBukuAkhir: 12, jenis: "NORMAL", pembetulanKe: 0 },
  i: {
    a1: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    a2: { hargaJual: 4080846427, dppNilaiLain: 3740775891, ppn: 448893106, ppnbm: 0 },
    a3: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    a4: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    a5: { hargaJual: 6584704813, dppNilaiLain: 6035979412, ppn: 724317529, ppnbm: 0 },
    a6: { hargaJual: 319082543, dppNilaiLain: 292783998, ppn: 35099080, ppnbm: 0 },
    a7: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    a8: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    a9: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    b: { hargaJual: 0 },
  },
  ii: {
    a: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    b: { hargaJual: 10762120877, dppNilaiLain: 9865423428, ppn: 1183850811, ppnbm: 0 },
    c: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    d: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    e: { ppn: 943377426 },
    f: { ppn: 0 },
    h: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
    i: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
  },
  iii: { b: 0, d: 0, f: null, permintaan: "dikompensasikan", bank: { nomor: "", namaPemilik: "", namaBank: "" } },
  iv: { dpp: 0, ppn: 0 },
  v: { ppn: 0 },
  vi: { b: 0, d: null, f: false },
  vii: { a: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 }, b: null },
  viii: { a: { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 }, b: null },
  ix: { daftarKendaraan: false, penghitunganKembali: false },
  pernyataan: { kota: "KOTA GORONTALO", tanggal: "2026-08-31", jenis: "PKP", nama: "YASIN YUSUF", jabatan: "DIREKTUR" },
};
