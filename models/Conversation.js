const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ConversationSchema = new Schema({
    members:[{
        typef: Schema.Types.ObjectId,
        ref:'user'
    }],
    messages:[{
        types: Schema.Types.ObjectId,
        ref:'message'
    }]
},{
    timestamps:true
})

module.exports = mongoose.model('conversation',ConversationSchema)