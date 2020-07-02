import React, {useEffect, useContext, useState} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import CommentList from '../comments/CommentList.js'
import CommentForm from '../comments/CommentForm.js'
import {UserContext} from '../../context/UserProvider.js'
import DOMPurify from 'dompurify'
// import uploads from '../../../../uploads'
import styled from 'styled-components'

const PostDetail = props => {
    const {postId: propsPostId, preview, toggleModal} = props
    const {postId} = useParams()
    console.log(props)
    const {
        postDetail,
        postDetail: {
            _id, 
            titleImg, 
            title, 
            authorName, 
            postedBy, 
            date, 
            content, 
            user, 
            blog: blogId, draft
        }, 
        blog,
        getPost,
        getBlogWithId
    } = useContext(UserContext)

    const [redirect, setRedirect] = useState(false)

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

    const config = {ADD_TAGS: ['iframe'], KEEP_CONTENT: false, ADD_ATTR: ['src', 'width', 'height', 'allowfullscreen']}
    const cleanCode = {__html: DOMPurify.sanitize(content, config).replace(/uploads\//g, 'http://localhost:3000/uploads/')}
    console.log(cleanCode)
    // const updatedImgs = {__html: cleanCode.replace('uploads/', 'http://localhost:3000/uploads/')}
    // console.log(updatedImgs)

    return (
        <>
            {redirect && blog?.blogUrl ?
                <Redirect to={`/${blog?.blogUrl}`}/>
            :
                <>
                    {(_id && !draft) || preview ? 
                        <Page preview={preview} onClick={handleModalToggle}>
                            {
                            titleImg && 
                                <TitleImgContainer preview={preview}>
                                    <TitleImg src={titleImg}></TitleImg>
                                </TitleImgContainer>
                            }
                            <Container preview={preview}>
                                <Title>{title}</Title>
                                <Author>
                                    <i>by</i>
                                    <ToBlog onClick={blogRedirect}>{authorName ? authorName : postedBy}</ToBlog>
                                </Author>
                                <Date>{date}</Date>
                                <Content dangerouslySetInnerHTML={cleanCode}/>
                                {/* <Content dangerouslySetInnerHTML={{__html: '<p>asdfsdf</p>↵<p><img height="3264" width="2448" alt="" src="http://localhost:3000/uploads/7BC7C319-3BD2-48D5-8F52-94B8EE1C899A.jpeg-1593641850366"></p>'}}/> */}
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
        padding: ${props => props.preview ? '40px 10px' : '60px 10px'};
    }
`

const TitleImgContainer = styled.div`
    width: 944px;
    margin: auto;
    padding-top: ${props => props.preview ? '0' : '40px'};

    @media (max-width: 944px){
        width: 100%
    }
`

const TitleImg = styled.div`
    width: 100%;
    height: 400px;
    background-image: url(${props => props.src});
    /* *** problem needs to be changed for deploy *** */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media (max-width: 944px){
        height: 55vh;
    }
`

const Title = styled.p`
    font-size: 60px;
    font-weight: 200;
    margin-bottom: 10px;
    text-align: center;

    @media (max-width: 480px){
        font-size: 50px;
    }
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
        height: auto;
    }

    > figure > img {
        max-width: 100%;
        height: auto;
    }

    > figure > figcaption {
        color: #999;
        display: block;
        margin-top: .25rem;
        text-align: center;
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

    > p > iframe {
        max-width: 100%;
    }

    > table {
        max-width: 100%
    }
`