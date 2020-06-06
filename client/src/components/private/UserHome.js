import React, {useContext, useEffect, useState} from 'react'
import Sidebar from './Sidebar.js'
import Endpoint from './Endpoint.js'
import Titles from './titles/Titles.js'
import ImageUploadModal from './Image Modal/ImageUploadModal.js'
import PostList from '../posts/PostList.js'
import {UserContext} from '../../context/UserProvider'
import styled from 'styled-components'

const UserHome = () => {
    const {
        blog,
        getUserBlog, 
        user: {username}, 
        updateBlog
    } = useContext(UserContext)
    console.log(blog)
    
    const [toggleModal, setToggleModal] = useState({img: false, post: false})

    useEffect(() => {
        getUserBlog()
    }, [])

    const handleToggleModal = type => {
        setToggleModal(prevToggleModal => ({
            ...prevToggleModal,
            [type]: prevToggleModal[type] === true ? false : true
        }))
    }

    return(
        <Container>
            <Sidebar blog={blog} updateBlog={updateBlog}/>
            <BlogContainer>
                <Url>
                    <DotContainer>
                        <Dot color='rgb(237, 101, 90)'/>
                        <Dot color='rgb(225, 192, 76)'/>
                        <Dot color='rgb(114, 190, 71)'/>
                    </DotContainer>
                    <Endpoint/>
                </Url>
                <TitleContainer>
                    <Titles 
                        title={blog.title} 
                        subtitle={blog.subtitle} 
                        description={blog.description}
                        updateBlog={updateBlog} 
                        settings={blog.settings}
                    />
                    <MainImg setting={blog?.settings?.img} imgUrl={blog.imgUrl}>
                        <Button onClick={() => handleToggleModal('img')}>Choose Image</Button>
                    </MainImg>
                    {
                    toggleModal.img && 
                        <ImageUploadModal 
                        toggle={toggleModal.img} 
                        close={handleToggleModal}
                        addImg={updateBlog}
                        />
                    }
                </TitleContainer>
                <PostContainer>
                    <h2>Your Posts</h2>
                    <Button onClick={() => handleToggleModal('post')}>Make New Post</Button>
                    {/* ^^ opens modal to make new post */}
                    <PostList/>
                    <Button primary>Publish</Button>
                </PostContainer>
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
    height: 500px;
    margin: 10px;
    background-image: url(${props => props.imgUrl ? props.imgUrl : 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    /* background-position: 110px center; */
    /* background-attachment: fixed */
    /* ^^ to make paralax */
`

const Button = styled.button`
    height: ${props => props.primary ? '40px' : '30px'};
    padding: 5px;
    border-radius: 4px;
    border: solid 1px black;
    background-color: #214761;
    color: whitesmoke;
    cursor: pointer;
    ${props => props.primary && 'margin-top: 40px; font-size: 18pt'}
`

const PostContainer = styled.div`
    /* grid-column: 2 / -1; */
`