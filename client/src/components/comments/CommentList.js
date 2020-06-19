import React, {useContext, useEffect} from 'react'
import Comment from './Comment.js'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider.js'

const CommentList = props => {
    const {postId} = props
    const {getComments, comments} = useContext(UserContext)

    useEffect(() => {
        getComments(postId)
    }, [])

    const Comments = comments.map(comment => 
        <Comment 
            key={comment._id}
            {...comment}
        />
    )

    return (
        <Container>
            {Comments}
        </Container>
    )
}

export default CommentList

const Container = styled.div``