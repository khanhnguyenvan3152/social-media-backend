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
        avatarPublicId: String
        likes: [Like]
        cover: String
        coverPublicId: String
        isOnline: Boolean
        saved: [Collection]
        notifications: [Notification]
        resetPasswordToken: String
        resetPasswordTokenExpiry: Date
        phoneNumber: PhoneNumber
        createdAt: Date
        gender:String
        active: Boolean
        birth: Date
        
    }
    input UserInput{
        email:String
        phoneNumber:PhoneNumberInput
        password:String
        gender:String
        firstName: String
        lastName: String
    }

    input RequestResetPasswordInput{
        email: String!
    }
    
    input ResetPasswordInput{
        email: String!
        token: String!
        newPassword: String!
    }

    type LoginResponse{
        success: Boolean
        token: JWT
    }
    type UserPayload{
        _id: ID!
        fullName: String
        lastName: String
        email: String
        password: String
        avatar: String
        avatarPublicId: String
        cover: String
        coverPublicId: String
        isOnline: Boolean
        posts: [PostPayload]
        followers: [Follow]
        followings: [Follow]
        notifications: [NotificationPayload]
        newNotifications: [NotificationPayload]
        newConversations: [ConversationPayload]
        conversations: [ConversationPayload]
        unseenMessage: Boolean
        createdAt: String
        updatedAt: String
    }
    input LoginInput{
        email: String
        password: String
    }
    type SignUpResponse{
        user:UserPayload
        success:Boolean
        message:String
    }
    extend type Query{
        users:[User]!
        getUserById(_id:ID): User!
        getUserByEmail(email:String):User
        getUserFollowers(_id:ID):[User]
        getUserFollow(_id:ID):[User]
        getUserConversations(_id:ID):[User]
        getAuthUser: User
        userLikePost(_userId:ID,postId:ID):Boolean
    }
    extend type Mutation{
        createNewUser(input:UserInput!):SignUpResponse
        requestResetPassword(input:RequestResetPasswordInput!):User
        resetPassword(input: ResetPasswordInput):User
        login(input:LoginInput):LoginResponse
    }
`

module.exports = UserSchema