import type { MoneyLine, SptPayload } from "./types";

function sumLines(lines: MoneyLine[]): MoneyLine {
  return lines.reduce(
    (acc, line) => ({
      hargaJual: acc.hargaJual + line.hargaJual,
      dppNilaiLain: acc.dppNilaiLain + line.dppNilaiLain,
      ppn: acc.ppn + line.ppn,
      ppnbm: acc.ppnbm + line.ppnbm,
    }),
    { hargaJual: 0, dppNilaiLain: 0, ppn: 0, ppnbm: 0 },
  );
}

export type SptComputed = {
  iJumlah: MoneyLine;
  iC: number;
  iiG: { hargaJual: number; ppn: number };
  iiJ: number;
  iiiA: number;
  iiiC: number;
  iiiE: number;
  iiiG: number | null;
  viA: number;
  viC: number;
  viE: number | null;
  viiC: number | null;
  viiiC: number | null;
};

export function compute(p: SptPayload): SptComputed {
  const iJumlah = sumLines([
    p.i.a1, p.i.a2, p.i.a3, p.i.a4, p.i.a5, p.i.a6, p.i.a7, p.i.a8, p.i.a9,
  ]);
  const iC = iJumlah.hargaJual + p.i.b.hargaJual;
  const iiG = {
    hargaJual: p.ii.a.hargaJual + p.ii.b.hargaJual + p.ii.c.hargaJual + p.ii.d.hargaJual,
    ppn: p.ii.a.ppn + p.ii.b.ppn + p.ii.c.ppn + p.ii.d.ppn + p.ii.e.ppn + p.ii.f.ppn,
  };
  const iiJ = p.ii.a.hargaJual + p.ii.b.hargaJual + p.ii.c.hargaJual + p.ii.d.hargaJual + p.ii.h.hargaJual + p.ii.i.hargaJual;
  const iiiA = p.i.a2.ppn + p.i.a3.ppn + p.i.a4.ppn + p.i.a5.ppn;
  const iiiC = iiG.ppn;
  const iiiE = iiiA - p.iii.b - iiiC - p.iii.d;
  const iiiG = p.iii.f == null ? null : iiiE - p.iii.f;
  const viA = p.i.a2.ppnbm + p.i.a3.ppnbm + p.i.a4.ppnbm + p.i.a5.ppnbm;
  const viC = viA - p.vi.b;
  const viE = p.vi.d == null ? null : viC - p.vi.d;
  const viiC = p.vii.b == null ? null : p.vii.a.ppn - p.vii.b;
  const viiiC = p.viii.b == null ? null : p.viii.a.ppn - p.viii.b;
  return { iJumlah, iC, iiG, iiJ, iiiA, iiiC, iiiE, iiiG, viA, viC, viE, viiC, viiiC };
}

export function applyTarif12(hargaJual: number): MoneyLine {
  const dppNilaiLain = Math.round((hargaJual * 11) / 12);
  const ppn = Math.round(dppNilaiLain * 0.12);
  return { hargaJual, dppNilaiLain, ppn, ppnbm: 0 };
}

export function totalsFrom(p: SptPayload) {
  const c = compute(p);
  return { totalPenyerahan: c.iC, ppnKeluaran: c.iiiA, ppnMasukan: c.iiiC, ppnKurangLebih: c.iiiE };
}
