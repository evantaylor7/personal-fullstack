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
        if((commentInputs.postedBy === '' && !token) || (commentInputs.postedBy === '' && nameToggle)){
            postComment(postId, {content: commentInputs.content})
        } else {
            postComment(postId, commentInputs)
        }
        setCommentInputs({postedBy: '', content: ''})
    }

    return (
        <Container>
            <Hr/>
            <CommentForm onSubmit={handleSubmit}>
                <NameContainer>
                    {
                    token && !nameToggle ? 
                        <PostingAs>Posting as <B>{user.username}</B></PostingAs>
                    :
                        <NameInput 
                            type='text' 
                            placeholder='Your name'
                            value={commentInputs.postedBy} 
                            name='postedBy' 
                            onChange={handleChange}
                            maxLength={15}
                        />
                    }
                    {
                    token && 
                        <Button onClick={handleNameToggle}>
                            {nameToggle ? 'Cancel' : 'Change'}
                        </Button>
                    }
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

const B = styled.span`
    font-weight: 500;
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

    @media (max-width: 550px){
        width: 98%
    }
`

const Submit = styled.button`
    margin-top: 8px;
    padding: 2px 10px;
    height: 24px;
    border-radius: 4px;
    border: solid #a2a2a2 1px;
    transition: .4s;

    &:hover {
        background-color: #dfdfdf;
        cursor: pointer;
    }
`

export default CommentList