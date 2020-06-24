import React, {useState, useContext, useEffect} from 'react'
import PostTitle from './PostTitle.js'
import PostEditor from './PostEditor.js'
import PostDetail from '../../../public/PostDetail.js'
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
        postNew, 
        editPost
    } = useContext(UserContext)
    console.log(postDetail)

    const [tab, setTab] = useState('title')
    const [inputs, setInputs] = useState(initInputs)
    const [saveDisplay, setSaveDisplay] = useState(false)
    const [imgModal, setImgModal] = useState(false)
    const [intId, setIntId] = useState(null)
    const [togglePreviewModal, setTogglPreviewModal] = useState(false)
    console.log(inputs)


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

    const save = (inputs = inputs) => {
        console.log(inputs)
        // console.log(inputs)
        const { title, content } = inputs
        if(!title && !content){
            console.log("didn't save")
            return
        } else {
            console.log("saved")
            setSaveDisplay(true)
            postDetail?._id ? 
                editPost(postDetail._id, inputs)
            :
                postNew({...inputs, blog: blogId})
        }
    }

    useEffect(() => {
        
        const intId = setInterval(() => save(inputs), 3000)
        setIntId(intId)

        return () => {
            clearInterval(intId)
            setIntId(null)
        }
    }, [])

    const handleImgModal = () => {
        setImgModal(prevImgModal => !prevImgModal)
    }

    const handleTogglePreviewModal = () => {
        setTogglPreviewModal(prevToggle => !prevToggle)
    }

    const handlePostSubmit = (e, type) => {
        console.log(type)
        type === 'draft' ?
            editPost(postDetail._id, {...inputs, draft: true})
        :
            editPost(postDetail._id, {...inputs, draft: false})
        
        toggle(e)
    }

    // <ImgModal 
    //     onClick={handleImgModal} 
    //     name='img'
    //     disabled={!postDetail._id}
    // >
    //     Add Image
    // </ImgModal>
    // {imgModal && <Modal close={handleImgModal} name='img' collection='post'/>}

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
                            onChange={handleTitleChange}
                            value={inputs.title}
                            save={save}
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
                </RightDiv>
            </ContentContainer>
            <Footer>
                <Preview onClick={handleTogglePreviewModal}>Preview</Preview>
                {togglePreviewModal && 
                    <PreviewModal onClick={handleTogglePreviewModal}>
                        <Close>X</Close>
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

export default PostModal

const Container = styled.div`
    height: calc(100% - 40px);
`

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 160px auto;
    position: relative;
    height: 100%;
    overflow: auto;
`

const LeftDiv = styled.div`
    grid-column: 1 / 2;
    background-color: #b5d3e7;
    border-top: solid 1px whitesmoke;
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

const RightDiv = styled.div`
    grid-column: 2 / -1;
    /* overflow: auto; */
    /* padding: 20px; */
    /* padding-top: 10px; */
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

const Close = styled.p`
    color: white;
    font-size: 30px;
    width: 24px;
    margin-left: auto;
    margin-top: 10px;
    margin-right: 10px;

    &:hover {
        cursor: pointer;
    }
`

const SubmitContainer = styled.div`
    display: flex;
    align-items: center;
`

const Submit = styled.button`
    /* float: right; */
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
`

const SavedAlert = styled.p`
    display: ${props => props.active ? 'block' : 'none'};
    font-size: 11pt;
    margin-right: 10px;
    color: green;
`