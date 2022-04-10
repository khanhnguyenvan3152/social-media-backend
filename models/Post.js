const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Image = new Schema({
    url: String,
    timestamps: Number
})

const Post = new Schema({
    content:{
        type: Schema.Types.String
    },
    images: [Image],
    timestamps: Number,
    comments:[Comment]
},{
    timestamps:true
})

module.exports = mongoose.model('post',Post)
module.exports.Comment = Comment;
module.exports.Image = Image;