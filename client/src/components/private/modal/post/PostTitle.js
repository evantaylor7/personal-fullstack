import React from 'react'
import styled from 'styled-components'

const PostTitle = props => {
    const {value, titleChange, save, handleImgModal, titleImg} = props

    return (
        <Container>
            <Button onClick={handleImgModal} name='img'>
                {titleImg ? 'Change Title Image' : 'Add Title Image'}
            </Button>
            {titleImg && <Img src={titleImg}/>}
            <TitleInput 
                type='text'
                value={value} 
                placeholder='Add a Blog Title'
                onChange={titleChange}
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

const Button = styled.button``

const Img = styled.img`
    max-width: 100%;
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