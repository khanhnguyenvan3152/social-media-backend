const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaveItemSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref:'post'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('saveitem',SaveItemSchema)