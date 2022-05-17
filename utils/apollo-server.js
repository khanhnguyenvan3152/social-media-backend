const config = require('../config')
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')
const { IS_USER_ONLINE } = require('../constants/Subscription')
const User = require('../models/User')
exports.pubSub = new PubSub()

const checkAuthorization = (token) => {
    return new Promise(async (resolve, reject) => {
        const authUser = await jwt.verify(token, config.tokenSecret)
        if (authUser) {
            resolve(authUser)
        } else {
            reject("Couldn't authenticate user")
        }
    })
}

exports.createApolloServer = (schema, resolvers, plugins) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req, res, connection }) => {
            let user;
            let token;
            if (req.headers['authorization'] != null) {
                token = req.headers['authorization'].split(' ')[1]
            }
            if (token) {
                user = await checkAuthorization(token)
            }
            return {
                req,
                res,
                authUser: user
            }
        },
        plugins: plugins,
        subscriptions: {
            onConnect: async (connectionParams, webSocket) => {
                if (connectionParams.authorization) {
                    const user = await checkAuthorization(connectionParams.authorization.split(' ')[1])
                    pubSub.publish(IS_USER_ONLINE, {
                        isUserOnline: {
                            userId: user._id,
                            isOnline: true
                        }
                    })
                    return {
                        authUser: user,
                    };
                }
            },
            onDisconnect: async (webSocket, context) => {
                const conn = await context.initPromise;
                if (conn && conn.authUser) {
                    pubSub.publish(IS_USER_ONLINE, {
                        isUserOnline: {
                            userId: conn.authUser._id,
                            isOnline: false
                        }
                    })
                }
                await User.findOneAndUpdate({ email: conn.authUser.email }, { isOnline: false, }
                );
            }
        },
        csrfPrevention: true
    })
}