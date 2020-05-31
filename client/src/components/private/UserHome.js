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
            <BlogContainer>
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
            </BlogContainer>
        </Container>
    )
}

export default UserHome

const Container = styled.div`
    display: grid;
    grid-template-columns: 220px auto;
    /* grid-template-columns: repeat(2, 220px auto); */
    /* justify-content: center */
`

const BlogContainer = styled.div`
    grid-column: 2 / -1;
    border: solid lightgrey 1px;
    margin: 10px
`

const MainImg = styled.div`
    /* grid-column: 2 / -1; */
    /* width: 100%; */
    height: 300px;
    border: solid black 1px;
    margin: 10px
`