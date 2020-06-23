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

const UserProvider = props => {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        blog: {},
        posts: [],
        postDetail: {},
        comments: [],
        profile: {},
        errMsg: '',
        urlCheck: false
    }
    const [userState, setUserState] = useState(initState)
    const [unsplash, setUnsplash] = useState([])

    console.log(userState)

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
                createBlog()
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
        setUserState(prevUserState => ({
            ...prevUserState,
            user: {},
            token: ''
        }))
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
    const getBlog = blogUrl => {
        axios.get(`/blog/${blogUrl}`)
            .then(res => {
                console.log(res.data)
                setUserState(prevUserState => ({
                    ...prevUserState,
                    blog: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // get blog using blogId
    const getBlogWithId = blogId => {
        axios.get(`/blog/id/${blogId}`)
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
    const getPublicPosts = blogId => {
        axios.get(`/posts/${blogId}`)
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
                    comments: res.data.reverse()
                }))
            })
            .catch(err => console.log(err))
    }

    // post a comment (anyone can post: if user, will have user info, if not user, will have their optional info or 'anonymous' as default)
    const postComment = (postId, commentObj) => {
        console.log(commentObj)
        userState.token && commentObj.postedBy === '' ?
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

    // PROFILE:
    const getProfile = blogId => {
        userAxios.get(`/profile/${blogId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    profile: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // TOKEN NEEDED -->

    // IMAGES:
    const uploadImage = (dest, id, imgData) => {
        console.log('ran')
        userAxios.put(`/api/image/${dest}/${id}`, imgData)
            .then(res => {
                console.log(res.data)
                setUserState(prevUserState => ({
                    ...prevUserState,
                    [dest === 'posts' ? 'postDetail' : dest]: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // BLOG:
    // user getting their own blog
    const getUserBlog = () => {
        userAxios.get('/api/blog')
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    blog: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    const checkUrlEndpoints = endpoint => {
        if(endpoint === '' || endpoint === 'dashboard' || endpoint === 'auth'){
            setUserState(prevUserState => ({
                ...prevUserState,
                urlCheck: true
            }))
        } else if(endpoint === userState.blog?.url) {
            setUserState(prevUserState => ({
                ...prevUserState,
                urlCheck: false
            }))
        } else {
            userAxios.get(`/api/blog/check/${endpoint}`)
                .then(res => {
                    setUserState(prevUserState => ({
                        ...prevUserState,
                        urlCheck: res.data
                    }))
                })
        }
    }

    const createBlog = () => {
        console.log('ran')
        userAxios.post('/api/blog')
            .then(res => {
                userState(prevUserState => ({
                    ...prevUserState,
                    blog: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // update or upsert (create new if non-existent)
    const updateBlog = updates => {
        console.log(updates)
        userAxios.put('/api/blog', updates)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    blog: res.data
                }))
            })
            .catch(err => console.log(err))
    }   

    // BLOG POSTS:
    const clearPostDetail = () => {
        setUserState(prevUserState => ({
            ...prevUserState,
            postDetail: {}
        }))
    }

    const getPosts = blogId => {
        userAxios.get(`/api/posts/${blogId}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    const postNew = post => {
        userAxios.post('/api/posts', post)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    postDetail: res.data,
                    posts: [res.data, ...prevUserState.posts]
                }))
            })
            .catch(err => console.log(err))
    }

    // edit post
    const editPost = (postId, edits) => {
        userAxios.put(`/api/posts/update-one/${postId}`, edits)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    postDetail: res.data,
                    posts: prevUserState.posts.map(post => post._id === postId ? res.data : post)
                }))
            })
            .catch(err => console.log(err))
    }

    // add unsplash image to post
    const addPostImg = (postId, img) => {
        console.log(img)
        userAxios.put(`/api/posts/add-img/${postId}`, img)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    postDetail: res.data,
                    posts: prevUserState.posts.map(post => post._id ? res.data : post)
                }))
            })
            .catch(err => console.log(err))
    }

    // update many posts (when adding or changing author name)
    const editPosts = edits => {
        console.log(edits)
        userAxios.put('/api/posts/update-collection', edits)
            .then(res => {
                console.log(res.data)
                // setUserState(prevUserState => ({
                //     ...prevUserState,
                //     posts: res.data
                // }))
            })
            .catch(err => console.log(err))
    }

    const deletePost = postId => {
        userAxios.delete(`/api/posts/${postId}`)
            .then(res => {
                console.log(res)
                setUserState(prevUserState => ({
                    ...prevUserState,
                    posts: prevUserState.posts.filter(post => post._id !== postId)
                }))
            })
            .catch(err => console.log(err))
    }

    // COMMENTS:
    // delete comment (by post's user OR comment's user, if user)
    const deleteComment = commentId => {
        userAxios.delete(`/api/comments/${commentId}`)
            .then(res => {
                console.log(res)
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

    // PROFILE (about section)
    const getUserProfile = () => {
        userAxios.get('/api/profile')
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    profile: res.data
                }))
            })
            .catch(err => console.log(err))
    }

    // update (or upsert) profile
    const updateProfile = (blogId, updates) => {
        userAxios.put(`/api/profile/${blogId}`, updates)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    profile: res.data
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
        unsplashAxios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=30`)
            .then(res => {
                setUnsplash(res.data.results)
            })
            .catch(err => console.log(err))
    }

    return (
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
                    getBlogWithId,
                    getPublicPosts,
                    getPost,
                    getComments,
                    postComment,
                    getProfile,
                    uploadImage,
                    getUserBlog,
                    checkUrlEndpoints,
                    updateBlog,
                    clearPostDetail,
                    getPosts,
                    postNew,
                    editPost,
                    addPostImg,
                    editPosts,
                    deletePost,
                    deleteComment,
                    editComment,
                    getUserProfile,
                    updateProfile,
                    getPhotos,
                    searchPhotos
                }}
            >
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

export {UserContext, userAxios, UserProvider}