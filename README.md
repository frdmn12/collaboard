## How To run Program

Run all

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Run only postgre & redis

```
docker compose up postgre & redis
```

then running the project

```
cd backend-collaboard
npm run start:dev
```

```
cd frontend-collaboard
npm run dev
```


## Melihat database (Adminer)

Buka http://localhost:8080 dan isi: System `PostgreSQL`, Server `postgres`, Username `bayu`, Password `secret123`, Database `collabboard` (nilai dari `.env`).

## Backend: Authentication

Setup sekali: `cp .env.example .env`, lalu isi `JWT_ACCESS_SECRET` (`openssl rand -hex 32`).

Semua lewat Docker (backend + Postgres + Redis + Mailpit + Adminer):

```
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build server postgres redis mailpit adminer
curl localhost:3000/health            # {"status":"ok","db":"up","redis":"up"}
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f server
```

Atau hanya infrastruktur di Docker, backend di host:

```
docker compose up -d postgres redis mailpit adminer   # Postgres :5433, Redis :6379, Mailpit SMTP :1025 / inbox http://localhost:8025, Adminer http://localhost:8080
cd backend-collaboard && npm run start:dev
npm test                                # unit
npm run test:e2e                        # e2e nyata (butuh postgres + mailpit)
```

| Endpoint | Keterangan |
|---|---|
| `POST /auth/register` | `{ name, email, password }`. 201, kirim email verifikasi. 409 bila email sudah ada |
| `POST /auth/verify-email` | `{ token }` dari tautan email (`{FRONTEND_URL}/verifikasi?token=...`). Berlaku 24 jam, idempoten |
| `POST /auth/resend-verification` | `{ email }`. Jawaban selalu sama (tidak membocorkan email terdaftar) |
| `POST /auth/login` | `{ email, password }`. Access token (JWT 15 menit) di body, refresh token (7 hari) di cookie httpOnly. 403 `EMAIL_NOT_VERIFIED` bila belum verifikasi |
| `POST /auth/refresh` | Rotasi refresh token; pemakaian ulang token lama mencabut semua sesi |
| `POST /auth/forgot-password` | `{ email }`. Jawaban selalu sama; email berisi tautan `{FRONTEND_URL}/atur-ulang-kata-sandi?token=...` (60 menit, sekali pakai). 3 permintaan/menit |
| `POST /auth/reset-password` | `{ token, password }`. Mengganti kata sandi dan mencabut semua sesi aktif; 400 bila token tidak valid/sudah dipakai |
| `POST /auth/logout` | Mencabut sesi dan menghapus cookie |
| `GET /users/me` | Butuh `Authorization: Bearer <accessToken>` |

Endpoint `/auth/*` dibatasi 10 permintaan/menit per IP; hitungannya disimpan di Redis, jadi konsisten di banyak instance. `GET /health` memeriksa Postgres dan Redis. Semua route butuh JWT kecuali ditandai `@Public()`.


## Backend: Board & Task

Semua route butuh `Authorization: Bearer <accessToken>`. Bukan anggota papan = 404; anggota dengan peran kurang = 403.

| Endpoint | Peran | Keterangan |
|---|---|---|
| `POST /boards` `{ name, description? }` | login | Pembuat otomatis admin + pemilik |
| `GET /boards` | login | Papan milik saya + statistik (`memberCount`, `taskCount`, `doneCount`, `progress`) |
| `GET/PATCH/DELETE /boards/:boardId` | anggota / admin / pemilik | Hapus papan = pemilik saja, tugas ikut terhapus |
| `GET /boards/:boardId/members` | anggota | |
| `POST /boards/:boardId/members` `{ email, role? }` | admin | Pengguna harus sudah punya akun (404 `USER_NOT_FOUND`), 409 bila sudah anggota |
| `PATCH /boards/:boardId/members/:userId` `{ role }` | admin | Peran pemilik terkunci |
| `DELETE /boards/:boardId/members/:userId` | admin, atau diri sendiri | Pemilik tidak bisa keluar |
| `GET /boards/:boardId/tasks?status&assigneeId&q&pinned` | anggota | Diurutkan per kolom lalu `order` |
| `POST /boards/:boardId/tasks` | anggota | `title`, `description`, `status`, `tags`, `priority`, `dueDate`, `assigneeId`, `progress` |
| `PATCH /boards/:boardId/tasks/:taskId` | anggota | Tidak mengubah status; `null` mengosongkan penanggung jawab/tenggat |
| `POST /boards/:boardId/tasks/:taskId/move` `{ status, position }` | anggota | Drag & drop: kolom dan urutan dirapikan atomik (papan dikunci) |
| `DELETE /boards/:boardId/tasks/:taskId` | anggota | |
| `PUT/DELETE /boards/:boardId/tasks/:taskId/pin` | anggota | Sematan bersifat pribadi |
| `GET /tasks/pinned` | login | Tugas tersemat saya, lintas papan |
| `GET /boards/:boardId/tasks/:taskId/comments?limit&before` | anggota | Komentar lama ke baru; `limit` 1-100 (bawaan 50). Respons `{ items, nextBefore }`: kirim `nextBefore` sebagai `before` untuk memuat yang lebih lama |
| `POST /boards/:boardId/tasks/:taskId/comments` `{ body }` | anggota | 1-2000 karakter, 20/menit |
| `PATCH .../comments/:commentId` `{ body }` | penulis saja | Menandai `edited` bila isi berubah |
| `DELETE .../comments/:commentId` | penulis atau admin | |

