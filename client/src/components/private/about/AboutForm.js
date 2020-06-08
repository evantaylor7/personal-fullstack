import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import DefaultAvatar from './blank-avatar.png'
import {UserContext} from '../../../context/UserProvider'

const AboutForm = () => {
    const {profile, blog, uploadImage, getUserProfile, updateProfile} = useContext(UserContext)
    console.log(profile)
    const [blurb, setBlurb] = useState('')
    const [blurbFormToggle, setBlurbFormToggle] = useState(false)

    useEffect(() => {
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

    return(
        <Container>
            <AboutHeader>About the Author</AboutHeader>
            <ImageContainer img={profile?.img ? profile.img : DefaultAvatar}>
                <ImageLabel>
                    <ImgInput type='file' accept='image/*' onChange={handleImgSubmit}/>
                    <ImgText>{profile?.img ? 'Change Portrait' : 'Choose Portrait'}</ImgText>
                </ImageLabel>
            </ImageContainer>
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
                    placeholder={`${blog?.username} is an entrepreneur, a philanthropist, and a writer...`}
                />
            }
        </Container>
    )
}

export default AboutForm

const Container = styled.div`
    grid-column: 2 / -1;
    text-align: center;
    border-left: solid black 1px;
    width: 100%;
    padding: 0 20px;
    margin: 10px 0;
`

const AboutHeader = styled.h2`
    margin-bottom: 10px;
`

const ImageContainer = styled.div`
    background-image: url(${props => props.img});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 360px;
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
`

const Blurb = styled.p`
    margin-top: 10px;
`

const BlurbInput = styled.textarea`
    margin-top: 10px
`