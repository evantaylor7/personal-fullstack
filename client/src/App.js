import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import BlogDetail from './components/BlogDetail.js'
import Auth from './components/auth/Auth.js'
import {UserContext} from './context/UserProvider.js'
// import {}

import './styles.css'

const App = () => {
    const {token, logout} = useContext(UserContext)

    return(
        <div>
            <Navbar logout={logout}/>
            <Switch>
                <Route
                    exact path='/'
                    render={() => <Home/>}
                />
                <Route
                    path='/auth'
                    render={() => <Auth/>}
                />
                <Route
                    path='/:blogId'
                    render={() => <BlogDetail/>}
                />
            </Switch>
        </div>
    )
}

export default App