create table if not exists spt_masa (
  id text primary key,
  user_id text not null,
  status text not null default 'draf',
  masa_bulan integer not null,
  masa_tahun integer not null,
  jenis text not null default 'NORMAL',
  nama_pkp text not null default '',
  npwp text not null default '',
  payload text not null,
  total_penyerahan bigint not null default 0,
  ppn_keluaran bigint not null default 0,
  ppn_masukan bigint not null default 0,
  ppn_kurang_lebih bigint not null default 0,
  permintaan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists spt_masa_user_id_idx on spt_masa (user_id);
create index if not exists spt_masa_user_masa_idx on spt_masa (user_id, masa_tahun, masa_bulan);

create table if not exists sheets_config (
  user_id text primary key,
  webapp_url text,
  spreadsheet_url text,
  last_synced_at timestamptz,
  last_error text,
  updated_at timestamptz not null default now()
);
