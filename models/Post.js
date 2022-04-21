const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Post = new Schema({
    owner: {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    liked:[{
        type: Schema.Types.ObjectId,
        ref:'user'
    }],
    content:{
        type: Schema.Types.String
    },
    images: [{
        type:Schema.Types.ObjectId,
        ref:'image'
    }],
    timestamps: Number,
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    mode:['public','private','friends']
},{
    timestamps:true
})

module.exports = mongoose.model('post',Post)
