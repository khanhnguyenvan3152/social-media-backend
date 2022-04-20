const {gql} = require('apollo-server-express')

const FollowSchema = gql`
    type Follow{
        user: User
        follow: User
        createdAt: Date
    }

`
module.exports = FollowSchema