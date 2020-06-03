import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {UserContext} from '../context/UserProvider'

const Navbar = () => {
    const {token, logout} = useContext(UserContext)

    return(
        <NavBox>
            This is the navbar
            {
            token ?
                <button onClick={() => logout()}>Log Out</button>
            :
                <Link to='/auth'>Log In</Link>
            }
        </NavBox>
    )
}

export default Navbar

const NavBox = styled.div`
    background-color: whitesmoke;
    height: 40px;
    position: fixed;
    width: 100%;
    z-index: 1
`