import React from 'react'
import styled from 'styled-components'

const AuthForm = props => {
    const {
        inputs: {
            username,
            password
        },
        handleChange,
        handleSubmit,
        btnText,
        errMsg
    } = props

    return(
        <Container>
            <form onSubmit={handleSubmit}>
                <input
                    name='username'
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={handleChange}
                />
                <input
                    name='password'
                    type='text'
                    placeholder='password'
                    value={password}
                    onChange={handleChange}
                />
                <button>{btnText}</button>
                <ErrorMsg>{errMsg}</ErrorMsg>
            </form>
        </Container>
    )
}

export default AuthForm

const Container = styled.div`

`

const ErrorMsg = styled.p`
    color: red
`