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

    return(
        <Container>
            <h2>{authToggle ? 'Log In' : 'Sign Up'}</h2>
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
                    <p>Don't have an account?</p>
                    <button onClick={toggle}>Go to Sign Up</button>
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
                    <p>Already have an account?</p>
                    <button onClick={toggle}>Go to Log In</button>
                </>
            }
        </Container>
    )
}

export default Auth

const Container = styled.div`
    padding-top: 50px;
    margin-left: 10px
`