import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
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
                        <Dashboard to='/dashboard'>Dashboard</Dashboard>
                        <Button onClick={() => logout()}>Log Out</Button>
                    </>
                :
                    <Link to='/auth'>Sign Up</Link>
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
    height: 40px;
    background-color: white;
    
`

const NavBox = styled.div`
    width: 1000px;
    margin: auto;
    display: flex;
`

const Button = styled.button``

const Dashboard = styled(Link)`
    text-decoration: none;
    color: #1d1d1d;
`