const {gql} = require('apollo-server-express')

const ConverstaionSchema = gql`
    type Conversation{
        members: [User]
        messages: [Message]
        createdAt: Date
        updatedAt: Date
    }
    extend type Query{
        getConversations(_uid: ID):[Conversation]
    }
`
module.exports = ConverstaionSchema