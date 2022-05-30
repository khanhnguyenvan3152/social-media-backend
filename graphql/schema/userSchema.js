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
        followCount: Int
        followerCount: Int
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
        biography: String
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
        firstName: String
        lastName: String
        email: String
        password: String
        avatar: String
        avatarPublicId: String
        cover: String
        likes: [LikePayload]
        coverPublicId: String
        isOnline: Boolean
        posts: [PostPayload]
        followers: [FollowPayload]
        follows: [FollowPayload]
        followCount: Int
        followerCount: Int
        notifications: [NotificationPayload]
        newNotifications: [NotificationPayload]
        newConversations: [ConversationPayload]
        conversations: [ConversationPayload]
        unseenMessage: Boolean
        createdAt: String
        updatedAt: String
        biography: String

    }
    input LoginInput{
        email: String
        password: String
    }
    input UserAvatarInput{
        avatar: Upload
        isCover:Boolean
    }
    type SignUpResponse{
        user:UserPayload
        success:Boolean
        message:String
    }
    type IsUserOnlinePayload{
        userId: ID!
        isOnline:Boolean
    }
    type SearchUserPayload{
        users: [UserPayload]
        count: Int
        offset: Int
        limit: Int
    }
    extend type Query{
        users:[User]!
        getUserById(_id:ID): UserPayload!
        getUserByEmail(email:String):User
        getUserFollowers(_id:ID):[User]
        getUserFollow(_id:ID):[User]
        getUserConversations(_id:ID):[User]
        getAuthUser: UserPayload
        userLikePost(userId:ID,postId:ID):Boolean
        searchUsers(query:String,offset:Int,limit:Int): SearchUserPayload
    }
    extend type Mutation{
        createNewUser(input:UserInput!):SignUpResponse
        requestResetPassword(input:RequestResetPasswordInput!):User
        resetPassword(input: ResetPasswordInput):User
        uploadUserAvatar(input: UserAvatarInput):UserPayload
        login(input:LoginInput):LoginResponse
    }
    extend type Subscription {
        # Subscribes to is user online event
        isUserOnline(authUserId: ID!, userId: ID!): IsUserOnlinePayload
    }
`

module.exports = UserSchema