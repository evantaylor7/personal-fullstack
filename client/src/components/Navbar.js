import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NavBox = styled.div`
    background-color: whitesmoke;
    height: 40px
`

const Navbar = () => {
    return(
        <NavBox>
            This is the navbar
            <Link to='/auth'>Log In</Link>
        </NavBox>
    )
}

export default Navbar