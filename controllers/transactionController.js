const { User, Transaction } = require('../models');
const session = require('../services/session');

function formatRupiah(value) {
  return `Rp${value.toLocaleString('id-ID')}`;
}

async function logTransaction(data) {
  try {
    await Transaction.create(data);
  } catch (err) {
    console.log('❌ Gagal mencatat transaksi:', err.message);
  }
}

module.exports = {
  async deposit(amount) {
    const user = await session.currentUser();
    if (!user) return console.log('❌ Harus login terlebih dahulu.');

    amount = parseInt(amount);
    if (isNaN(amount) || amount <= 0) return console.log('❌ Jumlah tidak valid.');

    user.balance += amount;
    await user.save();

    await logTransaction({ user_id: user.id, type: 'deposit', amount });
    console.log(`✅ Deposit ${formatRupiah(amount)} berhasil.`);
  },

  async withdraw(amount) {
    const user = await session.currentUser();
    if (!user) return console.log('❌ Harus login terlebih dahulu.');

    amount = parseInt(amount);
    if (isNaN(amount) || amount <= 0) return console.log('❌ Jumlah tidak valid.');
    if (user.balance < amount) return console.log('❌ Saldo tidak cukup.');

    user.balance -= amount;
    await user.save();

    await logTransaction({ user_id: user.id, type: 'withdraw', amount });
    console.log(`✅ Withdraw ${formatRupiah(amount)} berhasil.`);
  },

  async transfer(targetName, amount) {
    const sender = await session.currentUser();
    if (!sender) return console.log('❌ Harus login terlebih dahulu.');

    const receiver = await User.findOne({ where: { name: targetName } });
    if (!receiver) return console.log('❌ Pengguna tujuan tidak ditemukan.');
    if (sender.id === receiver.id) return console.log('❌ Tidak dapat transfer ke diri sendiri.');

    amount = parseInt(amount);
    if (isNaN(amount) || amount <= 0) return console.log('❌ Jumlah tidak valid.');
    if (sender.balance < amount) return console.log('❌ Saldo tidak mencukupi.');

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    await logTransaction({
      user_id: sender.id,
      type: 'transfer_out',
      amount,
      target_id: receiver.id,
    });

    await logTransaction({
      user_id: receiver.id,
      type: 'transfer_in',
      amount,
      target_id: sender.id,
    });

    console.log(`✅ Transfer ke ${receiver.name} sebesar ${formatRupiah(amount)} berhasil.`);
  },

  async history() {
    const user = await session.currentUser();
    if (!user) return console.log('❌ Harus login terlebih dahulu.');

    const txs = await Transaction.findAll({
      where: { user_id: user.id },
      order: [['created_at', 'DESC']],
    });

    if (!txs.length) return console.log('📭 Belum ada transaksi.');

    for (const tx of txs) {
      const time = tx.created_at ? tx.created_at.toLocaleString('id-ID') : '[waktu tidak diketahui]';
      let targetInfo = '';

      if (tx.type === 'transfer_in' || tx.type === 'transfer_out') {
        const targetUser = await User.findByPk(tx.target_id);
        if (targetUser) {
          const direction = tx.type === 'transfer_in' ? 'dari' : 'ke';
          targetInfo = `(${direction}: ${targetUser.name})`;
        } else {
          targetInfo = `(Target ID: ${tx.target_id})`;
        }
      }

      console.log(`📄 ${time} - ${tx.type} - ${formatRupiah(tx.amount)} ${targetInfo}`);
    }
  }


};
