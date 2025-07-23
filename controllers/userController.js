const session = require('../services/session');

function formatRupiah(value) {
  return `Rp${value.toLocaleString('id-ID')}`;
}

module.exports = {

  async balance() {
    const user = await session.currentUser();
    console.log(`💰 Saldo Anda: ${formatRupiah(user.balance)}`);
  }
};
