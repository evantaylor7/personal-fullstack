import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../../../context/UserProvider'

const initInputs = {
    title: '',
    authorName: '',
    content: ''
}

const PostModal = props => {
    const {close} = props
    const {
        blog,
        blog: {_id: blogId, authorName}, 
        postDetail, 
        postNew, 
        editPost
    } = useContext(UserContext)
    console.log(postDetail)

    const [inputs, setInputs] = useState(initInputs)
    console.log(inputs)

    useEffect(() => {
        setInputs({title: postDetail?.title, authorName: authorName, content: postDetail.content})
    }, [blog, postDetail])

    const handleChange = e => {
        const {name, value} = e.target
        console.log(value)
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const save = () => {
        if(!inputs.title && !inputs.content){
            return
        } else {
            console.log('saved')
            postDetail?._id ? 
                editPost(postDetail._id, inputs)
            :
                postNew({...inputs, blog: blogId})
        }
    }

    const handlePostSubmit = e => {
        const {name} = e.target
        name === 'draft' ?
            editPost(postDetail._id, inputs)
        :
            editPost(postDetail._id, {...inputs, draft: false})
        close()
    }

    return(
        <Container>
            <ContentContainer>
                <LeftDiv>
                    Set Cover image
                    <hr/>
                    Add Image <br/>
                    Italicize and stuff
                </LeftDiv>
                <RightDiv>
                    <TitleInput 
                        name='title' 
                        type='text'
                        value={inputs.title} 
                        placeholder='Add a Blog Title'
                        onChange={handleChange}
                        onBlur={save}
                    />
                    <Content 
                        name='content' 
                        onChange={handleChange} 
                        onBlur={save} 
                        value={inputs.content}
                        placeholder='Write your blog post here. Add images, links, dividers, and edit text style using the editor on the left.'
                    />
                </RightDiv>
            </ContentContainer>
            <SubmitContainer>
                <Submit draft name='draft' onClick={handlePostSubmit}>Save Draft</Submit>
                <Submit name='submit' onClick={handlePostSubmit}>Publish</Submit>
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

const RightDiv = styled.div`
    grid-column: 2 / -1;
    /* overflow: auto; */
    /* padding: 20px; */
    /* padding-top: 10px; */
`

const TitleInput = styled.input`
    border: none;
    border-radius: 10px;
    width: 90%;
    margin: 10px auto;
    padding: 16px 24px;
    font-size: 20pt;
    outline: none;
    font-weight: 200;
    /* background-color: whitesmoke; */
`

const Content = styled.textarea`
    height: calc(100% - 94px);
    width: 90%;
    resize: none;
    margin: auto;
    padding: 16px 24px;
    border-radius: 10px;
    border: none;
    background-color: white;
    text-align: left;
    font-weight: 300;
    outline: none;
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