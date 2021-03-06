import React, {useState, useContext} from 'react'
import Unsplash from './Unsplash.js'
import ImageUpload from './ImageUpload.js'
import styled from 'styled-components'
import {UserContext} from '../../../../context/UserProvider.js'

const ImageModal = props => {
    const {close, collection} = props
    const {
        blog: {_id: blogId, img: blogImg}, 
        postDetail: {_id: postId, previewImg, titleImg},
        updateBlog, 
        addPostImg,
        uploadImage, 
        deleteImage,
        downloadPhoto
    } = useContext(UserContext)

    const [tab, setTab] = useState('unsplash')
    const [img, setImg] = useState(null)

    const handleTab = type => {
        setTab(type)
    }

    const handleImgChange = img => {
        setImg(img)
    }

    const handleImgSubmit = e => {
        if(img.name === 'unsplash'){
            downloadPhoto(img.photoId)
            if(collection === 'blog'){
                blogImg && deleteImage(blogImg.replace('https://blogtopiabucket.s3.amazonaws.com/', ''))
                updateBlog({img: img.src})
            } else if (typeof collection === 'object'){
                previewImg && deleteImage(previewImg.replace('https://blogtopiabucket.s3.amazonaws.com/', ''))
                addPostImg({postId: collection.postId, previewImg: img.src})
            } else {
                titleImg && deleteImage(titleImg.replace('https://blogtopiabucket.s3.amazonaws.com/', ''))
                addPostImg({postId: postId, titleImg: img.src})
            }
        } else {
            const data = new FormData()
            data.append('imageData', img.file)
            if(collection === 'blog'){
                blogImg && deleteImage(blogImg.replace('https://blogtopiabucket.s3.amazonaws.com/', ''))
                uploadImage('blog', blogId, data, img.file)
            } else if(typeof collection === 'object'){
                previewImg && deleteImage(previewImg.replace('https://blogtopiabucket.s3.amazonaws.com/', ''))
                uploadImage('post-preview', collection.postId, data, img.file)
            } else {
                titleImg && deleteImage(titleImg.replace('https://blogtopiabucket.s3.amazonaws.com/', ''))
                uploadImage('title-image', postId, data, img.file)
            }
        }
        close(e)
    }

    return (
        <Container>
            <ContentContainer>
                <LeftDiv>
                    <Tab onClick={() => handleTab('unsplash')} selected={tab === 'unsplash'}>
                        <TabContent selected={tab === 'unsplash'}>
                            Unsplash
                        </TabContent>
                    </Tab>
                    <Tab onClick={() => handleTab('upload')} selected={tab === 'upload'}>
                        <TabContent selected={tab === 'upload'}>
                            Upload Photo
                        </TabContent>
                    </Tab>
                </LeftDiv>
                <RightDiv>
                    {
                    tab === 'unsplash' ? 
                        <Unsplash handleImgSelect={handleImgChange} collection={collection}/>
                    :
                        <ImageUpload handleImgChange={handleImgChange} img={img}/>
                    }
                </RightDiv>
            </ContentContainer>
            <ApplyContainer>
                <Apply onClick={handleImgSubmit} name='img'>Apply</Apply>
            </ApplyContainer>
        </Container>
    )
}

const Container = styled.div`
    height: calc(100% - 40px);
`

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 140px auto;
    position: relative;
    min-height: 0;
    height: 100%;
    overflow: auto;

    @media (max-width: 730px){
        display: block;
    }
`

const LeftDiv = styled.div`
    grid-column: 1 / 2;
    background-color: #b5d3e7;
    border-top: solid 1px whitesmoke;

    @media (max-width: 730px){
        display: flex;
        justify-content: center;
    }
`

const RightDiv = styled.div`
    grid-column: 2 / -1;
    overflow: auto;
    padding: 20px;
    padding-top: 10px;
`

const Tab = styled.div`
    background-color: ${props => props.selected ? '#214761' : '#b5d3e7'};
    padding: 10px;
    padding-left: 20px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }

    @media (max-width: 730px){
        width: 100%;
        text-align: center;
    }
`

const TabContent = styled.p`
    font-size: 12pt;
    clear: both;
    color: ${props => props.selected && 'whitesmoke'};
`

const ApplyContainer = styled.div`
    position: absolute;
    height: 40px;
    width: 100%;
    background-color: white;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0 0 10px 10px;
`

const Apply = styled.button`
    float: right;
    margin-right: 25px;
    border: none;
    background-color: #214761;
    color: whitesmoke;
    padding: 5px;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
    }
`

export default ImageModal