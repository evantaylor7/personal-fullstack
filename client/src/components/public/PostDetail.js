import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import CommentList from '../comments/CommentList.js'
import {UserContext} from '../../context/UserProvider.js'
import DOMPurify from 'dompurify'
import styled from 'styled-components'

const PostDetail = () => {
    const {postId} = useParams()
    const {postDetail: {_id, title, authorName, date, content}, getPost} = useContext(UserContext)
    console.log(content)
    useEffect(() => {
        getPost(postId)
    }, [])

    const cleanCode = {__html: DOMPurify.sanitize(content)}

    // authorName: "I have dog"
    // blog: "5eeb06404175d84d3cf14185"
    // content: "<p>&emsp;&emsp;Well that's cool now you can tab out. It seemed like that should have been more easily accessible in the docs (if it was even accessable). So yeah this is my first blog post. It's going pretty well blah!</p>↵<p><img src="https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80" alt="" width="828" height="552" /></p>"
    // date: "June 18, 2020"
    // draft: false
    // img: []
    // postedBy: "evan"
    // title: "First post what up"
    // user: "5eeb06404175d84d3cf14184"
    // __v: 0
    // _id: "5eebfbbb9307f30f51d5739f"

    return(
        <>
            {
            _id ? 
                <Page>
                    <Container>
                        <Title>{title}</Title>
                        <Author><i>by</i> {authorName}</Author>
                        <Date>{date}</Date>
                        <Content dangerouslySetInnerHTML={cleanCode}/>
                        <CommentList/>
                    </Container>
                </Page>
            :
                <Container>
                    <p>This post doesn't exist</p>
                </Container>
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
    font-size: 70px;
    font-weight: 200;
    margin-bottom: 10px;
`

const Author = styled.p``

const Date = styled.p`
    font-weight: 300;
    margin: 20px;
`

const Content = styled.div`
    font-weight: 300;
    display: grid;
    grid-gap: 10px;
`