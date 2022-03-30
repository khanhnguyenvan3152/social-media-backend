const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Image = new Schema({
    url: String,
    timestamps: Number
})
const Comment = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    content: Schema.Types.String
})
const Post = new Schema({
    content:{
        type: Schema.Types.String
    },
    images: [Image],
    timestamps: Number,
    comments:[Comment]
})

module.exports = mongoose.model('post',Post)
module.exports.Comment = Comment;
module.exports.Image = Image;