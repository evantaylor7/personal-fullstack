import React, {useState} from 'react'
import styled from 'styled-components'

const ImageUploadModal = props => {
    const {toggle, cancel} = props

    const [tab, setTab] = useState('')

    const handleTab = type => {
        setTab(type)
    }

    return(
        <Modal toggle={toggle}>
            <Container>
                <TitleContainer>
                    <Title>Choose an Image</Title>
                    <CancelButton onClick={() => cancel('img')}>X</CancelButton>
                </TitleContainer>
                <ContentContainer>
                    <LeftDiv>
                        <Tab>
                            <TabContent onClick={() => handleTab('unsplash')} selected={tab === 'unsplash'}>
                                Unsplash
                            </TabContent>
                        </Tab>
                        <Tab>
                            <TabContent onClick={() => handleTab('upload')} selected={tab === 'upload'}>
                                Upload Photo
                            </TabContent>
                        </Tab>
                    </LeftDiv>
                    <RightDiv>

                    </RightDiv>
                </ContentContainer>
                <Apply>Apply</Apply>
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
    position: relative
`

const TitleContainer = styled.div`
    height: 40px;
    background-color: #214761;
    border-radius: 10px 10px 0 0;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center
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

    &:hover {
        cursor: pointer
    }
`

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 200px auto;
    height: 80%;
`

const LeftDiv = styled.div`
    grid-column: 1 / 2;
    background-color: #b5d3e7;
`

const RightDiv = styled.div`
    grid-column: 2 / -1;
`

const Tab = styled.div`
    background-color: #b5d3e7;
    padding: 20px 0 0 20px;
    /* padding-bottom: 0 */
`

const TabContent = styled.p`
    font-size: 12pt;
    clear: both;
    color: ${props => props.selected && '#cca74c'};

    &:hover {
        cursor: pointer
    }
`

const Apply = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    border: none;
    background-color: #214761;
    color: whitesmoke;
    padding: 5px;
    border-radius: 4px
`