import React, {useContext, useEffect} from 'react'
import Sidebar from './Sidebar.js'
import Titles from './Titles.js'
import ImageUploader from './ImageUploader.js'
import {UserContext} from '../../context/UserProvider'
import styled from 'styled-components'

const UserHome = () => {
    const {blog, getBlog, user: {username}, updateBlog} = useContext(UserContext)

    useEffect(() => {
        getBlog(username)
    }, [])
    console.log(blog)

    return(
        <Container>
            <Sidebar/>
            <Titles title={blog.title} subtitle={blog.subtitle} updateBlog={updateBlog}/>
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