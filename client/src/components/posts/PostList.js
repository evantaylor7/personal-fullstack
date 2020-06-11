import React, {useEffect, useContext} from 'react'
import Post from './Post.js'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const PostList = props => {
    const {blogId, openModal} = props
    const {posts, getPosts} = useContext(UserContext)

    useEffect(() => {
        blogId && getPosts(blogId)
    }, [blogId])

    const drafts = posts?.filter(post => post.draft).map(post =>
        <Post
            {...post}
            key={post._id}
            openModal={openModal}
        />
    )

    const published = posts?.filter(post => !post.draft).map(post =>
        <Post
            {...post}
            key={post._id}
            openModal={openModal}
        />
    )

    return(
        <Container>
            <h2>Drafts</h2>
            {drafts}
            {!drafts[0] && <p>No Drafts</p>}
            <h2>Published</h2>
            {published}
            {!published[0] && <p>No Published Posts</p>}
        </Container>
    )
}

export default PostList

const Container = styled.div`

`