const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    slug: {type: String, required: true},
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

User.statics = {
    findByUsername(username) {
      return this.findOne({username: username});
    }
  }

User.methods = {
    comparePassword(password) {
      return bcrypt.compare(password, this.password);
        // return password === this.password;
    }
}

module.exports = mongoose.model('User', User);