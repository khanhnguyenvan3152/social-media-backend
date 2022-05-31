const mongoose = require('mongoose');
const Schema = mongoose.Schema
const NotificationSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    follow: {
        type: Schema.Types.ObjectId,
        ref: 'follow'
    },
    like: {
        type: Schema.Types.ObjectId,
        ref: 'like'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    seen: {
        type: Schema.Types.Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('notification', NotificationSchema);
