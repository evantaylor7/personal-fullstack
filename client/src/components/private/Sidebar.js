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
            <SidebarButton onClick={changeSettings} name='subtitle'>
                {settings?.subtitle ? 'Remove Subtitle' : 'Add Subtitle'}
            </SidebarButton>
            <SidebarButton onClick={changeSettings} name='description'>
                {settings?.description ? 'Remove Description' : 'Add Description'}
            </SidebarButton>
            <SidebarButton onClick={changeSettings} name='img'>
                {settings?.img ? 'Remove Image' : 'Add Image'}
            </SidebarButton>
            {
            settings?.img &&
                <>
                    <p>Title Placement</p>
                    <div>
                        <SidebarButton select active={settings?.titleAbove} onClick={() => changeStyleSetting(true)}>
                            Above
                        </SidebarButton>
                        <SidebarButton select active={!settings?.titleAbove} onClick={() => changeStyleSetting(false)}>
                            Overlay
                        </SidebarButton>
                    </div>
                </>
            }
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

const SidebarButton = styled.button`
    margin: 4px;
    padding: 2px;
    width: ${props => props.select ? '71px' : '150px'};
    border-radius: 10px;
    border: 1px solid black;
    outline: none;
    background-color: ${props => props.active ? '#214761' : 'white'};
    color: ${props => props.active && 'white'};

    &:hover {
        cursor: pointer
    }
`