const {gql} = require('apollo-server-express')

const ConversationSchema = gql`
    type Conversation{
        members: [User]
        messages: [Message]
        createdAt: Date
        updatedAt: Date
    }
    type ConversationPayload{
        _id: ID,
        participants: [UserPayload]
        message: [MessagePayload]
    }
    extend type Query{
        getConversations(_uid: ID):[Conversation]
    }
`
module.exports = ConversationSchema