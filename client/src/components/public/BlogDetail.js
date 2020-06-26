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

    const {
        token, 
        blog, 
        blog: {settings, title, subtitle, description, img, published}, 
        getBlog
    } = useContext(UserContext)
    
    useEffect(() => {
        getBlog(blogUrl)
    }, [])
    
    console.log(blog)

    return (
        <Page>
            {
            published || (location?.state?.preview && token) ?
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
                <>
                    <DoesNotExist>
                        {'This blog has yet to be published. '}
                    </DoesNotExist>
                    <LinkToSignup>
                        <Link to='/auth'>Get Started</Link> 
                        {' to claim this domain!'}
                    </LinkToSignup>
                </>
            }
        </Page>
    )
}

export default BlogDetail

const Page = styled.div`
    background-color: whitesmoke;
`

const Container = styled.div`
    padding: 40px 0;
    max-width: 1200px;
    margin: auto;
    background-color: white;
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
    font-weight: 300;
    color: ${props => props.color};
    margin: 8px;

    @media (max-width: 530px){
        width: 100%;
    }
    @media (max-width: 480px){
        font-size: 50px
    }
    @media (max-width: 350px){
        font-size: 44px
    }
`

const Subtitle = styled.h2`
    color: ${props => props.color};
    font-size: 30px;
    margin: 8px;

    @media (max-width: 480px){
        font-size: 26px
    }
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

    @media (max-width: 480px){
        height: 400px;
    }
    @media (max-width: 900px){
        height: 70vh
    }
`

const Hr = styled.hr`
    margin-top: 2px;
    width: 96%; 
    margin: 60px auto 40px;
`

const ContentContainer = styled.div`
    display: ${props => props.profile ? 'grid' : 'block'};
    grid-template-columns: auto 400px;
    padding-top: 20px;

    @media (max-width: 1000px){
        display: block;
    }
`

const PostContainer = styled.div`
    grid-column: 1 / 2;
    justify-self: center;
    width: 96%;
    margin-left: auto;
    margin-right: auto;
`

const PostsHeading = styled.h1`
    margin-bottom: 10px;
    text-align: center;
`

const DoesNotExist = styled.p`
    padding: 80px 20px 0;
    text-align: center;
`

const LinkToSignup = styled.p`
    padding: 20px;
    text-align: center;
`