const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', User);