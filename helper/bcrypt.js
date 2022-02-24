const bcrypt = require('bcrypt')

const encrypt =  (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

const compare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
  encrypt,
  compare
}