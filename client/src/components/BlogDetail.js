import React from 'react'
import {useParams} from 'react-router-dom'

const BlogDetail = () => {
    const {blogId} = useParams()

    return(
        <div>
            This is a blog detail page
        </div>
    )
}

export default BlogDetail