const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const NotificationsStore = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    notifications: [
        Notification
    ]
})

const Notification = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref:'post'
    },
    action: Schema.Types.String
})

module.exports = mongoose.model('notisStore',NotificationsStore);