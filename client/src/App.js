import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import UserHome from './components/UserHome.js'
import BlogDetail from './components/BlogDetail.js'
import Auth from './components/auth/Auth.js'
import {UserContext} from './context/UserProvider.js'

import './styles.css'

const App = () => {
    const {token} = useContext(UserContext)

    return(
        <div>
            <Navbar/>
            <Switch>
                <Route
                    exact path='/'
                    render={() => token ? <UserHome/> : <Home/>}
                />
                <Route
                    path='/auth'
                    render={() => token ? <Redirect to='/'/> : <Auth/>}
                />
                <Route
                    path='/:blogId'
                    render={() => <BlogDetail/>}
                />
                <Route
                    path='/:postId'
                    render={() =? <PostDetail/>}
            </Switch>
        </div>
    )
}

export default App