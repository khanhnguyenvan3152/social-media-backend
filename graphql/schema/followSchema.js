const {gql} = require('apollo-server-express')

const FollowSchema = gql`
    type Follow{
        _id: ID
        user: User
        follow: User
        createdAt: Date
    }
    input CreateFollowInput{
        userId: ID,
        followerId: ID!
    }
    type FollowPayload{
        user: [UserPayload]
        follow: [UserPayload]
        createdAt: Date
    }
  
    extend type Mutation{
        followUser(userId:ID):[FollowPayload]
        unFollowUser(userId:ID):[FollowPayload]
    }
`
module.exports = FollowSchema