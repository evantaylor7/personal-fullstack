import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../../context/UserProvider'

const Endpoint = () => {
    const {blog: {username, url}, urlCheck, checkUrlEndpoints, updateBlog} = useContext(UserContext)

    const [urlInput, setUrlInput] = useState('')
    const [showResponse, setShowResponse] = useState(false)
    const [toggleDomain, setToggleDomain] = useState(false)
    
    useEffect(() => {
        !showResponse && setUrlInput(url ? url : `${username}sBlog`)
        url && setToggleDomain(true)
    }, [username, url])

    const handleUrlInput = e => {
        const {value} = e.target
        const noSpecialChars = value.replace(/[^a-zA-Z0-9-_]/g, '')
        setShowResponse(false)
        setUrlInput(noSpecialChars)
    }

    const noSpaces = e => {
        e.which === 32 && e.preventDefault()
    }

    const handleUrlCheck = e => {
        e.preventDefault()
        checkUrlEndpoints(urlInput.toLowerCase())
        setShowResponse(true)
    }

    const updateUrl = () => {
        updateBlog({url: urlInput.toLowerCase()})
        setToggleDomain(true)
    }

    const handleDomainEdit = prevUrl => {
        setShowResponse(true)
        setUrlInput(prevUrl)
        setToggleDomain(false)
        updateBlog({url: ''})
    }

    return(
        <Container>
            <p>{`http://blogtopia.herokuapp.com/${toggleDomain ? url : ''}`}</p>
            {
            !toggleDomain ?
                <EndpointForm onSubmit={handleUrlCheck}>
                    <EndpointInput 
                        maxLength={20}
                        type='text'
                        value={urlInput} 
                        onChange={handleUrlInput}
                        onKeyDown={noSpaces}
                    />
                    {
                    showResponse ?
                        <>
                            <Response type={urlCheck ? 'true' : 'false'}>
                                {urlCheck ? 'X not available' : <ResSpan>&#10003; available</ResSpan>}
                            </Response>
                            {!urlCheck && <Button claim onClick={updateUrl}>claim domain</Button>}
                        </>
                    :
                        <Button>
                            Check Availability
                        </Button>
                    }
                </EndpointForm>
            :
                <>
                    <CurrentDomain>is the address of your blog!</CurrentDomain>
                    <EditDomainButton onClick={() => handleDomainEdit(url)}>Edit</EditDomainButton>
                </>
            }
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
`

const CurrentDomain = styled.p`
    color: #0066CC;
    font-size: 9pt;
    margin-left: 10px;
`

const EditDomainButton = styled.button`
    margin-left: 10px;
    text-decoration: underline;
    border: none;
    background-color: white;
    color: #0066CC;
    font-size: 9pt;
    outline: none;

    &:hover {
        cursor: pointer;
    }
`

const EndpointForm = styled.form`
    width: calc(100% - 10px);
    display: flex;
    align-items: center;
`

const EndpointInput = styled.input`
    width: calc(100% - 10px);
    border: none;
    outline: none;
    color: grey;
`

const Response = styled.p`
    position: absolute;
    margin-left: 100px;
    font-size: 9pt;
    color: ${props => props.type === 'true' ? 'red' : 'green'};
`

const ResSpan = styled.span`
    display: flex;
    width: 64px;
`

const Button = styled.button`
    position: absolute;
    margin-left: ${props => props.claim ? '180px' : '100px'};
    border: none;
    background-color: white;
    color: #0066CC;
    font-size: 9pt;
    outline: none;

    &:hover {
        cursor: pointer;
    }
`