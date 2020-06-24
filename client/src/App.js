import React, {useContext, useEffect, useState} from 'react'
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Home from './components/public/Home.js'
import Auth from './components/auth/Auth.js'
import UserHome from './components/private/user-home/UserHome.js'
import BlogDetail from './components/public/BlogDetail.js'
import PostDetail from './components/public/PostDetail.js'
import ScrollToTop from './ScrollToTop.js'
import {UserContext} from './context/UserProvider.js'

import ProtectedRoute from './ProtectedRoute.js'

const App = () => {
    const {token} = useContext(UserContext)

    // const [navToggle, setNavToggle] = useState(true)
    // console.log(navToggle)
    // const toggleNav = () => {
    //     setNavToggle(prevNavToggle => !prevNavToggle)
    // }
    const history = useHistory()

    const {blog} = useContext(UserContext)

    useEffect(() => {
        // const unlisten = history.listen(() => {
        //     window.scrollTo(0, 0)
        // })
        window.scrollTo(0, 0)
        // return () => {
        //     unlisten()
        // }
    }, [blog.title])

    return (
        <div>
            <Navbar/>
            {/* <ScrollToTop/> */}
            <Switch>
                <Route
                    exact path='/'
                    render={() => token ? <Redirect to='/dashboard'/> : <Home/>}
                />
                <Route
                    path='/auth'
                    render={() => token ? <Redirect to='/'/> : <Auth/>}
                />
                <ProtectedRoute
                    path='/dashboard'
                    component={UserHome}
                    redirectTo='/'
                    token={token}
                />
                <Route
                    exact path='/:blogUrl'
                    render={() => <BlogDetail/>}
                />
                <Route
                    path='/p/:postId'
                    render={() => <PostDetail/>}
                />
            </Switch>
        </div>
    )
}

export default App