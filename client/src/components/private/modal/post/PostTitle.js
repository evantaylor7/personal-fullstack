import React from 'react'
import styled from 'styled-components'

const PostTitle = props => {
    const {value, titleChange, save, handleImgModal, titleImg, removeImg} = props

    return (
        <Container>
            {titleImg && <Img src={titleImg}></Img>}
            <ButtonsContainer>
                <Button onClick={handleImgModal} name='img'>
                    {titleImg ? 'Change Title Image' : 'Add Title Image'}
                </Button>
                {titleImg && <Button onClick={removeImg}>Remove Image</Button>}
            </ButtonsContainer>
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Img = styled.div`
    width: 100%;
    height: 400px;
    background-image: url(${props => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media (max-width: 600px){
        height: 55vh
    }
`

const Button = styled.button`
    margin: 10px 5px 0;
    border: solid 1px #214761;
    background-color: white;
    color: #214761;
    padding: 5px;
    border-radius: 4px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
`

const ButtonsContainer = styled.div`
    display: flex;
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
`

export default PostTitle