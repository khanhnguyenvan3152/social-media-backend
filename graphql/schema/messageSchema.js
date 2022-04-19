const {gql} = require('apollo-server-express')

const MessageSchema = gql`
    type Message{
        owner:User
        content:String
        seen: Boolean
        createdAt: Date
    }
    extend type Query{
        getMessage(_id:ID):Message
        getMessages(_conversationId:ID):[Message]
        getMessagesOfUser(_conversationId:ID,_userId:ID):[Message]
        
    }
`

module.exports = MessageSchema