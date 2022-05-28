const { gql } = require('apollo-server-express')

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
        _id: ID
        user: UserPayload
        follow: UserPayload
        createdAt: Date
    }
  
    extend type Mutation{
        followUser(userId:ID):Boolean
        unFollowUser(userId:ID):Boolean
    }
`
module.exports = FollowSchema