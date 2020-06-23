import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
// import DOMPurify from 'dompurify'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'
import PostDetail from '../public/PostDetail'

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

    return (
        <>
            {!readonly ?
                <Container>
                    <Title>{title}</Title>
                    <Date>{date}</Date>
                    {/* <div dangerouslySetInnerHTML={blogSnippet}/> */}
                    <Button onClick={handleOpenPostEditor} name='post'>Edit</Button>
                    <Button onClick={() => deletePost(_id)}>Delete</Button>
                    <Preview to={{pathname: `/p/${_id}`, state: {preview: true}}}>Preview</Preview>
                </Container>
            :
                <PostLink to={`/p/${_id}`}>
                    <Container>
                        <Title>{title}</Title>
                        <Date>{date}</Date>
                    </Container>
                </PostLink>
            }
        </>
    )
}

export default Post

const Container = styled.div`
    border: solid 1px #a1a1a1;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 20px;
    transition: box-shadow .4s;

    &:hover {
        box-shadow: 2px 2px 5px #606060
    }
`

const Title = styled.h2``

const Date = styled.p``

const Button = styled.button``

const Preview = styled(Link)``

const PostLink = styled(Link)`
    text-decoration: none;
    color: #1d1d1d
`