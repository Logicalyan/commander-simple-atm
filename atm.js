#!/usr/bin/env node
const { program } = require('commander');
const { sequelize } = require('./models');
const session = require('./services/session');
const auth = require('./controllers/authController');
const user = require('./controllers/userController');
const tx = require('./controllers/transactionController');

async function init() {
  await sequelize.sync();
}

program
  .command('register <name> <pin>')
  .alias('reg')
  .description('Daftar akun baru')
  .action(auth.register);

program
  .command('login <name> <pin>')
  .alias('li')
  .description('Masuk ke akun')
  .action(auth.login);

program
  .command('logout')
  .alias('lo')
  .description('Keluar dari akun')
  .action(() => {
    session.logout();
    console.log('✅ Berhasil logout.');
  });

program
  .command('balance')
  .alias('b')
  .description('Cek saldo')
  .action(async () => {
    if (!(await session.isLoggedIn())) return console.log('❌ Harus login dulu.');
    await user.balance();
  });

program
  .command('deposit <amount>')
  .alias('d')
  .description('Setor uang')
  .action(async (amount) => {
    if (!(await session.isLoggedIn())) return console.log('❌ Harus login dulu.');
    await tx.deposit(parseInt(amount));
  });

program
  .command('withdraw <amount>')
  .alias('w')
  .description('Tarik uang')
  .action(async (amount) => {
    if (!(await session.isLoggedIn())) return console.log('❌ Harus login dulu.');
    await tx.withdraw(parseInt(amount));
  });

program
  .command('transfer <targetName> <amount>')
  .alias('t')
  .description('Transfer ke pengguna lain')
  .action(async (targetName, amount) => {
    if (!(await session.isLoggedIn())) return console.log('❌ Harus login dulu.');
    await tx.transfer(targetName, parseInt(amount));
  });

program
  .command('history')
  .alias('h')
  .description('Riwayat transaksi')
  .action(async () => {
    if (!(await session.isLoggedIn())) return console.log('❌ Harus login dulu.');
    await tx.history();
  });

// Tampilkan bantuan jika tidak ada argumen
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

init().then(() => program.parse(process.argv));
