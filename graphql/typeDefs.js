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
    input Post{
        content: String
        userId: String
        images: [Image]
    }
    type Mutation {
        createNewUser(input: UserInput):User
        createNewPost(inpi)
    }
    type Query{
        users: [User!]!
        user(_id:ID): User

    }
`
module.exports = { typeDefs }