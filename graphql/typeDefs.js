const { gql } = require('apollo-server');

const typeDefs = gql`
    type Post {
        _id: ID!
        content: String!
        images: [Image]
        user: User!
        timestamps: Int
    }
    type Image{
        _id:ID!
        url: String!
    }
    type User {
        _id:ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        posts: [Post]
        follows: [User]
        followers: [User]
    }
    input UserFirstName {
        firstName: String!
    }
    type Query{
        users: [User!]!
        user(_id:ID!): User

    }
`
module.exports = { typeDefs }