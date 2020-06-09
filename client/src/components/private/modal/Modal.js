import React from 'react'
import ImageModal from './image/ImageModal.js'
import PostModal from './post/PostModal.js'
import styled from 'styled-components'

const Modal = props => {
    const {toggle, close} = props

    console.log(toggle)

    return(
        <ModalContainer toggle={toggle}>
            <Container>
                <TitleContainer>
                    <Title>{props.toggle === 'img' ? 'Choose an Image' : 'Write a New Blog Post'}</Title>
                    <CancelButton onClick={close}>X</CancelButton>
                </TitleContainer>
                <ContentContainer>
                    {
                    toggle === 'img' ?
                        <ImageModal close={close}/>
                    :
                        <PostModal close={close}/>
                    }
                </ContentContainer>
            </Container>
        </ModalContainer>
    )
}

export default Modal

const ModalContainer = styled.div`
    display: ${props => props.toggle ? 'block' : 'none'};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
`

const Container = styled.div`
    width: 90%;
    height: 90%;
    margin: auto;
    margin-top: 5vh;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
    background-color: whitesmoke;
    border-radius: 10px;
    position: relative;
`

const TitleContainer = styled.div`
    height: 40px;
    background-color: #214761;
    border-radius: 10px 10px 0 0;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.p`
    color: whitesmoke;
    font-size: 14pt;
`

const CancelButton = styled.button`
    border: none;
    background-color: inherit;
    color: whitesmoke;
    font-size: 20px;
    outline: none;
    margin-right: 5px;

    &:hover {
        cursor: pointer
    }
`

const ContentContainer = styled.div`
    height: calc(100% - 40px);
`