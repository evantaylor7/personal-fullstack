import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const CommentList = props => {
    const {postId} = props
    const {user, token, postComment} = useContext(UserContext)
    const [commentInputs, setCommentInputs] = useState({postedBy: '', content: ''})
    const [nameToggle, setNameToggle] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setCommentInputs(prevCommentInputs => ({
            ...prevCommentInputs,
            [name]: value
        }))
    }

    const handleNameToggle = e => {
        e.preventDefault()
        setNameToggle(prevNameToggle => !prevNameToggle)
    }

    const handleSubmit = e => {
        e.preventDefault()
        postComment(postId, commentInputs)
    }

    return (
        <Container>
            <Hr/>
            <CommentForm onSubmit={handleSubmit}>
                <NameContainer>
                    {
                    token && !nameToggle ? 
                        <PostingAs>Posting as <b>{user.username}</b></PostingAs>
                    :
                        <NameInput 
                            type='text' 
                            placeholder='Your name'
                            value={commentInputs.postedBy} 
                            name='postedBy' 
                            onChange={handleChange}
                        />
                    }
                    <Button onClick={handleNameToggle}>{nameToggle ? 'Cancel' : 'Change'}</Button>
                </NameContainer>
                <CommentInput 
                    type='text'
                    placeholder='Write your comment here'
                    value={commentInputs.content}
                    name='content'
                    onChange={handleChange}
                />
                <Submit>Submit</Submit>
            </CommentForm>
        </Container>
    )
}

export default CommentList

const Container = styled.div`
    margin-top: 60px;
    width: 100%;
`

const Hr = styled.hr``

const CommentForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`

const NameContainer = styled.div`
    display: flex;
    margin-bottom: 12px;
`

const PostingAs = styled.p`
    margin-right: 4px;
`

const Button = styled.button`
    margin-left: 4px;
    margin-bottom: -1px;
    border: none;
    outline: none;
    background-color: white;
    color: #0066CC;

    &:hover {
        cursor: pointer
    }
`

const NameInput = styled.input`
    border-radius: 6px;
    outline: none;
    padding: 6px 10px;
    border: solid 1px black;
`

const CommentInput = styled.textarea`
    margin-top: 8px;
    padding: 10px;
    border-radius: 6px;
    outline: none;
    height: 100px;
    width: 500px;
    max-width: 700px;
    max-height: 600px;
`

const Submit = styled.button`
    margin-top: 8px;
    height: 24px;
    width: 60px;
    border-radius: 4px;
    border: solid #a2a2a2 1px;

    &:hover {
        background-color: #dfdfdf;
        cursor: pointer;
    }
`