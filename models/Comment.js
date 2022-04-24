const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    content: Schema.Types.String
},{
    timestamps:true
})

module.exports = mongoose.model('comment',CommentSchema)
exports.CommentSchema = CommentSchema;