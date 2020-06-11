import React, {useState, useContext} from 'react'
import Unsplash from './Unsplash.js'
import ImageUpload from './ImageUpload.js'
import styled from 'styled-components'
import {UserContext} from '../../../../context/UserProvider.js'

const ImageModal = props => {
    const {close, collection} = props
    const {
        blog: {_id: blogId, username}, 
        updateBlog, 
        addPostImg,
        uploadImage, 
        postDetail: {_id: postId}
    } = useContext(UserContext)

    const [tab, setTab] = useState('unsplash')
    const [img, setImg] = useState(null)

    const handleTab = type => {
        setTab(type)
    }

    const handleImgChange = img => {
        setImg(img)
    }
    console.log(collection)
    const handleImgSubmit = e => {
        if(typeof img === 'string'){
            collection === 'blog' ?
                updateBlog({img: img})
            :
                addPostImg(postId, {img: img})
        } else {
            const data = new FormData()
            // data.append('imageName', `${img.file.name} ${Date.now()}`)
            data.append('imageData', img.file)
            collection === 'blog' ? 
                uploadImage('blog', blogId, data)
            :
                uploadImage('posts', postId, data)
        }
        close(e)
    }

    return(
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
                        <Unsplash handleImgSelect={handleImgChange}/>
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

export default ImageModal

const Container = styled.div`
    height: calc(100% - 40px);
`

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 160px auto;
    position: relative;
    min-height: 0;
    height: 100%;
    overflow: auto;
`

const LeftDiv = styled.div`
    grid-column: 1 / 2;
    background-color: #b5d3e7;
    border-top: solid 1px whitesmoke;
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

    &:hover {
        cursor: pointer
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