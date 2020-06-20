import React, {useEffect, useContext, useState} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import CommentList from '../comments/CommentList.js'
import CommentForm from '../comments/CommentForm.js'
import {UserContext} from '../../context/UserProvider.js'
import DOMPurify from 'dompurify'
import styled from 'styled-components'

const PostDetail = () => {
    const {postId} = useParams()
    const {
        postDetail: {_id, title, authorName, date, content, user, blog: blogId}, 
        blog,
        getPost,
        getBlogWithId
    } = useContext(UserContext)

    const [redirect, setRedirect] = useState(false)

    console.log(content)

    useEffect(() => {
        getPost(postId)
    }, [blog.blogUrl])

    const blogRedirect = () => {
        getBlogWithId(blogId)
        setRedirect(true)
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
                    _id ? 
                        <Page>
                            <Container>
                                <Title>{title}</Title>
                                <Author><i>by</i><ToBlog onClick={blogRedirect}>{authorName}</ToBlog></Author>
                                <Date>{date}</Date>
                                <Content dangerouslySetInnerHTML={cleanCode}/>
                                <CommentForm postId={postId}/>
                                <CommentList postId={postId} postUser={user}/>
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
`

const Container = styled.div`
    width: 1000px;
    margin: auto;
    padding: 50px 30px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    font-weight: 300;
    display: grid;
    grid-gap: 10px;
`