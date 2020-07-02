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
        <Form onSubmit={handleSubmit}>
            <Input
                name='username'
                type='text'
                placeholder='username'
                value={username}
                onChange={handleChange}
                onKeyDown={noSpaces}
                maxLength={15}
                autoFocus
            />
            <Input
                name='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={handleChange}
                onKeyDown={noSpaces}
                maxLength={20}
            />
            <SubmitButton>{btnText}</SubmitButton>
            <ErrorMsg>{errMsg}</ErrorMsg>
        </Form>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: auto;
`

const Input = styled.input`
    margin-bottom: 10px;
    padding: 6px;
    border: none;
    border-bottom: solid 1px black;
    border-radius: 4px;
    outline: none;
    background-color: whitesmoke;
    transition: .4s;

    &:focus {
        background-color: white;
        border-radius: 0;
    }
`

const SubmitButton = styled.button`
    width: 80px;
    margin: auto;
    padding: 4px;
    outline: none;
    margin-top: 10px;

    &:hover {
        cursor: pointer
    }
`

const ErrorMsg = styled.p`
    color: red;
    margin-top: 10px;
`

export default AuthForm