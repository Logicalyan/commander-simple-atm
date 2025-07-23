# 💳 ATM CLI - Aplikasi Command-Line ATM Sederhana

ATM CLI adalah aplikasi command-line sederhana yang meniru sistem kerja mesin ATM. Dibangun menggunakan Node.js dan Commander.js, aplikasi ini menyediakan fitur-fitur seperti registrasi pengguna, login, cek saldo, deposit, penarikan, transfer ke pengguna lain, dan riwayat transaksi.

---

## 📦 Fitur Unggulan

- 🔐 **Registrasi dan Login** menggunakan PIN
- 💼 **Cek Saldo** pengguna yang sedang login
- 💰 **Deposit** saldo
- 🏧 **Penarikan (Withdraw)** uang
- 🔁 **Transfer** ke pengguna lain menggunakan nama
- 🕓 **Riwayat Transaksi** lengkap
- 🚪 **Logout** dari sesi pengguna

---

## 🚀 Teknologi yang Digunakan

- **Node.js** – runtime JavaScript server-side
- **Commander.js** – library CLI interaktif
- **Sequelize ORM** – ORM untuk MySQL
- **MySQL/MariaDB** – database relasional
- **dotenv** – untuk konfigurasi environment

---

## 📁 Struktur Proyek
```
commander-simple-atm/
├── atm.js # Entry point aplikasi CLI
├── .env # Konfigurasi koneksi database
├── models/ # Model Sequelize (User, Transaction)
│ ├── user.js
│ ├── transaction.js
│ └── index.js
├── controllers/ # Logika perintah utama
│ ├── authController.js
│ ├── userController.js
│ └── transactionController.js
├── services/ # Session helper
│ └── session.js
├── package.json
```

---

## ⚙️ Instalasi

### 1. Clone repository

```bash
git clone https://github.com/logicalyan/commander-simple-atm.git
cd commander-simple-atm
```

### 2. Install depedency

```bash
npm install
```

### 3. Setup .env

contoh:
```bash
DB_NAME=db_atm
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_PORT=3306
```
### 4. Jalankan CLI
```bash
atm
```
atau
```bash
node atm.js
```

