const express= require('express')
const router = express.Router()
const userRouter = require('./users')

router.use('/users',userRouter);
// router.use('/posts',postRouter)
// router.use('/comments',commentRouter)

module.exports = router