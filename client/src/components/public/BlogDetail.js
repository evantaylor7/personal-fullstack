import React, {useEffect, useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'
import PostList from '../posts/PostList.js'
import Profile from '../private/profile/Profile.js'

const BlogDetail = () => {
    const location = useLocation()
    const {blogUrl} = useParams()
    const {blog, blog: {settings, title, subtitle, description, img, published}, getBlog} = useContext(UserContext)
    
    useEffect(() => {
        getBlog(blogUrl)
    }, [])
    
    console.log(blog)

    return (
        <>
            {
            published || location?.state?.preview ?
                <Container>
                    <TitleContainer>
                        <TitlesContent titleAbove={settings?.titleAbove} img={settings?.img}>
                            <Title color={title?.color}>
                                {title?.content}
                            </Title>
                            {settings?.subtitle && 
                                <Subtitle color={subtitle?.color}>
                                    <i>{subtitle?.content}</i>
                                </Subtitle>}
                            {settings?.description && 
                                <Description color={description?.color}>
                                    {description?.content}
                                </Description>}
                        </TitlesContent>
                        {settings?.img && 
                            <MainImg 
                                imgUrl={img} 
                                parallax={settings?.parallax} 
                                titleAbove={settings?.titleAbove}
                            />
                        }
                    </TitleContainer>
                    {!settings?.img && <Hr/>}
                    <ContentContainer profile={settings?.profile ? 1 : 0}>
                        <PostContainer>
                            <PostsHeading>Posts</PostsHeading>
                            <PostList blogId={blog._id} readonly={true}/>
                        </PostContainer>
                        {settings?.profile && <Profile readonly={true}/>}
                    </ContentContainer>
                </Container>
            :
                <DoesNotExist>
                    <DNEText>This blog has yet to be published.</DNEText>
                    <Link to='/auth'> Get Started</Link>
                    <DNEText>to claim this domain!</DNEText>
                </DoesNotExist>
            }
        </>
    )
}

export default BlogDetail

const Container = styled.div`
    padding: 40px 0;
`

const TitleContainer = styled.div`
    position: relative;
`

const TitlesContent = styled.div`
    text-align: center;
    margin: ${props => !props.img ? '40px 0 0 0' : props.titleAbove ? '40px 0 50px 0' : '10px'};
    position: ${props => !props.titleAbove && props.img && 'absolute'};
    top: ${props => !props.titleAbove && props.img && '50%'};
    left: ${props => !props.titleAbove && props.img && '50%'};
    transform: ${props => !props.titleAbove && props.img && 'translate(-50%, -50%)'};
`

const Title = styled.p`
    font-size: 70px;
    font-weight: 400;
    color: ${props => props.color};
    margin: 8px;
`

const Subtitle = styled.h2`
    color: ${props => props.color};
    font-size: 30px;
    margin: 8px;
`

const Description = styled.p`
    max-width: 800px;
    margin: 20px auto 0;
    color: ${props => props.color};
    word-break: break-word;
    line-height: 22px;
`

const MainImg = styled.div`
    height: 600px;
    margin: ${props => props.titleAbove ? '30px 0 20px 0' : '0 0 20px 0'};
    background-image: url(${props => props.imgUrl ? props.imgUrl : 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzOTM2MX0'});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: ${props => props.parallax && 'fixed'};
`

const Hr = styled.hr`
    margin-top: 2px;
    width: 96%; 
    margin: 60px auto 40px;
`

const ContentContainer = styled.div`
    display: ${props => props.profile ? 'grid' : 'block'};
    text-align: center;
    grid-template-columns: auto 400px;
    padding-top: 20px;
`

const PostContainer = styled.div`
    grid-column: 1 / 2;
    justify-self: center;
`

const PostsHeading = styled.h2``

const DoesNotExist = styled.div`
    padding-top: 80px;
    display: flex;
    justify-content: center;
`

const DNEText = styled.p`
    margin: 0 4px;
`