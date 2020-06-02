import React, {useState} from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_ACCESS_KEY

const UserContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const unsplashAxios = axios.create()
unsplashAxios.interceptors.request.use(config => {
    config.headers.Authorization = `Client-ID ${key}`
    config.headers['Accept-Version'] = 'v1'
    return config
})
// ask if this is the best way to do this ^^

const UserProvider = props => {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        blog: {},
        posts: [],
        postDetail: {},
        comments: [],
        errMsg: ''
    }
    const [userState, setUserState] = useState(initState)
    const [unsplash, setUnsplash] = useState([])

    // NO TOKEN NEEDED -->

    // USER AUTH / LOGOUT:
    const signup = credentials => {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    const login = credentials => {
        axios.post('/auth/login', credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            ...initState,
            user: {},
            token: ''
        })
    }

    const handleAuthError = errMsg => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    const resetAuthError = () => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        }))
    }

    // BLOG:
    // get blog (without token)
    const getBlog = username => {
        axios.get(`/blog/${username}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    blog: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // BLOG POSTS:
    // get blog posts (one user)
    const getPublicPosts = username => {
        axios.get(`/posts/${username}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // post detail
    const getPost = postId => {
        axios.get(`/posts/detail/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    postDetail: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // COMMENTS:
    // get comments (on post detail page)
    const getComments = postId => {
        axios.get(`/comments/${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    comments: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // post a comment (anyone can post: if user, will have user info, if not user, will have their optional info or 'anonymous' as default)
    const postComment = (postId, commentObj) => {
        userState.token ?
            userAxios.post(`/api/comments/${postId}`, commentObj)
                .then(res => {
                    setUserState(prevUserState => ({
                        ...prevUserState,
                        comments: [res.data, ...prevUserState.comments]
                    }))
                })
                .catch(err => console.log(err))
        :
            axios.post(`/comments/${postId}`, commentObj)
                .then(res => {
                    setUserState(prevUserState => ({
                        ...prevUserState,
                        comments: [res.data, ...prevUserState.comments]
                    }))
                })
                .catch(err => console.log(err))
    }

    // TOKEN NEEDED -->

    // BLOG:
    // update or upsert (create new if non-existent)
    const updateBlog = updates => {
        console.log(updates)
        userAxios.put('/api/blog', updates)
            .then(res => {
                // setUserState(prevUserState => ({
                //     ...prevUserState,
                //     blog: {...prevUserState.blog, updates}
                // }))
                console.log(res.data)
                getBlog(userState.user.username)
            })
            .catch(err => console.log(err))
    }   

    // BLOG POSTS:
    const postNew = post => {
        userAxios.post('/api/posts', post)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: [res.data, prevUserState.posts]
                }))
            })
            .catch(err => console.log(err))
    }

    const deletePost = postId => {
        userAxios.delete(`/api/posts${postId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: prevUserState.filter(post => post._id !== postId)
                }))
            })
            .catch(err => console.log(err))
    }

    const editPost = (postId, edits) => {
        userAxios.put(`api/posts/${postId}`, edits)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: prevUserState.map(post => (
                        post._id === postId ? res.data : post
                    ))
                }))
            })
            .catch(err => console.log(err))
    }

    // COMMENTS:
    // delete comment (by post's user OR comment's user, if user)
    const deleteComment = commentId => {
        userAxios.delete(`/api/comments/${commentId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    comments: prevUserState.comments.filter(comment => comment._id !== commentId)
                }))
            })
            .catch(err => console.log(err))
    }

    const editComment = (commentId, editedComment) => {
        userAxios.put(`/api/comments/${commentId}`, editedComment)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    comments: prevUserState.comments.map(comment => (
                        comment._id === commentId ? res.data : comment
                    ))
                }))
            })
            .catch(err => console.log(err))
    }

    // EXTERNAL -- Unsplash API requests

    const getPhotos = () => {
        unsplashAxios.get(`https://api.unsplash.com/photos?per_page=30`)
            .then(res => {
                setUnsplash(res.data)
            })
            .catch(err => console.log(err))
    }

    const searchPhotos = query => {
        unsplashAxios.get(`https://api.unsplash.com/search/photos?query=${query}`)
            .then(res => {
                setUnsplash(res.data)
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <UserContext.Provider
                value={{
                    ...userState,
                    unsplash,
                    signup,
                    login,
                    logout,
                    resetAuthError,
                    getBlog,
                    getPublicPosts,
                    getPost,
                    getComments,
                    postComment,
                    updateBlog,
                    postNew,
                    deletePost,
                    editPost,
                    deleteComment,
                    editComment,
                    getPhotos,
                    searchPhotos
                }}
            >
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

export {UserContext, UserProvider}