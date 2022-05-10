const Notification = require('../../models/Notification')
const User = require('../../models/User')
const { pubSub } = require('../../utils/apollo-server')
const resolvers = {
    Query: {
        getUserNotifications: async (parent, args, context, info) => {
            const authUser = { context }
            const { skip, limit } = args.input
            if (!authUser) {
                throw new Error('You are not authorized')
            }
            const count = await Notification.where({ user: authUser._id }).countDocuments();
            const notifications = await Notification.where({
                user: authUser._id
            })
                .populate('author')
                .populate('user')
                .populate('follow')
                .populate({ path: 'comment', populate: { path: 'post' } })
                .populate({ path: 'like', populate: { path: 'post ' } })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: 'desc' })
            return { notifications, count }
        }
    },
    Mutation: {
        createNotification: async (parent, args, context, info) => {
            let { userId, authorId, postId, notificationType, notificationTypeId } = args.input
            const newNotification = await Notification({
                author: authorId,
                user: userId,
                post: postId,
                [notificationType.toLowerCase()]: notificationTypeId
            }).save()
            await User.findOneAndUpdate({ _id: userId }, { $push: { notifications: newNotification._id } })
            newNotification = await newNotification
                .populate('author')
                .populate('follow')
                .populate({ path: 'comment', populate: { path: 'post' } })
                .populate({ path: 'like', populate: { path: 'post' } })
                .execPopulate();
            pubSub.publish(NOTIFICATION_CREATED_OR_DELETED, {
                notificationCreatedOrDeleted: {
                    operation: 'CREATE',
                    notification: newNotification
                }
            })
            return newNotification
        },

        deleteNotification: async (parent, args, context, info) => {
            let {_id} = args.input
            let notification = await Notification.findByIdAndRemove(notiId);

            // Delete notification from users collection
            await User.findOneAndUpdate({ _id: notification.user }, { $pull: { notifications: notification.id } });
    
            // Publish notification deleted event
            notification = await notification
                .populate('author')
                .populate('follow')
                .populate({ path: 'comment', populate: { path: 'post' } })
                .populate({ path: 'like', populate: { path: 'post ' } })
                .execPopulate();
    
            pubSub.publish(NOTIFICATION_CREATED_OR_DELETED, {
                notificationCreatedOrDeleted: {
                    operation: 'DELETE',
                    notification,
                },
            });
    
            return notification;
        },

        updateNotificationSeen: async (parent, args, context, info) => {
            let { _id } = context.authUser
            try {
                await Notification.updateMany({ user: _id, seen: false }, { seen: true })
                return true
            } catch (e) {
                return false;
            }
        }
    },
    Subscription: {
        notificationCreatedOrDeleted: {
            subscribe: withFilter(
                () => pubSub.asyncIterator(NOTIFICATION_CREATED_OR_DELETED),
                (payload, variables, { authUser }) => {
                    const userId = payload.notificationCreatedOrDeleted.notification.user.toString();

                    return authUser && authUser.id === userId;
                }
            ),
        },
    }
}