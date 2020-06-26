import React, {useContext} from 'react'
import ImageModal from './image/ImageModal.js'
import PostModal from './post/PostModal.js'
import styled from 'styled-components'
import {UserContext} from '../../../context/UserProvider.js'

const Modal = props => {
    const {close, name, collection} = props
    const {postDetail} = useContext(UserContext)

    return (
        <ModalContainer toggle={name}>
            <Container>
                <TitleContainer>
                    <Title>
                        {
                        name === 'img' ? 
                            'Choose an Image' 
                        : 
                            !postDetail?._id ? 
                                'New Blog Post'
                            :
                                postDetail?.draft ?
                                    'Edit Draft'
                                :
                                    'Edit Blog Post'
                        }
                    </Title>
                    <CancelButton name={name} onClick={close}>&times;</CancelButton>
                </TitleContainer>
                <ContentContainer>
                    {
                    name === 'img' ?
                        <ImageModal close={close} collection={collection}/>
                    :
                        <PostModal toggle={close}/>}
                </ContentContainer>
            </Container>
        </ModalContainer>
    )
}

export default Modal

const ModalContainer = styled.div`
    position: fixed;
    z-index: ${props => props.name === 'img' ? 3 : 2};
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
    outline: none;
    margin-right: -8px;
    font-size: 24px;
    padding: 0 8px 2px;
    border-radius: 20px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: whitesmoke;
        color: #214761;
    }
`

const ContentContainer = styled.div`
    height: calc(100% - 40px);
`