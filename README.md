# ElysiaJS + Drizzle + MySQL with Bun

Proyek backend menggunakan Bun runtime, framework ElysiaJS, dan Drizzle ORM yang terhubung ke database MySQL.

## Persyaratan
- [Bun](https://bun.sh/)
- MySQL Server (misal: via Laragon, XAMPP, atau Docker)

## Instalasi Dependensi
```bash
bun install
```

## Konfigurasi Lingkungan
Salin file `.env.example` ke `.env` dan sesuaikan kredensial MySQL Anda:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=belajar_vibe_koding
```

Pastikan database `belajar_vibe_koding` sudah dibuat di MySQL Anda.

## Migrasi Database
1. Generate migration files:
   ```bash
   bun run db:generate
   ```
2. Terapkan schema langsung (Drizzle push):
   ```bash
   bun run db:push
   ```
3. Buka Drizzle Studio (opsional UI database):
   ```bash
   bun run db:studio
   ```

## Menjalankan Server
Jalankan development server dengan watch mode:
```bash
bun run dev
```

Server akan aktif di `http://localhost:3000`.

## API Endpoints
- `GET /`: Health check endpoint.
- `GET /users`: Mengambil semua daftar user.
- `GET /users/:id`: Mengambil data user berdasarkan ID.
- `POST /users`: Menambahkan user baru (Body: `{ "name": "...", "email": "..." }`).
- `DELETE /users/:id`: Menghapus user berdasarkan ID.

