const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    follow:{
        type: Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('follow',FollowSchema)