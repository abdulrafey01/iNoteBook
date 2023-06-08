const mongoose = require('mongoose')
const { Schema } = mongoose;

// No 7. For making model first make schema:Which type of data we can save to db

const UserSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  }
});

// No 8. Make a model then export to use
const User = mongoose.model('User', UserSchema)
module.exports = User
    