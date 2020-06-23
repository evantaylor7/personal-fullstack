import React, {useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {UserContext} from '../context/UserProvider'

const Navbar = () => {
    const {token, logout} = useContext(UserContext)

    return (
        <Container>
            <NavBox>
                {
                token ?
                    <>
                        <Home activeStyle={{borderBottom: 'solid black 1px'}} to='/dashboard'>Dashboard</Home>
                        <Home to='/dashboard' title><i>Blogtopia</i></Home>
                        <Button onClick={() => logout()}>Log Out</Button>
                    </>
                :
                    <>
                        <Home activeStyle={{borderBottom: 'solid black 1px'}} exact to='/'>Home</Home>
                        <Home exact to='/' title><i>Blogtopia</i></Home>
                        <SignUp activeStyle={{borderBottom: 'solid black 1px'}} to='/auth'>Sign Up</SignUp>
                    </>
                }
            </NavBox>
        </Container>
    )
}

export default Navbar

const Container = styled.div`
    z-index: 1;
    box-shadow: 0 0 8px #262626;
    position: fixed;
    width: 100%;
    background-color: white;

`

const NavBox = styled.div`
    width: calc(100% - 444px);
    height: 40px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Button = styled.p`
    &:hover {
        cursor: pointer;
    }
`

const Home = styled(NavLink)`
    text-decoration: none;
    padding: 2px;
    color: ${props => props.title ? '#214761' : '#1d1d1d'};
    font-size: ${props => props.title && '22px'};

    &:hover {
        border-bottom: solid 1px black
    }
`

const SignUp = styled(NavLink)`
    text-decoration: none;
    color: #1d1d1d;
    padding: 2px;
`