import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../../context/UserProvider'

const Endpoint = () => {
    const {blog: {username, blogUrl}, urlCheck, checkUrlEndpoints, updateBlog} = useContext(UserContext)

    const [urlInput, setUrlInput] = useState('')
    const [showResponse, setShowResponse] = useState(false)
    const [toggleDomain, setToggleDomain] = useState(false)
    console.log(urlInput)
    console.log( blogUrl)
    useEffect(() => {
        blogUrl && setToggleDomain(true)
        blogUrl && setUrlInput(blogUrl)
    }, [username, blogUrl])

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
        updateBlog({blogUrl: urlInput.toLowerCase()})
        setToggleDomain(true)
    }

    const handleDomainEdit = prevUrl => {
        setShowResponse(true)
        setUrlInput(prevUrl)
        setToggleDomain(false)
        updateBlog({blogUrl: ''})
    }

    return (
        <Container>
            <Domain>{`https://blogtopia.herokuapp.com/${toggleDomain ? blogUrl : ''}`}</Domain>
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
                    <ResponseContainer>
                        <Hidden>{urlInput}</Hidden>
                        {
                        showResponse ?
                            <>
                                <Response type={urlCheck ? 'true' : 'false'}>
                                    <>
                                        {urlCheck ? 
                                            'X not available' 
                                        :
                                            <ResSpan>&#10003; available</ResSpan>
                                        }
                                    </>
                                </Response>
                                {!urlCheck && <Button claim onClick={updateUrl}>claim domain</Button>}
                            </>
                        :
                            <Button>Check Availability</Button>
                        }
                    </ResponseContainer>
                </EndpointForm>
            :
                <CurrentDomainContainer>
                    <CurrentDomain>is the address of your blog!</CurrentDomain>
                    <EditDomainButton onClick={() => handleDomainEdit(blogUrl)}>Edit</EditDomainButton>
                </CurrentDomainContainer>
            }
        </Container>
    )
}

export default Endpoint

const Container = styled.div`
    height: 24px;
    width: 90%;
    border: solid lightgrey 1px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding-left: 14px;
    font-size: 10pt;

    @media (max-width: 918px){
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        height: 38px;
        width: 86%;
        margin: 12px 4px 12px 0;
    }
`

const Domain = styled.p`
    word-break: break-word;

    @media (max-width: 918px){
        margin-top: 3px;
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
    grid-row: 1 / 2;
`

const ResponseContainer = styled.div`
    position: absolute;
    display: flex;
    margin-left: 20px;
    pointer-events: none;
`

const Hidden = styled.p`
    z-index: -1;
    visibility: hidden;
`

const Response = styled.p`
    font-size: 9pt;
    color: ${props => props.type === 'true' ? 'red' : 'green'};
    margin-top: 1px;
`

const ResSpan = styled.span`
    display: flex;
    width: 64px;
`

const Button = styled.button`
    ${props => props.claim && 'margin-left: 10px;'};
    border: none;
    background-color: white;
    color: #0066CC;
    font-size: 9pt;
    outline: none;
    pointer-events: auto;

    &:hover {
        cursor: pointer;
    }
`

const CurrentDomainContainer = styled.div`
    display: flex;

    @media (max-width: 918px){
        margin-bottom: 20px;
    }
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