import React from 'react'
import styled from 'styled-components'

const ImageUploadModal = props => {
    const {toggle} = props

    return(
        <Modal toggle={toggle}>
            <Container>
                <Title>Choose an Image</Title>
                <LeftDiv>
                    <Tab>Unsplash</Tab>
                    <Tab>Upload Photo</Tab>
                </LeftDiv>
                <RightDiv>

                </RightDiv>
            </Container>
        </Modal>
    )
}

export default ImageUploadModal

const Modal = styled.div`
    display: ${props => props.toggle ? 'block' : 'none'};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* overflow: auto; */
    background-color: rgba(0, 0, 0, .5);
    padding: 2%
`

const Container = styled.div`
    /* position: fixed; */
    width: 90%;
    height: 90%;
    margin: 1% auto;
    /* margin-top: 10%; */
    box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
    background-color: whitesmoke;
    border-radius: 10px
    /* border: solid black 1px */
`

const Title = styled.div`
    height: 40px;
    background-color: #214761;
    border-radius: 10px 10px 0 0;
    color: whitesmoke;
    font-size: 18pt;
    padding-left: 10px;
    padding-top: 4px
`

const LeftDiv = styled.div`

`

const RightDiv = styled.div`

`

const Tab = styled.div`

`