import React, {useState, useContext, useEffect} from 'react'
import Modal from '../Modal.js'
import PostEditor from './PostEditor.js'
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

    const [inputs, setInputs] = useState(initInputs)
    const [saveDisplay, setSaveDisplay] = useState(false)
    const [imgModal, setImgModal] = useState(false)
    console.log(inputs)

    useEffect(() => {
        setInputs({title: postDetail?.title || '', authorName: authorName, content: postDetail.content || {}})
    }, [blog, postDetail])

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
        if(!inputs.title && !inputs.content){
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

    const handlePostSubmit = (e, type) => {
        console.log(type)
        type === 'draft' ?
            editPost(postDetail._id, inputs)
        :
            editPost(postDetail._id, {...inputs, draft: false})
        
        toggle(e)
    }

    return (
        <Container>
            <ContentContainer>
                <LeftDiv>
                    Set Cover image
                    <hr/>
                    <SidebarButton 
                        onClick={handleImgModal} 
                        name='img'
                        disabled={!postDetail._id}
                    >
                        Add Image
                    </SidebarButton>
                    {imgModal && <Modal close={handleImgModal} name='img' collection='post'/>}
                    <br/>
                    Italicize and stuff
                </LeftDiv>
                <RightDiv>
                    <TitleInput 
                        type='text'
                        value={inputs.title} 
                        placeholder='Add a Blog Title'
                        onChange={handleTitleChange}
                        onBlur={save}
                    />
                    <PostEditor 
                        value={inputs.content} 
                        onChange={handleContentChange}
                        save={save}
                    />
                </RightDiv>
            </ContentContainer>
            <SubmitContainer>
                <SavedAlert active={saveDisplay}>Saved &#10003;</SavedAlert>
                {!saveDisplay && <Submit draft name='post' onClick={save}>Save</Submit>}
                <Submit draft name='post' onClick={e => handlePostSubmit(e, 'draft')}>Save as Draft</Submit>
                <Submit name='post' onClick={e => handlePostSubmit(e, 'published')}>Publish</Submit>
            </SubmitContainer>
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

const SidebarButton = styled.button``

const RightDiv = styled.div`
    grid-column: 2 / -1;
    /* overflow: auto; */
    /* padding: 20px; */
    /* padding-top: 10px; */
`

const TitleInput = styled.input`
    border: none;
    border-radius: 10px;
    width: 96%;
    margin: 10px auto;
    padding: 16px 24px;
    font-size: 20pt;
    outline: none;
    font-weight: 200;
    /* background-color: whitesmoke; */
`

const SubmitContainer = styled.div`
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

const SavedAlert = styled.p`
    display: ${props => props.active ? 'block' : 'none'};
    font-size: 11pt;
    margin-right: 10px;
    color: green;
`

const Submit = styled.button`
    float: right;
    margin-right: ${props => props.draft ? '4px' : '20px'};
    border: ${props => props.draft ? 'solid 1px #214761' : 'none'};
    background-color: ${props => props.draft ? 'whitesmoke' : '#214761'};
    color: ${props => props.draft ? '#1d1d1d' : 'whitesmoke'};
    padding: 5px;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
    }
`