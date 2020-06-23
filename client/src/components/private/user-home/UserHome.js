import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar.js'
import Endpoint from './Endpoint.js'
import Titles from '../titles/Titles.js'
import Modal from '../modal/Modal.js'
import AuthorNameInput from './AuthorName.js'
import PostList from '../../posts/PostList.js'
import Profile from '../profile/Profile.js'
import {UserContext} from '../../../context/UserProvider'
import styled from 'styled-components'
import ScrollToTop from '../../../ScrollToTop.js'

const UserHome = () => {
    const {
        blog,
        postDetail,
        getUserBlog, 
        updateBlog,
        clearPostDetail
    } = useContext(UserContext)

    const [toggleModal, setToggleModal] = useState({img: false, post: false})
    const [toggleAuthorName, setToggleAuthorName] = useState(false)
    console.log(toggleAuthorName)
    useEffect(() => {
        getUserBlog()
    }, [])

    const handleToggleModal = e => {
        const {name} = e.target
        console.log(name)
        setToggleModal(prevToggle => ({
            ...prevToggle,
            [name]: !prevToggle[name]
        }))
    }

    const handleAuthorNameToggle = setting => {
        setToggleAuthorName(setting)
    }

    const handleNewPost = e => {
        clearPostDetail()
        handleToggleModal(e)
    }

    const handlePublish = () => {
        blog?.blogUrl ?
            updateBlog({published: !blog?.published})
        :
            alert('You must set a url endpoint')
    }

    const colorArray = ['rgb(237, 101, 90)', 'rgb(225, 192, 76)', 'rgb(114, 190, 71)']
    const windowDots = colorArray.map(dot => <Dot key={dot} color={dot}/>)

    return (
        <Container>
            {/* {blog?.img && <ScrollToTop/>} */}
            <Sidebar blog={blog} updateBlog={updateBlog}/>
            <BlogContainer>
                <Url>
                    <DotContainer>
                        {windowDots}
                    </DotContainer>
                    <Endpoint/>
                </Url>
                <Hr/>
                <TitleContainer>
                    <Titles 
                        title={blog.title} 
                        subtitle={blog.subtitle} 
                        description={blog.description}
                        updateBlog={updateBlog} 
                        settings={blog.settings}
                    />
                    <MainImg 
                        setting={blog?.settings?.img} 
                        imgUrl={blog?.img} 
                        parallax={blog?.settings?.parallax}
                        titleAbove={blog?.settings?.titleAbove}
                    >
                        <Button image name='img' onClick={handleToggleModal}>Choose Image</Button>
                    </MainImg>
                    {
                    toggleModal?.img && 
                        <Modal 
                            close={handleToggleModal} 
                            name='img'
                            collection='blog'
                        />
                    }
                </TitleContainer>
                {!blog?.settings?.img && <Hr mid/>}
                <ContentContainer profile={blog?.settings?.profile ? 'true' : 'thisseemssilly'}>
                    <PostContainer>
                        {
                        blog?.authorName && !toggleAuthorName ? 
                            <AuthorNameContainer>
                                <AuthorName>{blog.authorName}</AuthorName> 
                                <EditAuthorName onClick={() => handleAuthorNameToggle(true)}>
                                    Change
                                </EditAuthorName>
                            </AuthorNameContainer>
                        : 
                            <AuthorNameInput toggle={handleAuthorNameToggle}/>
                        }
                        <PostHeaderContainer>
                            <PostsHeader>Your Posts</PostsHeader>
                            <Button primary name='post' onClick={handleNewPost}>Make New Post</Button>
                        </PostHeaderContainer>
                        {
                        toggleModal?.post &&
                            <Modal
                                close={handleToggleModal}
                                name='post'
                            />
                        }
                        <PostList blogId={blog._id} openModal={handleToggleModal}/>
                    </PostContainer>
                    {blog?.settings?.profile && <Profile/>}
                </ContentContainer>
                <ButtonsContainer>
                    <Link to={{pathname: `/${blog?.blogUrl}`, state: {preview: !blog?.published}}}>
                        <Button primary alt={1} style={{'marginRight': '3px'}}>
                            {blog?.published ? 'View Blog' : 'Preview'}
                        </Button>
                    </Link>
                    <Button primary onClick={handlePublish} style={{'marginLeft': '3px'}}>
                        {blog?.published ? 'Unp' : 'P'}ublish
                    </Button>
                </ButtonsContainer>
            </BlogContainer>
        </Container>
    )
}

export default UserHome

const Container = styled.div`
    display: grid;
    grid-template-columns: 220px auto;
    padding-top: 40px;
    background-color: whitesmoke;
`

const BlogContainer = styled.div`
    grid-column: 2 / -1;
    border: solid lightgrey 1px;
    border-radius: 6px;
    margin: 10px;
    margin-left: 0;
    background-color: white;
`

const Url = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2px;
`

const Hr = styled.hr`
    ${props => props.mid && 'width: 96%'};
    margin: ${props => props.mid ? '60px 0 40px 0' : '2px 0 0 0'};
`

const DotContainer = styled.div`
    display: flex;
    margin: 10px;
`

const Dot = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 10px;
    margin-right: 5px;
    background-color: ${props => props.color};
`

const TitleContainer = styled.div`
    position: relative;
`

const MainImg = styled.div`
    display: ${props => props.setting ? 'block' : 'none'};
    height: 600px;
    margin: ${props => props.titleAbove ? '30px 0 20px 0' : '0 0 20px 0'};
    background-image: url(${props => props.imgUrl ? props.imgUrl : 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzOTM2MX0'});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${props => props.parallax ? '110px center' : 'center'};
    background-attachment: ${props => props.parallax && 'fixed'};
`

const Button = styled.button`
    height: ${props => props.primary ? '40px' : '30px'};
    font-size: ${props => props.primary ? '16px' : '12px'};
    padding: 4px 8px;
    border-radius: 4px;
    border: solid 1px #214761;
    background-color: ${props => props.alt ? 'whitesmoke' : '#214761'};
    color: ${props => props.alt ? '#214761' : 'whitesmoke'};
    cursor: pointer;
    ${props => props.image && 'margin: 4px'};
`

const ContentContainer = styled.div`
    display: ${props => props.profile === 'true' ? 'grid' : 'block'};
    /* text-align: center; */
    grid-template-columns: auto 400px;
    padding-top: 20px;
    padding-left: 20px;

    @media (max-width: 1100px){
        display: block
    }
`

const PostContainer = styled.div`
    grid-column: 1 / 2;
    /* justify-self: center; */
    width: 96%;
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

const PostHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
`

const PostsHeader = styled.h1``

const ButtonsContainer = styled.div`
    margin: 100px 0 20px 0;
    display: flex;
    justify-content: center
`