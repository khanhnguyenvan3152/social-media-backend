const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    likeCount: {
        type: Schema.Types.Number,
        default: 0
    }
    ,
    content: {
        type: Schema.Types.String
    },
    image: {
        type: Schema.Types.String,
    },
    imagePublicId: {
        type: Schema.Types.String
    },
    timestamps: Number,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    mode: ['public', 'private', 'followers']
}, {
    timestamps: true
})

module.exports = mongoose.model('post', PostSchema)
