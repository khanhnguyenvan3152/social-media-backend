const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: Schema.Types.String,
        maxlength:1000
    },
    seen:{
        type:Schema.Types.Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('message',MessageSchema)