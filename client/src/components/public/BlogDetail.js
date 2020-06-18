import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'
import PostList from '../posts/PostList.js'
import AboutForm from '../private/about/AboutForm.js'

const BlogDetail = () => {
    const {blogUrl} = useParams()
    const {blog, blog: {settings, title, subtitle, description, img}, getBlog} = useContext(UserContext)
    
    useEffect(() => {
        getBlog(blogUrl)
    }, [])
    
    console.log(blogUrl)
    console.log(blog)
    return(
        <Container>
            <TitleContainer>
                <TitlesContent titleAbove={settings?.titleAbove} img={settings?.img}>
                    <Title color={title?.color}>
                        {title?.content}
                    </Title>
                    {settings?.subtitle && 
                        <Subtitle color={subtitle?.color}>
                            {subtitle?.content}
                        </Subtitle>}
                    {settings?.description && 
                        <Description color={description?.color}>
                            {description?.content}
                        </Description>}
                </TitlesContent>
                {settings?.img && <MainImg imgUrl={img} parallax={settings?.parallax}/>}
            </TitleContainer>
            {!settings?.img && <Hr/>}
            <ContentContainer profile={settings?.profile ? 'true' : 'thisseemssilly'}>
                <PostContainer>
                    <PostsHeading>Posts</PostsHeading>
                    <PostList blogId={blog._id}/>
                </PostContainer>
                {settings?.profile && <AboutForm/>}
            </ContentContainer>
        </Container>
    )
}

export default BlogDetail

const Container = styled.div`
    padding-top: 50px;
`

const TitleContainer = styled.div`
    position: relative;
`

const TitlesContent = styled.div`
    text-align: center;
    position: ${props => !props.titleAbove && props.img && 'absolute'};
    top: ${props => !props.titleAbove && props.img && '50%'};
    left: ${props => !props.titleAbove && props.img && '50%'};
    transform: ${props => !props.titleAbove && props.img && 'translate(-50%, -50%)'};
`

const Title = styled.p`
    font-size: 30pt;
    font-weight: 600;
    color: ${props => props.color};
`

const Subtitle = styled.h2`
    color: ${props => props.color};
`

const Description = styled.p`
    max-width: 800px;
    margin: auto;
    color: ${props => props.color};
    word-break: break-word;
`

const MainImg = styled.div`
    height: 500px;
    margin: 10px 0;
    background-image: url(${props => props.imgUrl ? props.imgUrl : 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzOTM2MX0'});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${props => props.parallax ? '110px center' : 'center'};
    background-attachment: ${props => props.parallax && 'fixed'};
`

const Hr = styled.hr`
    margin-top: 2px;
    width: 96%; margin: auto;
`

const ContentContainer = styled.div`
    display: ${props => props.profile === 'true' ? 'grid' : 'block'};
    text-align: center;
    grid-template-columns: auto 400px;
    padding-top: 20px;
`

const PostContainer = styled.div`
    grid-column: 1 / 2;
    justify-self: center;
`

const AuthorNameContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const AuthorName = styled.p`
    font-size: 18pt;
`

const EditAuthorName = styled.button`
    margin-left: 10px;
    font-size: 9pt;
    border: none;
    background-color: white;
    color: #0066CC;
    cursor: pointer;
`

const PostsHeading = styled.h2`
    margin-top: 10px;
`