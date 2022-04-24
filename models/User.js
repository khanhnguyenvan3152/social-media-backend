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
        type: Schema.Types.Date
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
    //Specify account active mode
    active: {
        type:Schema.Types.Boolean,
        default:true
    },
    resetPasswordToken: {
        type: Schema.Types.String,
        default: ''
    },
    resetPasswordTokenExpiry:{
        type: Schema.Types.Date
    }
}, { timestamps: true })


module.exports = mongoose.model('user', User)
