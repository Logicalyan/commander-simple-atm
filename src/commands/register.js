const { register } = require('../auth');

function handleRegister(name, pin) {
  if (!name || !pin) {
    return console.log('Format: atm register <name> <pin>');
  }
  register(name, pin);
}

module.exports = handleRegister;
