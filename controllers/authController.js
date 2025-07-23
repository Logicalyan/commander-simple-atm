const { User } = require('../models');
const session = require('../services/session');

module.exports = {
  async register(name, pin) {
    try {
      const user = await User.create({ name, pin });
      console.log(`✅ Berhasil register sebagai ${user.name}`);
    } catch (error) {
      console.error('❌ Gagal register:', error.message);
    }
  },

  async login(name, pin) {
    const user = await User.findOne({ where: { name, pin } });
    if (!user) return console.log('❌ Gagal login');

    session.login(user);
    console.log(`✅ Login sebagai ${user.name}`);
  }
};
