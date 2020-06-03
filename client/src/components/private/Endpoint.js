import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const Endpoint = () => {
    const {blog: {username}, urlCheck, checkUrlEndpoints} = useContext(UserContext)

    const [urlInput, setUrlInput] = useState('')
    
    useEffect(() => {
        setUrlInput(username)
    }, [username])

    const handleChange = e => {
        const {value} = e.target
        setUrlInput(value)
    }

    const noSpaces = e => {
        e.which === 32 && e.preventDefault()
    }

    const handleSubmit = e => {
        e.preventDefault()
        checkUrlEndpoints(urlInput)
    }
    console.log(urlCheck)

    return(
        <Container>
            <p>http://blogtopia.herokuapp.com/</p>
            <EndpointForm onSubmit={handleSubmit}>
                <EndpointInput 
                    maxLength={20}
                    type='text'
                    value={urlInput} 
                    onChange={handleChange}
                    onKeyDown={noSpaces}
                />
            </EndpointForm>
        </Container>
    )
}

export default Endpoint

const Container = styled.div`
    height: 24px;
    width: 80%;
    border: solid lightgrey 1px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding-left: 14px;
    font-size: 10pt;
    /* padding: 8px; */
`

const EndpointForm = styled.form`
    width: calc(100% - 10px);
`

const EndpointInput = styled.input`
    width: calc(100% - 10px);
    border: none;
    outline: none;
    color: grey;
`