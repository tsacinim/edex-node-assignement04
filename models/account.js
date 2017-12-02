const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const accountSchema = mongoose.Schema({
  name: String,
  balance: Number
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account

