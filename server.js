const express = require('express')
const app = express()
const expressJwt = require('express-jwt')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config()
const port = process.env.PORT
const secret = process.env.SECRET || 'super secret local dev passphrase'

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect (
    process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-fullstack', 
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

app.use('/auth', require('./routes/authRouter.js'))
app.use('/blog', require('./routes/blogRouter.js'))
app.use('/posts', require('./routes/postRouter.js'))
app.use('/comments', require('./routes/commentRouter.js'))
app.use('/profile', require('./routes/profileRouter.js'))
app.use('/api', expressJwt({secret, algorithms: ['HS256']}))
app.use('/api/blog', require('./routes/userBlogRouter.js'))
app.use('/api/posts', require('./routes/userPostRouter.js'))
app.use('/api/comments', require('./routes/userCommentRouter.js'))
app.use('/api/profile', require('./routes/userProfileRouter.js'))

// was previously using local uploads folder to store images -->
// app.use('/uploads', express.static('uploads'))

app.use('/api/image', require('./routes/userImageRouter.js'))

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on local port ${port}`)
})