const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CollectionSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    items:[{
        type: Schema.Types.ObjectId,
        ref:'saveitem'
    }]
})

module.exports = mongoose.model('collection',CollectionSchema)