const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    }
})

const Collection = new Schema({
    name: {
        type: Schema.Types.String
    },
    items: [Item]
})

const User = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        validate:{
            validator: function(v){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
            },
            message: props => `${props.value} is not a valid email` 
        }
    },
    phone:{
        type: Schema.Types.String,
        validate:{
            validator: function(v){
                return /\d{10}/.test(v)
            },
            message: props=> `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    firstName: {
        type: Schema.Types.String,
        require: true
    },
    lastName: {
        type: Schema.Types.String,
        require: true
    },
    avatar: {
        type: Schema.Types.String,
        default: 'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
    },
    birth: {
        type: Schema.Types.Number
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    notficationsStore: {
        type: Schema.Types.ObjectId,
        ref: 'notisStore'
    },
    follows: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    saved: [
        Collection
    ]
}, { timestamps: true })


module.exports = mongoose.model('user', User)
module.exports.Collection = Collection;
module.exports.Item = Item;
