const { gql } = require('apollo-server');

const typeDefs = gql`
    type Post {
        _id: ID!
        content: String!
        images: [Image]
        user: User!
        timestamps: Int
        mode: String
    }
    type Image{
        _id:ID!
        url: String!
        user: User
        name: String
    }
    type Notification{
        _id: ID!
        from: User!
        post: Post!
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
        avatar: String
        saved: [Collection]
        notificationsStore: [Notification]
        phoneNUmber: PhoneNumber
    }
    type Item{
        _id: ID!
        post: Post
    }
    type Collection{
        _id: ID!
        name: String
        items: [Item]
    }
    input UserFirstName {
        firstName: String!
    }
    type PhoneNumber{
        countryCode: String,
        number: String
    }
    input PhoneNumberInput{
        countryCode:String,
        number: String
    }
    input UserInput{
        email:String
        phoneNumber:PhoneNumberInput
        password:String
        gender:String
        firstName: String
        lastName: String
    }
    input PostInput{
        content: String
        userId: String
        images: [ImageInput]
        mode: String
    }
    input ImageInput{
        url: String
    }
    type Mutation {
        createNewUser(input: UserInput):User
        createNewPost(input: PostInput):Post
    }
    type Query{
        users: [User!]!
        user(_id:ID): User
        posts: [Post!]!
        post: Post

    }
`
module.exports = { typeDefs }