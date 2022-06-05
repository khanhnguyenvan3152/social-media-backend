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
    type ConversationsPayload {
        _id: ID!
        firstName: String
        lastName: String
        image: String
        isOnline: Boolean
        seen: Boolean
        lastMessage: String
        lastMessageSender: Boolean
        lastMessageCreatedAt: String
    }
    extend type Query{
        getConversations(_uid: ID):[Conversation]
    }
`
module.exports = ConversationSchema