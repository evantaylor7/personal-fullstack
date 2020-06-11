import React, {useContext} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const Post = props => {
    const {_id, draft, title, authorName, date, content, img, openModal} = props
    const {getPost, deletePost} = useContext(UserContext)

    const handleOpenPostEditor = e => {
        getPost(_id)
        openModal(e)
    }

    const reducedContent = content?.slice(0, 200)

    return(
        <Container>
            <Title>{title}</Title>
            {/* <Author>{authorName}</Author> */}
            <Date>{date}</Date>
            <Content>{reducedContent}{reducedContent?.length > 190 && '...'}</Content>
            <Button onClick={handleOpenPostEditor} name='post'>Edit</Button>
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