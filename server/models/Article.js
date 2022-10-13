const {Schema, model} = require('mongoose');

const Article = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Number, required: true},
    photo: {type: String, required: true},
    duration: {type: Number, required: true},
    isPublished: {type: Boolean, required: false, default: false},
    isFav: {type: Array, required: false, default: []},
    username: {type: String, required: true},
    category: {type: String, required: true},
    views: {type: Array, required: false, default: []},
})

module.exports = model('Article', Article);
