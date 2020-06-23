import React, {useState, useContext} from 'react'
import {UserContext} from '../../context/UserProvider.js'
import AuthForm from './AuthForm.js'
import styled from 'styled-components'

const Auth = () => {
    const {signup, login, errMsg, resetAuthError} = useContext(UserContext)

    const initInputs = {username: '', password: ''}
    const [inputs, setInputs] = useState(initInputs)
    const [authToggle, setAuthToggle] = useState(false)

    const toggle = () => {
        setAuthToggle(prevAuthToggle => !prevAuthToggle)
        resetAuthError()
    }

    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleLogin = e => {
        e.preventDefault()
        login(inputs)
    }

    const handleSignup = e => {
        e.preventDefault()
        signup(inputs)
    }

    return (
        <Container>
            <AuthTitle>{authToggle ? 'Log In' : 'Sign Up'}</AuthTitle>
            {
            authToggle ?
                <>
                    <AuthForm 
                        btnText='Log In'
                        inputs={inputs}
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        errMsg={errMsg}
                    />
                    <ToggleContainer>
                        <ToggleText>Don't have an account?</ToggleText>
                        <ToggleButton onClick={toggle}>Go to Sign Up</ToggleButton>
                    </ToggleContainer>
                </>
            :
                <>
                    <AuthForm
                        btnText='Sign Up'
                        inputs={inputs}
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        errMsg={errMsg}
                    />
                    <ToggleContainer>
                        <ToggleText>Already have an account?</ToggleText>
                        <ToggleButton onClick={toggle}>Go to Log In</ToggleButton>
                    </ToggleContainer>
                </>
            }
        </Container>
    )
}

export default Auth

const Container = styled.div`
    padding-top: 80px;
    text-align: center;
`

const AuthTitle = styled.h2`
    margin-bottom: 10px;
`

const ToggleContainer = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ToggleText = styled.p`
    margin-right: 2px;
`

const ToggleButton = styled.button`
    margin-left: 2px;
    padding: 2px 4px;
    outline: none;

    &:hover {
        cursor: pointer
    }
`