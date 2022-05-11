const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ConversationSchema = new Schema({
    participants:[{
        type: Schema.Types.ObjectId,
        ref:'user'
    }],
    messages:[{
        type: Schema.Types.ObjectId,
        ref:'message'
    }]
},{
    timestamps:true
})

module.exports = mongoose.model('conversation',ConversationSchema)