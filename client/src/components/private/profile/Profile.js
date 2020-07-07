import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import DefaultAvatar from './blank-avatar.png'
import {UserContext} from '../../../context/UserProvider'

const Profile = props => {
    const {readonly} = props
    const {
        profile, 
        blog, 
        getProfile, 
        uploadImage, 
        deleteImage, 
        getUserProfile, 
        updateProfile
    } = useContext(UserContext)
    const [blurb, setBlurb] = useState(profile.blurb || '')
    const [blurbFormToggle, setBlurbFormToggle] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        readonly ? 
            getProfile(blog?._id)
        :
            getUserProfile()
    }, [])

    useEffect(() => {
        setBlurb(profile.blurb)
    }, [profile.blurb])

    const handleImgSubmit = e => {
        const imgFile = e.target.files[0]
        if(!imgFile){
            return
        } else if(imgFile.size > 10000000){
            setError('Image file is too large. Limit: 10mb')
        } else {
            profile?.img && deleteImage(profile.img.replace('https://blogtopiabucket.s3.amazonaws.com/', ''))
            setError(null)
            const data = new FormData()
            data.append('imageData', imgFile)
            imgFile && uploadImage('profile', blog._id, data, imgFile)
        }
    }

    const handleBlurbChange = e => {
        const {value} = e.target
        setBlurb(value)
    }

    const handleBlurbSubmit = () => {
        updateProfile(blog._id, {blurb: blurb})
        setBlurbFormToggle(false)
    }

    return (
        <Container readonly={readonly}>
            <AboutHeader>About the Author</AboutHeader>
            {blog?.authorName && <AuthorName>{blog.authorName}</AuthorName>}
            <ImageContainer img={profile?.img ? profile.img : DefaultAvatar}>
                {
                !readonly &&
                    <ImageLabel>
                        <ImgInput type='file' accept='image/*' onChange={handleImgSubmit}/>
                        <ImgText>{profile?.img ? 'Change Portrait' : 'Choose Portrait'}</ImgText>
                    </ImageLabel>
                }
            </ImageContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {
            readonly ?
                <Blurb>
                    {profile.blurb}
                </Blurb>
            :
                <>
                    {
                    profile?.blurb && !blurbFormToggle ?
                        <Blurb onClick={() => setBlurbFormToggle(true)}>
                            {profile.blurb}
                        </Blurb>
                    :
                        <BlurbInput 
                            type='text' 
                            value={blurb}
                            onChange={handleBlurbChange}
                            autoFocus
                            placeholder={`${blog?.authorName ? blog.authorName : blog.username} is an entrepreneur, a philanthropist, and a writer...`}
                        />
                    }
                    <Button 
                        onClick={blurbFormToggle || !profile.blurb ? handleBlurbSubmit : () => setBlurbFormToggle(true)}
                    >
                        {blurbFormToggle || !profile.blurb ? 'Save' : 'Edit'}
                    </Button>
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    grid-column: 2 / -1;
    text-align: center;
    border-left: solid rgb(154, 154, 154) 1px;
    width: 100%;
    padding: 0 20px;

    @media (max-width: 1200px){
        width: 400px;
        margin: auto;
        border-left: ${props => !props.readonly && 'none'};
    }
    @media (max-width: 1000px){
        border-left: none;
    }
    @media (max-width: 400px){
        width: 100%;
        padding: 0
    }
`

const AboutHeader = styled.h2`
    margin-bottom: 10px;
`

const AuthorName = styled.p`
    margin-bottom: 12px;
`

const ImageContainer = styled.div`
    background-image: url(${props => props.img});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 360px;

    @media (max-width: 400px){
        height: 0;
        padding-top: 100%
    }
`

const ImageLabel = styled.label`
    width: 100%;
    height: 360px;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .4s;
    
    &:hover {
        background-color: rgba(0, 0, 0, .4);
        cursor: pointer
    }
    @media (max-width: 750px){
        background-color: rgba(0, 0, 0, .4);
    }
    @media (max-width: 400px){
        height: 0;
        padding-bottom: 100%;
        margin-top: -100%
    }
`

const ImgInput = styled.input`
    display: none;
`

const ImgText = styled.p`
    color: whitesmoke;
    font-size: 18pt;
    opacity: 0;
    transition: .4s;

    ${ImageLabel}:hover & {
        opacity: 1
    }
    @media (max-width: 750px){
        opacity: 1;
        ::before {content: 'Tap to '}
    }
    @media (max-width: 400px){
        margin-top: 100%;
    }
`

const ErrorMessage = styled.p`
    color: #c40000;
    margin-top: 6px;
`

const Blurb = styled.p`
    margin-top: 10px;
`

const BlurbInput = styled.textarea`
    margin-top: 10px;
    width: 300px;
    max-width: 358px;
    height: 100px;
    max-height: 250px;
    outline: none;
    padding: 6px;
    border-radius: 6px;
`

const Button = styled.button`
    display: block;
    margin: auto;
    margin-top: 10px;
    height: 30px;
    padding: 4px 12px;
    border-radius: 4px;
    border: solid 1px #214761;
    background-color: white;
    color: #214761;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
`

export default Profile