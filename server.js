const express = require('express')
const app = express()
const expressJwt = require('express-jwt')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT

const secret = process.env.SECRET

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect (
    'mongodb://localhost:27017/personal-fullstack', 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }, 
    err => {
        if(err) throw err;
        console.log('MongoDB connection established successfully')
    }
)

// routes go here
app.use('/auth', require('./routes/authRouter.js'))
app.use('/blog', require('./routes/blogRouter.js'))
app.use('/posts', require('./routes/postRouter.js'))
app.use('/comments', require('./routes/commentRouter.js'))
app.use('/api', expressJwt({secret: secret}))
app.use('/api/blog', require('./routes/userBlogRouter.js'))
app.use('/api/posts', require('./routes/userPostRouter.js'))
app.use('/api/comments', require('./routes/userCommentRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(port, () => {
    console.log(`Server is running on local port ${port}`)
})