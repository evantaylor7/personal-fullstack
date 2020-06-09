import React from 'react'
import styled from 'styled-components'

const PostModal = () => {
    const handlePostSubmit = e => {
        const {name} = e.target
        console.log(`use the ${name}`)
    }

    return(
        <Container>
            <ContentContainer>
                <LeftDiv>
                    Set Cover image
                    <hr/>
                    Add Image <br/>
                    Italicize and stuff
                </LeftDiv>
                <RightDiv>
                    This is the post modal whatsup
                </RightDiv>
            </ContentContainer>
            <SubmitContainer>
                <Submit draft name='draft' onClick={handlePostSubmit}>Save Draft</Submit>
                <Submit name='submit' onClick={handlePostSubmit}>Publish</Submit>
            </SubmitContainer>
        </Container>
    )
}

export default PostModal

const Container = styled.div`
    height: calc(100% - 40px);
`

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 160px auto;
    position: relative;
    height: 100%;
    overflow: auto;
`

const LeftDiv = styled.div`
    grid-column: 1 / 2;
    background-color: #b5d3e7;
    border-top: solid 1px whitesmoke;
`

const RightDiv = styled.div`
    grid-column: 2 / -1;
    /* overflow: auto; */
    /* padding: 20px; */
    /* padding-top: 10px; */
`

const SubmitContainer = styled.div`
    position: absolute;
    height: 40px;
    width: 100%;
    background-color: white;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0 0 10px 10px;
`

const Submit = styled.button`
    float: right;
    margin-right: ${props => props.draft ? '4px' : '20px'};
    border: ${props => props.draft ? 'solid 1px #214761' : 'none'};
    background-color: ${props => props.draft ? 'whitesmoke' : '#214761'};
    color: ${props => props.draft ? '#1d1d1d' : 'whitesmoke'};
    padding: 5px;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
    }
`