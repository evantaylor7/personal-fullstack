import React, {useContext, useEffect} from 'react'
import Sidebar from './Sidebar.js'
import Titles from './Titles.js'
import ImageUploader from './ImageUploader.js'
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
    useEffect(() => {
        getBlog(username)
    }, [])

    return(
        <Container>
            <Sidebar blog={blog} updateBlog={updateBlog}/>
            <Titles 
                title={blog.title} 
                subtitle={blog.subtitle} 
                description={blog.description}
                updateBlog={updateBlog} 
                settings={blog.settings}
            />
            <MainImg>
                {/* <button>Click to add a </button> */}
            </MainImg>
        </Container>
    )
}

export default UserHome

const Container = styled.div`
    display: grid;
    grid-template-columns: 220px auto;
    justify-content: center
`

const MainImg = styled.div`
    grid-column: 2 / -1
`