Status tugas: `todo`, `doing`, `review`, `done`. Setiap tugas membawa `commentCount`. Item komentar memuat `canEdit` dan `canDelete` untuk pengguna yang meminta.

Tes e2e: suite board dan komentar mematikan rate limit (`THROTTLE_DISABLED`, ditolak di production). Suite auth menguji rate limit sungguhan, jadi beri jeda satu menit bila dijalankan dua kali berturut-turut.

## Backend: Notifikasi

Notifikasi dalam aplikasi (belum ada pengiriman email atau push). Semua route butuh login dan hanya menyentuh notifikasi milik sendiri.

| Endpoint | Keterangan |
|---|---|
| `GET /notifications?limit&before&unread` | Terbaru dulu. Respons `{ items, nextBefore, unreadCount }`; `limit` 1-100 (bawaan 20); `unread=true` hanya yang belum dibaca |
| `GET /notifications/unread-count` | `{ count }`, ringan untuk polling lencana lonceng |
| `POST /notifications/:id/read` | 204, idempoten; milik orang lain 404 |
| `POST /notifications/read-all` | `{ updated }` |
| `GET/PATCH /notifications/preferences` | `{ assigned, comment, review, boardAdded }`, bawaan semua aktif |

Jenis (`type`) dan pemicunya (pelaku sendiri tidak pernah dikabari):

| `type` | Pemicu | Penerima |
|---|---|---|
| `task_assigned` | Tugas dibuat atau diubah dengan penanggung jawab baru | Penanggung jawab |
| `comment_added` | Komentar baru | Penanggung jawab + peserta diskusi sebelumnya (`data.preview` maks 120 karakter) |
| `review_requested` | Tugas pindah ke kolom Review | Admin papan |
| `board_added` | Ditambahkan ke papan | Yang ditambahkan |

Setiap notifikasi membawa `actor`, `boardId`, `taskId`, dan `data` (`taskTitle`, `boardName`) yang dibekukan saat dibuat. Notifikasi ikut terhapus bersama tugas atau papannya. Kegagalan membuat notifikasi hanya dicatat dan tidak menggagalkan aksi utamanya.


## Dokumentasi API (Swagger)

Seluruh endpoint backend terdokumentasi dengan OpenAPI (`@nestjs/swagger`), termasuk bentuk envelope sukses/galat, kode galat domain, rate limit, dan aturan 404 vs 403 untuk papan.

- UI interaktif: `http://localhost:3000/docs`
- Spesifikasi JSON: `http://localhost:3000/docs-json`
- Aktif secara bawaan selain di production. Di production hanya menyala bila `SWAGGER_ENABLED=true` di `.env`.
- **Authorize**: login dulu (`POST /auth/login` dari UI, atau `curl -X POST localhost:3000/auth/login -H 'Content-Type: application/json' -d '{"email":"...","password":"..."}'`), salin `data.accessToken`, klik tombol **Authorize** di kanan atas UI, tempel token tanpa kata `Bearer`. Token tersimpan di browser (berlaku 15 menit; ulangi login bila kedaluwarsa). Route publik (Auth, Health) tidak bergembok.
- Cookie refresh token (`refresh_token`) dipasang browser saat login lewat `Set-Cookie`; "Try it out" untuk `/auth/refresh` memakainya otomatis hanya bila UI dan API satu origin.
- Ekspor spesifikasi (mis. untuk generator klien atau Postman): `curl -o openapi.json http://localhost:3000/docs-json`.
- Properti DTO diturunkan otomatis oleh plugin Swagger di `nest-cli.json` saat `nest build`/`nest start`; tes e2e (ts-jest) tidak memakainya dan tidak terpengaruh.
