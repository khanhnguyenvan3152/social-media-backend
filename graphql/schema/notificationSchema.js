const {gql} = require('apollo-server-express')

const NotificationSchema = gql`
    type Notification{
        _id: ID!
        from: User!
        post: Post!
    }
    type NotificationPayload{
        _id: ID!
        post: PostPayload
        like: LikePayload
        comment: CommentPayload
        from: [UserPayload]
        follow: Follow
        createdAt: String
    }
`

module.exports = NotificationSchema