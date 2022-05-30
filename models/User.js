const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
    },
    phone: {
        contryCode: {
            type: Schema.Types.String,
        },
        number: {
            type: Schema.Types.String
        }

    },
    isOnline: {
        types: Boolean,
        default: false
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
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'like'
    }],
    avatar: {
        type: Schema.Types.String,
        default: 'https://res.cloudinary.com/dqc5eqdsj/image/upload/v1651528797/avatar/avatar-anonymous_iwxxqr.png'
    },
    avatarPublicId: String,
    cover: {
        type: Schema.Types.String,
        default: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
    },
    coverPublicId: String,
    birth: {
        type: Schema.Types.Date
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'notification'
        }
    ],
    follows: [
        {
            type: Schema.Types.ObjectId,
            ref: 'follow',
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'follow',
        }
    ],
    followCount: {
        type: Schema.Types.Number,
        default: 0
    },
    followerCount: {
        type: Schema.Types.Number,
        default: 0
    },
    conversations: [{
        type: Schema.Types.ObjectId,
        ref: 'conversation'
    }],
    saved: [
        {
            type: Schema.Types.ObjectId,
            ref: 'collection'
        }
    ],
    //Specify account active mode
    active: {
        type: Schema.Types.Boolean,
        default: true
    },
    resetPasswordToken: {
        type: Schema.Types.String,
        default: ''
    },
    resetPasswordTokenExpiry: {
        type: Schema.Types.Date
    },
    biography: {
        type: Schema.Types.String,
        defautlt: ""
    }
}, { timestamps: true })


module.exports = mongoose.model('user', User)
