import React from 'react'
import {useParams} from 'react-router-dom'
import CommentList from './comments/CommentList.js'

const PostDetail = () => {
    const {postId} = useParams()

    return(
        <div>
            This is a post detail page
            <CommentList/>
        </div>
    )
}

export default PostDetail