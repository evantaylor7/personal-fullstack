import React, {useState, useContext, useEffect} from 'react'
import PostTitle from './PostTitle.js'
import PostEditor from './PostEditor.js'
import PostDetail from '../../../public/PostDetail.js'
import Modal from '../Modal.js'
import styled from 'styled-components'
import {UserContext} from '../../../../context/UserProvider'

const initInputs = {
    title: '',
    authorName: '',
    content: ''
}

const PostModal = props => {
    const {toggle} = props
    const {
        blog,
        blog: {_id: blogId, authorName}, 
        postDetail, 
        deleteImage,
        postNew, 
        editPost
    } = useContext(UserContext)

    const [tab, setTab] = useState('title')
    const [inputs, setInputs] = useState(initInputs)
    const [saveDisplay, setSaveDisplay] = useState(false)
    const [imgModal, setImgModal] = useState(false)
    const [togglePreviewModal, setTogglPreviewModal] = useState(false)

    useEffect(() => {
        setInputs({title: postDetail?.title || '', authorName: authorName, content: postDetail.content || ''})
    }, [blog, postDetail])

    const handleTab = type => {
        setTab(type)
    }

    const handleTitleChange = e => {
        setSaveDisplay(false)
        const {value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            title: value
        }))
    }

    const handleContentChange = inputs => {
        setSaveDisplay(false)
        setInputs(prevInputs => ({
            ...prevInputs,
            content: inputs
        }))
    }

    const save = () => {
        const {title, content} = inputs
        if(!title && !content){
            return
        } else {
            setSaveDisplay(true)
            postDetail?._id ? 
                editPost(postDetail._id, inputs)
            :
                postNew({...inputs, blog: blogId})
        }
    }

    const handleImgModal = () => {
        setImgModal(prevImgModal => !prevImgModal)
    }

    const handleRemoveImg = () => {
        deleteImage(postDetail.titleImg.replace('https://blogtopiabucket.s3.amazonaws.com/', ''))
        editPost(postDetail._id, {titleImg: ''})
    }

    const handleTogglePreviewModal = () => {
        setTogglPreviewModal(prevToggle => !prevToggle)
    }

    const handlePostSubmit = (e, type) => {
        type === 'draft' ?
            editPost(postDetail._id, {...inputs, draft: true})
        :
            editPost(postDetail._id, {...inputs, draft: false})
        
        toggle(e)
    }

    return (
        <Container>
            <ContentContainer>
                <LeftDiv>
                    <Tab onClick={() => handleTab('title')} selected={tab === 'title'}>
                        <TabContent selected={tab === 'title'}>
                            Title
                        </TabContent>
                    </Tab>
                    <Tab onClick={() => handleTab('content')} selected={tab === 'content'}>
                        <TabContent selected={tab === 'content'}>
                            Content
                        </TabContent>
                    </Tab>
                </LeftDiv>
                <RightDiv>
                    {
                    tab === 'title' ?
                        <PostTitle
                            titleChange={handleTitleChange}
                            value={inputs.title}
                            save={save}
                            handleImgModal={handleImgModal}
                            titleImg={postDetail?.titleImg}
                            removeImg={handleRemoveImg}
                        />
                    :
                        <PostEditor 
                            postId={postDetail._id}
                            value={inputs.content} 
                            onChange={handleContentChange}
                            save={save}
                            toggleImgModal={handleImgModal}
                        />
                    }
                    {imgModal && <Modal close={handleImgModal} name='img' collection='post'/>}
                </RightDiv>
            </ContentContainer>
            <Footer>
                <Preview onClick={handleTogglePreviewModal}>Preview</Preview>
                {togglePreviewModal && 
                    <PreviewModal onClick={handleTogglePreviewModal}>
                        <PreviewHeader>
                            <Close>&times;</Close>
                        </PreviewHeader>
                        <PostDetail 
                            postId={postDetail._id} 
                            preview={true} 
                            toggleModal={handleTogglePreviewModal}
                        />
                    </PreviewModal>
                }
                <SubmitContainer>
                    <SavedAlert active={saveDisplay}>Saved &#10003;</SavedAlert>
                    {!saveDisplay && <Submit draft name='post' onClick={save}>Save</Submit>}
                    <Submit draft name='post' onClick={e => handlePostSubmit(e, 'draft')}>Save as Draft</Submit>
                    <Submit name='post' onClick={e => handlePostSubmit(e, 'published')}>Publish</Submit>
                </SubmitContainer>
            </Footer>
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
    height: 100%;
    overflow: auto;

    @media (max-width: 700px){
        grid-template-columns: 100px auto;
    }
    @media (max-width: 600px){
        display: block;
    }
`

const LeftDiv = styled.div`
    grid-column: 1 / 2;
    background-color: #b5d3e7;
    border-top: solid 1px whitesmoke;

    @media (max-width: 600px){
        display: flex;
        justify-content: center;
    }
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

    @media (max-width: 600px){
        width: 100%;
        text-align: center;
    }
`

const TabContent = styled.p`
    font-size: 12pt;
    clear: both;
    color: ${props => props.selected && 'whitesmoke'};
`

const RightDiv = styled.div`
    grid-column: 2 / -1;

    @media (max-width: 600px){
        height: calc(100% - 39px);
    }
`

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    height: 40px;
    align-items: center;
    border-radius: 0 0 10px 10px;
    width: 100%;
    background-color: white;
    bottom: 0;
`

const Preview = styled.button`
    border: solid 1px #214761;
    background-color: white;
    color: #214761;
    margin-left: 20px;
    padding: 5px;
    border-radius: 4px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
    @media (max-width: 350px){
        margin-left: 10px;
    }
`

const PreviewModal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index: 2;
`

const PreviewHeader = styled.div`
    background-color: white;
    position: absolute;
    width: 944px;
    height: 44px;
    left: 50%;
    margin-left: -472px;
    top: 2vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media (max-width: 960px){
        width: 96%;
        margin-left: 0;
        left: 2%
    }
`

const Close = styled.p`
    font-size: 24px;
    padding: 0 8px 2px;
    margin-right: 6px;
    border-radius: 20px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
`

const SubmitContainer = styled.div`
    display: flex;
    align-items: center;
`

const Submit = styled.button`
    justify-self: right;
    margin-right: ${props => props.draft ? '4px' : '20px'};
    border: ${props => props.draft ? 'solid 1px #214761' : 'none'};
    background-color: ${props => props.draft ? 'white' : '#214761'};
    color: ${props => props.draft ? '#214761' : 'whitesmoke'};
    padding: 5px;
    border-radius: 4px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.draft ? '#214761' : '#3a5b71'};
        color: whitesmoke;
    }

    @media (max-width: 350px){
        font-size: 12px;
        margin-right: ${props => props.draft ? '4px' : '10px'};
    }
`

const SavedAlert = styled.p`
    display: ${props => props.active ? 'block' : 'none'};
    font-size: 11pt;
    margin-right: 10px;
    color: green;

    @media (max-width: 350px){
        margin-right: 4px
    }
`

export default PostModal