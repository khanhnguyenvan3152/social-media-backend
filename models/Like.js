const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LikeSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('like',LikeSchema)
