import React from 'react'
import styled from 'styled-components'

const Sidebar = props => {
    const {blog, blog: {settings}, updateBlog} = props

    const changeSettings = (e) => {
        const {name} = e.target
        const newSettings = {
            ...settings,
            [name]: !settings[name]
        }
        updateBlog({settings: newSettings})
    }
    
    return(
        <Container>
            Customize Title / Heading
            <SidebarButton 
                onClick={changeSettings}
                name='subtitle'
            >
                {settings?.subtitle ? 'Remove Subtitle' : 'Add Subtitle'}
            </SidebarButton>
            <SidebarButton 
                onClick={changeSettings}
                name='description'
            >
                {settings?.description ? 'Remove Description' : 'Add Description'}
            </SidebarButton>
            <SidebarButton 
                onClick={changeSettings}
                name='img'
            >
                {settings?.img ? 'Remove Image' : 'Add Image'}
            </SidebarButton>
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
    display: flex;
    flex-direction: column;
    align-items: center
`

const SidebarButton = styled.button`
    margin: 4px;
    padding: 2px;
    width: 150px;
    border-radius: 10px;
    border: 1px solid black;
    outline: none;

    &:hover {
        cursor: pointer
    }
`