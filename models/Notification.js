const mongoose  = require('mongoose');
const Schema = mongoose.Schema
const NotificationSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref:'post'
    },
    like:{
        type: Schema.Types.ObjectId,
        ref:'like'
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:'comment'
    },
    action: Schema.Types.String
})

module.exports = mongoose.model('notification',NotificationSchema);
