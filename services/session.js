const fs = require('fs');
const path = require('path');
const SESSION_FILE = path.join(__dirname, '../.session.json');

let loggedInUser = null;

function saveSessionToFile(user) {
  fs.writeFileSync(SESSION_FILE, JSON.stringify({ userId: user.id }));
}
function loadSessionFromFile() {
  if (fs.existsSync(SESSION_FILE)) {
    const data = JSON.parse(fs.readFileSync(SESSION_FILE));
    return data.userId;
  }
  return null;
}

function clearSessionFile() {
  if (fs.existsSync(SESSION_FILE)) {
    fs.unlinkSync(SESSION_FILE);
  }
}

module.exports = {
  login(user) {
    loggedInUser = user;
    saveSessionToFile(user);
  },

  logout() {
    loggedInUser = null;
    clearSessionFile();
  },

  async currentUser() {
    const { User } = require('../models');
    if (loggedInUser) return loggedInUser;

    const userId = loadSessionFromFile();
    if (userId) {
      const user = await User.findByPk(userId);
      if (user) {
        loggedInUser = user;
        return user;
      }
    }
    return null;
  },

  async isLoggedIn() {
    const user = await this.currentUser();
    return !!user;
  },
};
