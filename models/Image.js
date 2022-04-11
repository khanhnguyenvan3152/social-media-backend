const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    url: {
        types: Schema.Types.String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    name: String
},{
    timestamps:true
})

module.exports = mongoose.model('image',ImageSchema)