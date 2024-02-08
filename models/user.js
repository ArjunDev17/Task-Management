const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// userSchema.pre('save',async function(next){
//   const user=this;
//   if()
// })
const User = mongoose.model("User", userSchema);
module.exports = User;
