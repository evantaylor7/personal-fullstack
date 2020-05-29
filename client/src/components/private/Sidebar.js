import React from 'react'
import styled from 'styled-components'

const Sidebar = () => {
    return(
        <Container>
            This is the sidebar
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    width: 200px;
    height: 80vh;
    position: fixed;
    margin: 10px;
    background-color: whitesmoke;
`