import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import DefaultAvatar from './blank-avatar.png'
import {UserContext} from '../../../context/UserProvider'

const Profile = props => {
    const {readonly} = props
    console.log(readonly)
    const {profile, blog, getProfile, uploadImage, getUserProfile, updateProfile} = useContext(UserContext)

    const [blurb, setBlurb] = useState('')
    const [blurbFormToggle, setBlurbFormToggle] = useState(false)

    useEffect(() => {
        readonly ? 
            getProfile(blog?._id)
        :
            getUserProfile()
    }, [])

    const handleImgSubmit = e => {
        const imgFile = e.target.files[0]
        const data = new FormData()
        // data.append('imageName', `${img.file.name} ${Date.now()}`)
        data.append('imageData', imgFile)
        imgFile && uploadImage('profile', blog._id, data)
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
                            onBlur={handleBlurbSubmit}
                            autoFocus
                            placeholder={`${blog?.authorName ? blog.authorName : blog.username} is an entrepreneur, a philanthropist, and a writer...`}
                        />
                    }
                </>
            }
        </Container>
    )
}

export default Profile

const Container = styled.div`
    grid-column: 2 / -1;
    text-align: center;
    border-left: solid rgb(154, 154, 154) 1px;
    width: 100%;
    padding: 0 20px;

    @media (max-width: 1100px){
        width: 400px;
        margin: auto;
        border-left: ${props => !props.readonly && 'none'};
    }
    @media (max-width: 900px){
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
    @media (max-width: 400px){
        margin-top: 100%;
        opacity: 1;
        ::before {content: 'Tap to '}
    }
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