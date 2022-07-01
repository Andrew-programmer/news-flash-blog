const {Schema, model} = require('mongoose');

const Article = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Number, required: true},
    duration: {type: Number, required: true},
    isPublished: {type: Boolean, required: false, default: false},
    isFav: {type: Array, required: false, default: []},
    username: {type: String, required: true}
})

module.exports = model('Article', Article);