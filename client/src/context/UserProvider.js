import React from 'react'
import axios from 'axios'

const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserProvider = props => {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        blog: {},
        posts: [],
        comments: [],
        errMsg: ''
    }
    const [userState, setUserState] = useState(initState)

    // user auth / logout
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
        setUserState(initState)
        // ^^ may have to alter this
    }

    function handleAuthError(errMsg){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function resetAuthError(){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        }))
    }

    // get blog (without token)
    const getPublicBlog = username => {
        axios.get(`/blog/${username}`)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    blog: res.data
                }))
            })
            .catch(err => console.log(err))
    }

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
    

    return(
        <div>
            <UserContext.Provider
                value={{
                    ...userState,
                    signup,
                    login,
                    logout,
                    resetAuthError,
                    getPublicBlog,
                    getPublicPosts,

                }}
            >
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

export {UserContext, UserProvider}