import React, {useContext, useEffect, useState} from 'react'
import Sidebar from './Sidebar.js'
import Titles from './Titles.js'
import ImageUploadModal from './ImageUploadModal.js'
import PostList from '../posts/PostList.js'
import {UserContext} from '../../context/UserProvider'
import styled from 'styled-components'

const UserHome = () => {
    const {
        blog,
        getBlog, 
        user: {username}, 
        updateBlog
    } = useContext(UserContext)
    console.log(blog)
    
    const [toggleModal, setToggleModal] = useState({img: false, post: false})

    useEffect(() => {
        getBlog(username)
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
                <Titles 
                    title={blog.title} 
                    subtitle={blog.subtitle} 
                    description={blog.description}
                    updateBlog={updateBlog} 
                    settings={blog.settings}
                />
                <MainImg setting={blog?.settings?.img}>
                    <button onClick={() => handleToggleModal('img')}>Choose Image</button>
                </MainImg>
                <ImageUploadModal toggle={toggleModal.img} cancel={handleToggleModal}/>
                <h2>Your Posts</h2>
                <Button onClick={() => handleToggleModal('post')}>Make New Post</Button>
                {/* ^^ opens modal to make new post */}
                <PostList/>
                <Button primary>Publish</Button>
            </BlogContainer>
        </Container>
    )
}

export default UserHome

const Container = styled.div`
    display: grid;
    grid-template-columns: 220px auto;
    padding-top: 40px
`

const BlogContainer = styled.div`
    grid-column: 2 / -1;
    border: solid lightgrey 1px;
    border-radius: 4px;
    margin: 10px;
    margin-left: 0
`

const MainImg = styled.div`
    display: ${props => props.setting ? 'block' : 'none'};
    height: 500px;
    margin: 10px;
    background-image: url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
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
    background-color: darkcyan;
    color: whitesmoke;
    cursor: pointer;
    ${props => props.primary && 'margin-top: 40px; font-size: 18pt'}
`