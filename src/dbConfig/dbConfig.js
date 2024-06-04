const mongoose = require("mongoose");
function connected(connectionStr) {
  return mongoose.connect(connectionStr);
}
module.exports = connected;
