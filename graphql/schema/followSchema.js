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
`
module.exports = FollowSchema