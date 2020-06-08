import React, {useState, useContext} from 'react'
import Unsplash from './Unsplash.js'
import ImageUpload from './ImageUpload.js'
import styled from 'styled-components'
import {UserContext} from '../../../context/UserProvider.js'

const ImageUploadModal = props => {
    const {blog: {_id: blogId, username}, updateBlog, uploadImage} = useContext(UserContext)
    const {toggle, close} = props

    const [tab, setTab] = useState('unsplash')
    const [img, setImg] = useState(null)

    const handleTab = type => {
        setTab(type)
    }

    const handleImgChange = img => {
        setImg(img)
    }
    console.log(img)
    const handleImgSubmit = () => {
        if(typeof img === 'string'){
            updateBlog({img: img})
        } else {
            const data = new FormData()
            // data.append('imageName', `${img.file.name} ${Date.now()}`)
            data.append('imageData', img.file)
            uploadImage('blog', blogId, data)
        }
        close('img')
    }

    return(
        <Modal toggle={toggle}>
            <Container>
                <TitleContainer>
                    <Title>Choose an Image</Title>
                    <CancelButton onClick={() => close('img')}>X</CancelButton>
                </TitleContainer>
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
                    <Apply onClick={handleImgSubmit}>Apply</Apply>
                </ApplyContainer>
            </Container>
        </Modal>
    )
}

export default ImageUploadModal

const Modal = styled.div`
    display: ${props => props.toggle ? 'block' : 'none'};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
`

const Container = styled.div`
    width: 90%;
    height: 90%;
    margin: auto;
    margin-top: 5vh;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
    background-color: whitesmoke;
    border-radius: 10px;
    position: relative;
`

const TitleContainer = styled.div`
    height: 40px;
    background-color: #214761;
    border-radius: 10px 10px 0 0;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.p`
    color: whitesmoke;
    font-size: 14pt;
`

const CancelButton = styled.button`
    border: none;
    background-color: inherit;
    color: whitesmoke;
    font-size: 20px;
    outline: none;

    &:hover {
        cursor: pointer
    }
`

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 160px auto;
    position: relative;
    min-height: 0;
    height: calc(100% - 40px);
`

const LeftDiv = styled.div`
    grid-column: 1 / 2;
    background-color: #b5d3e7;
    border-bottom-left-radius: 10px;
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
    /* border: solid black 1px; */
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Apply = styled.button`
    /* position: absolute; */
    /* bottom: 10px; */
    /* right: 10px; */
    float: right;
    margin-right: 25px;
    /* margin-top: 8px; */
    
    border: none;
    background-color: #214761;
    color: whitesmoke;
    padding: 5px;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
    }
`