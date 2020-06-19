import React from 'react'
import styled from 'styled-components'

const Comment = props => {
    console.log(props)
    const {postedBy, date, content} = props

    return (
        <Container>
            <NameDate>
                <Name><b>{postedBy}</b></Name>
                <Date>posted on {date}</Date>
            </NameDate>
            <ContentContainer>
                <Content>{content}</Content>
            </ContentContainer>
        </Container>
    )
}

export default Comment

const Container = styled.div`
    margin-top: 20px;
    max-width: 500px;
`

const NameDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #b5d3e7;
`

const Name = styled.p``

const Date = styled.p`
    font-size: 12px;
    margin-left: 4px;
`

const ContentContainer = styled.div``

const Content = styled.p``