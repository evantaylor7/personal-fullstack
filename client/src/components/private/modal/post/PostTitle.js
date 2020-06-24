import React from 'react'
import styled from 'styled-components'

const PostTitle = props => {
    const {value, onChange, save} = props

    return (
        <Container>
            <TitleInput 
                type='text'
                value={value} 
                placeholder='Add a Blog Title'
                onChange={onChange}
                onBlur={save}
            />
        </Container>
    )
}

export default PostTitle

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TitleInput = styled.input`
    border: none;
    border-radius: 10px;
    width: 96%;
    margin: 10px 0;
    padding: 16px 24px;
    font-size: 20pt;
    outline: none;
    font-weight: 200;
    /* background-color: whitesmoke; */
`