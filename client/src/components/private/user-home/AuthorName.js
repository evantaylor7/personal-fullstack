import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../../context/UserProvider'

const AuthorName = props => {
    const {toggle} = props
    const {blog, updateBlog, editPosts} = useContext(UserContext)

    const [input, setInput] = useState(blog.authorName || '')

    const handleChange = e => {
        const {value} = e.target
        setInput(value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        updateBlog({authorName: input})
        editPosts({authorName: input})
        toggle()
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Label>Set your Author Name or Pen Name:</Label>
            <Input 
                type='text'
                maxLength={25} 
                onChange={handleChange} 
                value={input}
            />
            <Save>Save</Save>
        </Form>
    )
}

export default AuthorName

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Label = styled.label``

const Input = styled.input`
    width: 200px;
    margin: auto;
    margin-top: 6px;
`

const Save = styled.button`
    width: 60px;
    margin-top: 6px;
    padding: 2px;
    border-radius: 4px;
    border: solid 1px #214761;
    background-color: whitesmoke;
    color: #1d1d1d;
    cursor: pointer;
`