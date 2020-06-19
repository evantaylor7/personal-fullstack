import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Home from './components/public/Home.js'
import Auth from './components/auth/Auth.js'
import UserHome from './components/private/user-home/UserHome.js'
import BlogDetail from './components/public/BlogDetail.js'
import PostDetail from './components/public/PostDetail.js'
import {UserContext} from './context/UserProvider.js'

import ProtectedRoute from './ProtectedRoute.js'

const App = () => {
    const {token} = useContext(UserContext)

    return(
        <div>
            <Navbar/>
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