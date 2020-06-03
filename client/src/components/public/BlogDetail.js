import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const BlogDetail = () => {
    const {blogUrl} = useParams()
    const {blog, getBlog} = useContext(UserContext)
    
    useEffect(() => {
        getBlog(blogUrl)
    }, [])
    
    console.log(blogUrl)
    console.log(blog)
    return(
        <Container>
            This is a blog detail page
        </Container>
    )
}

export default BlogDetail

const Container = styled.div`
    padding-top: 50px
`