const {gql} = require('apollo-server')
const PostSchema = require('./postSchema')
const UserSchema = require('./userSchema')
const CollectionSchema = require('./collectionSchema')
const NotificationSchema = require('./notificationSchema')
const ConversationSchema = require('./collectionSchema')
const MessageSchema = require('./messageSchema')
const schema = gql`
    scalar Date
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    type Subscription {
        _empty: String
    }
    ${PostSchema}
    ${UserSchema}
    ${CollectionSchema}
    ${NotificationSchema}
    ${ConversationSchema}
    ${MessageSchema}
`

module.exports = schema