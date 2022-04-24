const {gql} = require('apollo-server-express')

const MessageSchema = gql`
    type Message{
        sender:User
        content:String
        seen: Boolean
        createdAt: Date
    }
    type MessagePayload{
        _id:ID
        sender: User
        content: String
        createdAt: String
    }
    extend type Query{
        getMessage(_id:ID):Message
        getMessages(_conversationId:ID):[Message]
        getMessagesOfUser(_conversationId:ID,_userId:ID):[Message]
        
    }
`

module.exports = MessageSchema