const {gql} = require('apollo-server-express')

const NotificationSchema = gql`
    enum NotificationType{
        LIKE
        FOLLOW
        COMMENT
    }
    type Notification{
        _id: ID!
        author: User!
        user: User!
        post: ID!
        like: Like
        Follow: Follow
        comment: Comment
        type: NotificationType
        seen: Boolean
        createdAt: Date
    }
    #Input
    input CreateNotificationInput{
        userId: ID!
        authorId: ID
        postID: ID
        notificationType: NotificationType
        notificationTypeId: ID
    }

    input DeleteNotificationInput{
        _id: ID!
    }

    input UpdateNotificationSeenInput{
        userId: ID!
    }
    type NotificationPayload{
        _id: ID!
        like: LikePayload
        post: PostPayload
        comment: CommentPayload
        from: [UserPayload]
        follow: Follow
        createdAt: String
    }
    type NotificationsPayload{
        count: Int
        notifications: [NotificationPayload]
    }
    enum NotificationOperationType {
        CREATE
        DELETE
    }
    type NotificationCreatedOrDeletedPayload {
        operation: NotificationOperationType!
        notification: NotificationPayload
    }

    extend type Query{
        getUserNotifications(skip:Int,limit:Int):NotificationPayload
    }
    extend type Mutation{
        createNotification(input: CreateNotificationInput):Notification
        deleteNotification(input: DeleteNotificationInput):Notification
        updateNotificationSeen(input: UpdateNotificationSeenInput):Boolean
    }
    extend type Subscription{
        notificationCreatedOrDeleted: NotificationCreatedOrDeletedPayload
    }
`

module.exports = NotificationSchema