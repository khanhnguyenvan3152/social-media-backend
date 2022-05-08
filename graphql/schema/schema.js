const {gql} = require('apollo-server')
const PostSchema = require('./postSchema')
const UserSchema = require('./userSchema')
const CollectionSchema = require('./collectionSchema')
const NotificationSchema = require('./notificationSchema')
const ConversationSchema = require('./conversationSchema')
const MessageSchema = require('./messageSchema')
const FollowSchema = require('./followSchema')
const LikeSchema = require('./likeSchema')
const CommentSchema = require('./commentSchema')

const schema = gql`
    scalar Date
    scalar JWT
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    type Subscription {
        _empty: String
    }
    ${ConversationSchema}
    ${PostSchema}
    ${LikeSchema}
    ${UserSchema}
    ${CollectionSchema}
    ${NotificationSchema}
    ${MessageSchema}
    ${FollowSchema}
    ${CommentSchema}
`

module.exports = schema