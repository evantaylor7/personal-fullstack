import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
// import DOMPurify from 'dompurify'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const Post = props => {
    console.log(props)
    const {_id, draft, title, authorName, date, content, img, openModal, readonly} = props
    const {getPost, deletePost} = useContext(UserContext)

    const handleOpenPostEditor = e => {
        getPost(_id)
        openModal(e)
    }

    // const cleanCode = DOMPurify.sanitize(content)
    // const snippetStart = cleanCode.search('<p>')
    // const textEnd = cleanCode.search('</p>')
    // const snippetEnd = textEnd - snippetStart > 200 ? 200 : textEnd
    // const blogSnippet = {__html: `${cleanCode.slice(snippetStart, snippetEnd)} ${cleanCode?.length > 190 ? ' ...' : ''}`} 

    return(
        <>
            {!readonly ?
                <Container>
                    <Title>{title}</Title>
                    <Date>{date}</Date>
                    {/* <div dangerouslySetInnerHTML={blogSnippet}/> */}
                    <Button onClick={handleOpenPostEditor} name='post'>Edit</Button>
                    <Button onClick={() => deletePost(_id)}>Delete</Button>
                    <Button>Preview</Button>
                </Container>
            :
                <Link to={`/p/${_id}`}>
                    <Title>{title}</Title>
                    <Date>{date}</Date>
                </Link>
            }
        </>
    )
}

export default Post

const Container = styled.div``

const Title = styled.h2``

const Date = styled.p``

const Button = styled.button``