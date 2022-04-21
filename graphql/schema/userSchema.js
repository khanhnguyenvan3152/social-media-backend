const { gql } = require('apollo-server-express')
const UserSchema = gql`
    type PhoneNumber{
        countryCode: String,
        number: String
    }
    input PhoneNumberInput{
        countryCode:String,
        number: String
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
        createdAt: Date
        gender:String
        active: Boolean
    }
    input UserInput{
        email:String
        phoneNumber:PhoneNumberInput
        password:String
        gender:String
        firstName: String
        lastName: String
    }
    type LoginResponse{
        success: Boolean
        token: JWT
    }
    extend type Query{
        users:[User]!
        getUserById(_id:ID): User!
        getUserByEmail(email:String):User
        getUserFollowers(_id:ID):[User]
        getUserFollow(_id:ID):[User]
        userLikePost(_userId:ID,postId:ID):Boolean
        login(email:String,password:String):LoginResponse
    }
    extend type Mutation{
        createNewUser(input:UserInput):User
    }
`

module.exports = UserSchema