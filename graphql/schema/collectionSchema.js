const {gql} = require('apollo-server-express')

const CollectionSchema = gql`
    type Item{
        _id: ID!
        post: Post
    }
    type Collection{
        _id: ID!
        name: String
        items: [Item]
    }
    extend type Query{
        getCollections(_userId:ID):[Collection]
    }
`

module.exports = CollectionSchema