const {gql} = require('apollo-server-express')

const NotificationSchema = gql`
    type Notification{
        _id: ID!
        from: User!
        post: Post!
    }
`

module.exports = NotificationSchema