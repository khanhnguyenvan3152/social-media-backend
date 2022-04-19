const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    phone: {
        contryCode: {
            type: Schema.Types.String,
        },
        number: {
            type: Schema.Types.String
        }

    },
    avatar: String,
    avatarPublicId: String,
    cover: String,
    coverPublicId: String,
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
    notfications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'notification'
        }
    ],
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
    conversations:[{
        type: Schema.Types.ObjectId,
        ref:'conversation'
    }],
    saved: [
        {
            type: Schema.Types.ObjectId,
            ref: 'collection'
        }
    ],
    active: {
        type:Schema.Types.Boolean,
        default:true
    }
}, { timestamps: true })


module.exports = mongoose.model('user', User)
