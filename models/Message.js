const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    sender:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    content: Schema.Types.String,
    seen:{
        type:Schema.Types.Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('message',MessageSchema)