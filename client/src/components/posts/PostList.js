import React, {useEffect, useContext} from 'react'
import Post from './Post.js'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const PostList = props => {
    const {blogId, openModal, readonly} = props
    const {posts, getPosts, getPublicPosts} = useContext(UserContext)

    useEffect(() => {
        blogId && (
            readonly ?
                getPublicPosts(blogId)
            :
                getPosts(blogId)
        )
    }, [blogId])

    const drafts = posts?.filter(post => post.draft).map((post, i) =>
        <Post
            {...post}
            key={i}
            openModal={openModal}
        />
    )

    const published = posts?.filter(post => !post.draft).map((post, i) =>
        <Post
            {...post}
            key={i}
            openModal={openModal}
            readonly={readonly}
        />
    )

    return (
        <Container>
            {!readonly &&
                <>
                    <PostType>Drafts</PostType>
                    {drafts}
                    {!drafts[0] && <p>No Drafts</p>}
                    <PostType>Published</PostType>
                </>
            }
            {published}
            {!published[0] && <p>No Published Posts</p>}
        </Container>
    )
}

const Container = styled.div``

const PostType = styled.h2`
    margin: 20px 0;
`

export default PostList