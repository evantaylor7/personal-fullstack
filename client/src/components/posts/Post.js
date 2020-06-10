import React, {useContext} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const Post = props => {
    const {_id, draft, title, authorName, date, content, img, modal} = props
    const {getPost, deletePost} = useContext(UserContext)
    console.log(props)

    const handleOpenPostEditor = () => {
        getPost(_id)
        modal('post')
    }

    return(
        <Container>
            <Title>{title}</Title>
            {/* <Author>{authorName}</Author> */}
            <Date>{date}</Date>
            <Content>{content}</Content>
            {/* want to have just a couple lines of content and then '...' */}
            <Button onClick={handleOpenPostEditor}>Edit</Button>
            <Button onClick={() => deletePost(_id)}>Delete</Button>
        </Container>
    )
}

export default Post

const Container = styled.div``

const Title = styled.h2``

const Author = styled.h4``

const Date = styled.p``

const Content = styled.p``

const Button = styled.button``