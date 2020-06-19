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

    const noSpaces = e => {
        e.which === 32 && e.preventDefault()
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <input
                    name='username'
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={handleChange}
                    onKeyDown={noSpaces}
                    maxLength={15}
                    autoFocus
                />
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={handleChange}
                    onKeyDown={noSpaces}
                    maxLength={20}
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