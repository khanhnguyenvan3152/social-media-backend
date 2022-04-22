const {gql} = require('apollo-server-express')

const LikeSchema = gql`
    type Like{
        post: Post!
        users: [User]
    }
    extend type Query{
        getUserLikedPosts(_postId:ID):[User]
    }
`
module.exports = LikeSchema