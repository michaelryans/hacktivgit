const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    image: String,
    password: String
})

let User = mongoose.model('User', userSchema)

module.exports = User