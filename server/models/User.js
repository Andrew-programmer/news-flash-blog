const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique: true, required: true},
    name: {type: String, unique: false, required: true},
    surName: {type: String, unique: false, required: true},
    password: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    gmail: {type: String, required: true},
    photo: {type: String, required: true},

    links: {type: Array, required: false, default: [], unique: false},

    money: {type: Number, required: false, default: 0},
    views: {type: Number, required: false, default: 0},

    subscribes: {type: Array, required: false, default: 0}
})

module.exports = model('User', User);
