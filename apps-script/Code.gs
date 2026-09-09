/**
 * Induk — Google Apps Script untuk SPT Masa PPN
 *
 * Cara pakai:
 * 1. Buat Google Spreadsheet baru, beri nama "Induk SPT PPN".
 * 2. Extensions → Apps Script, hapus kode default, tempel seluruh file ini.
 * 3. Simpan, lalu Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Salin URL Web app ke halaman Pengaturan di Induk.
 *
 * Setiap simpan SPT dari aplikasi akan menulis/memperbarui baris di sheet Ringkasan
 * dan baris rincian di sheet Baris.
 */

const RINGKASAN = "Ringkasan";
const BARIS = "Baris";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === "upsert") {
      upsertSpt(data);
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "Induk SPT PPN" }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function ensureSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ringkasan = ss.getSheetByName(RINGKASAN);
  if (!ringkasan) ringkasan = ss.insertSheet(RINGKASAN);
  if (ringkasan.getLastRow() === 0) {
    ringkasan
      .getRange(1, 1, 1, 16)
      .setValues([
        [
          "ID",
          "Masa Pajak",
          "Bulan",
          "Tahun",
          "Jenis",
          "Status",
          "Nama PKP",
          "NPWP",
          "Total Penyerahan",
          "PPN Keluaran",
          "PPN Masukan",
          "Kurang / (Lebih) Bayar",
          "Permintaan",
          "Penandatangan",
          "Tanggal",
          "Diperbarui",
        ],
      ])
      .setFontWeight("bold");
    ringkasan.setFrozenRows(1);
  }
  let baris = ss.getSheetByName(BARIS);
  if (!baris) baris = ss.insertSheet(BARIS);
  if (baris.getLastRow() === 0) {
    baris
      .getRange(1, 1, 1, 8)
      .setValues([["ID SPT", "Masa Pajak", "Kode", "Uraian", "Harga Jual", "DPP", "PPN", "PPnBM"]])
      .setFontWeight("bold");
    baris.setFrozenRows(1);
  }
  return { ringkasan, baris };
}

function upsertSpt(data) {
  const { ringkasan, baris } = ensureSheets_();
  const s = data.spt;
  const values = [
    s.id,
    s.masa,
    s.masaBulan,
    s.masaTahun,
    s.jenis,
    s.status,
    s.namaPkp,
    s.npwp,
    s.totalPenyerahan,
    s.ppnKeluaran,
    s.ppnMasukan,
    s.ppnKurangLebih,
    s.permintaan,
    s.penandatangan,
    s.tanggal,
    s.updatedAt,
  ];

  const ids = ringkasan.getRange(2, 1, Math.max(ringkasan.getLastRow() - 1, 1), 1).getValues();
  let found = -1;
  for (let i = 0; i < ids.length; i++) {
    if (ids[i][0] === s.id) {
      found = i + 2;
      break;
    }
  }
  if (found > 0) ringkasan.getRange(found, 1, 1, values.length).setValues([values]);
  else ringkasan.appendRow(values);

  const last = baris.getLastRow();
  if (last > 1) {
    const idCol = baris.getRange(2, 1, last - 1, 1).getValues();
    for (let i = idCol.length - 1; i >= 0; i--) {
      if (idCol[i][0] === s.id) baris.deleteRow(i + 2);
    }
  }
  const lines = (data.lines || []).map(function (line) {
    return [
      s.id,
      s.masa,
      line.kode,
      line.uraian,
      line.hargaJual,
      line.dpp,
      line.ppn,
      line.ppnbm,
    ];
  });
  if (lines.length) {
    baris.getRange(baris.getLastRow() + 1, 1, lines.length, 8).setValues(lines);
  }
}
