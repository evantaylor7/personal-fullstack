import React, {useEffect, useContext, useState} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import CommentList from '../comments/CommentList.js'
import CommentForm from '../comments/CommentForm.js'
import {UserContext} from '../../context/UserProvider.js'
import DOMPurify from 'dompurify'
import styled from 'styled-components'

const PostDetail = props => {
    const {postId: propsPostId, preview, toggleModal} = props
    const {postId} = useParams()
    console.log(props)
    const {
        postDetail,
        postDetail: {_id, title, authorName, date, content, user, blog: blogId, draft}, 
        blog,
        getPost,
        getBlogWithId
    } = useContext(UserContext)

    const [redirect, setRedirect] = useState(false)

    console.log(content)

    useEffect(() => {
        getPost(postId || propsPostId)
    }, [blog.blogUrl])

    const blogRedirect = () => {
        getBlogWithId(blogId)
        setRedirect(true)
    }

    const handleModalToggle = () => {
        toggleModal && toggleModal(true)
    }

    const cleanCode = {__html: DOMPurify.sanitize(content)}

    console.log(redirect)
    console.log(blog.blogUrl)

    return (
        <>
            {redirect && blog?.blogUrl ?
                <Redirect to={`/${blog?.blogUrl}`}/>
            :
                <>
                    {
                    (_id && !draft) || preview ? 
                        <Page preview={preview} onClick={handleModalToggle}>
                            <Container preview={preview}>
                                <Title>{title}</Title>
                                <Author><i>by</i><ToBlog onClick={blogRedirect}>{authorName}</ToBlog></Author>
                                <Date>{date}</Date>
                                <Content dangerouslySetInnerHTML={cleanCode}/>
                                {
                                !preview &&
                                    <>
                                        <CommentForm postId={postId}/>
                                        <CommentList postId={postId} postUser={user}/>
                                    </>
                                }
                            </Container>
                        </Page>
                    :
                        <Container>
                            <p>This post doesn't exist</p>
                        </Container>
                    }
                </>
            }
        </>
    )
}

export default PostDetail

const Page = styled.div`
    background-color: whitesmoke;
    width: ${props => props.preview ? '944px' : '100%'};
    ${props => props.preview && 'height: 90%; z-index: 3; overflow: scroll; margin: 8vh auto auto'};

    @media (max-width: 960px){
        width: ${props => props.preview ? '96%' : '100%'}
    }
`

const Container = styled.div`
    width: 944px;
    margin: auto;
    padding: ${props => props.preview ? '40px 30px' : '60px 30px'};
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 944px){
        width: 100%
    }
    @media (max-width: 500px){
        padding: 40px 10px
    }
`

const Title = styled.p`
    font-size: 60px;
    font-weight: 200;
    margin-bottom: 10px;
`

const Author = styled.div`
    display: flex;
    flex-direction: row;
`

const ToBlog = styled.p`
    text-decoration: underline;
    margin-left: 4px;

    &:hover {
        cursor: pointer
    }
`

const Date = styled.p`
    font-weight: 300;
    margin: 20px;
`

const Content = styled.div`
    display: grid;
    grid-gap: 10px;
    
    > p {
        font-weight: 300;
        line-height: 1.8em;
    }

    > p > span {
        font-weight: 300;
        line-height: 1.8em;
    }

    > p > img {
        max-width: 100%;
        height: 100%;
    }

    > blockquote {
        font-weight: 300;
        line-height: 1.8em;
        border-left: 2px solid #ccc;
        margin-left: 1.5rem;
        padding-left: 1rem;
    }

    > ol, ul {
        margin-left: 40px;
    }
`