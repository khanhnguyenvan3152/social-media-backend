const { gql } = require('apollo-server');

const typeDefs = gql`
    #Post definition
    # {images} is an array contain files which have type of image
    type Post {
        _id: ID!
        content: String!
        images: [File]
        user: User!
        timestamps: Int
        mode: String
    }
    #Post Input definition
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
        notifications: [Notification]
        phoneNumber: PhoneNumber
        active:Boolean
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
        images: ImagesInput
        mode: String
        File: Upload
    }

    scalar Upload
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    input ImagesInput{
        files: [Upload]
    }
    type Mutation {
        createNewUser(input: UserInput):User
        createNewPost(input: PostInput):Post
        singleUpload(file:Upload!):File!
    }
    type Query{
        users: [User!]!
        user(_id:ID): User
        posts: [Post!]!
        post: Post

    }
`
console.log(typeDefs)
module.exports = { typeDefs }