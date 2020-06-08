import React from 'react'
import styled from 'styled-components'

const Sidebar = props => {
    const {blog, blog: {settings}, updateBlog} = props

    const changeSettings = e => {
        const {name} = e.target
        const newSettings = {
            ...settings,
            [name]: !settings[name]
        }
        updateBlog({settings: newSettings})
    }

    const changeStyleSetting = input => {
        const newSettings = {
            ...settings,
            titleAbove: input
        }
        updateBlog({settings: newSettings})
    }
    
    return(
        <Container>
            <p>Blog Elements</p>
            <SidebarButton onClick={changeSettings} name='subtitle' active={settings?.subtitle}>
                {settings?.subtitle ? 'Remove Subtitle' : 'Add Subtitle'}
            </SidebarButton>
            <SidebarButton onClick={changeSettings} name='description' active={settings?.description}>
                {settings?.description ? 'Remove Description' : 'Add Description'}
            </SidebarButton>
            <SidebarButton onClick={changeSettings} name='img' active={settings?.img}>
                {settings?.img ? 'Remove Image' : 'Add Image'}
            </SidebarButton>
            <TitleStyleHeader disabled={!settings?.img}>Title Placement</TitleStyleHeader>
            <div>
                <SidebarButton 
                    select 
                    active={settings?.titleAbove} 
                    onClick={() => changeStyleSetting(true)}
                    disabled={!settings?.img}
                >
                    Above
                </SidebarButton>
                <SidebarButton 
                    select 
                    active={!settings?.titleAbove} 
                    onClick={() => changeStyleSetting(false)}
                    disabled={!settings?.img}
                >
                    Overlay
                </SidebarButton>
            </div>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    width: 200px;
    height: 80vh;
    position: fixed;
    margin: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid lightgrey; */
    border-radius: 4px;
    box-shadow: 2px 2px 3px #a2a2a2;
`

const TitleStyleHeader = styled.p`
    color: ${props => props.disabled && 'darkgrey'};
`

const SidebarButton = styled.button`
    margin: 4px;
    padding: 2px;
    width: ${props => props.select ? '71px' : '150px'};
    border-radius: 10px;
    border: ${props => props.disabled ? '1px solid darkgrey' : '1px solid black'};
    outline: none;
    background-color: ${props => props.active && !props.disabled ? '#214761' : 'white'};
    color: ${props => props.active && !props.disabled && 'white'};

    &:hover {
        cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
    }
`