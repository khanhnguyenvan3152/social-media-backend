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
    input CollectionInput{
        name: String
        ownerId: ID
    }
    input DeleteCollectionInput{
        _id: ID
    }
    extend type Query{
        getCollections(_userId:ID):[Collection]
        getCollection(_id:ID):Collection
    }
    extend type Mutation{
        createCollection(input:CollectionInput):Collection
        deleteCollection(input:DeleteCollectionInput):Collection
    }
`

module.exports = CollectionSchema