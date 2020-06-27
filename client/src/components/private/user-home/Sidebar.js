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
    
    return (
        <Container>
            <LeftColumn>
                <Header>Title Elements</Header>
                <SidebarButton onClick={changeSettings} name='subtitle' active={settings?.subtitle}>
                    {settings?.subtitle ? 'Remove Subtitle' : 'Add Subtitle'}
                </SidebarButton>
                <SidebarButton onClick={changeSettings} name='description' active={settings?.description}>
                    {settings?.description ? 'Remove Description' : 'Add Description'}
                </SidebarButton>
                <SidebarButton onClick={changeSettings} name='img' active={settings?.img}>
                    {settings?.img ? 'Remove Image' : 'Add Image'}
                </SidebarButton>
                <Header disabled={!settings?.img}>Title Placement</Header>
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
            </LeftColumn>
            <RightColumn>
                <Header disabled={!settings?.img}>Image Style</Header>
                <SidebarButton 
                    onClick={changeSettings} 
                    name='parallax' 
                    active={settings?.parallax} 
                    disabled={!settings?.img}
                >
                    {settings?.parallax ? 'Remove Parallax' : 'Add Parallax'}
                </SidebarButton>
                {
                settings?.parallax && settings?.img && 
                    <ParallaxText>scroll to see effect <Arrow>&#x279C;</Arrow></ParallaxText>
                }
                <Header>Author Profile</Header>
                <SidebarButton 
                    onClick={changeSettings}
                    name='profile'
                    active={settings?.profile}
                >
                    {settings?.profile ? 'Remove Profile' : 'Add Profile'}
                </SidebarButton>
            </RightColumn>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    width: 200px;
    height: 80vh;
    position: fixed;
    margin: 10px;
    padding-top: 6px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    box-shadow: 2px 2px 3px #a2a2a2;
    overflow: auto;

    @media (max-width: 750px){
        position: fixed;
        display: grid;
        text-align: center;
        grid-template-columns: repeat(2, 1fr);
        z-index: 2;
        margin: 0;
        bottom: 0;
        width: 100%;
        height: 160px;
        padding-top: 0;
        border-top: solid 2px darkgrey;
        background-color: whitesmoke;
        align-items: start;
    }
`

const LeftColumn = styled.div`
    text-align: center;

    @media (max-width: 750px){
        grid-column: 1 / 2;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const Header = styled.p`
    color: ${props => props.disabled && 'darkgrey'};
    margin-top: 6px;
`

const SidebarButton = styled.button`
    margin: 2px;
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

const RightColumn = styled.div`
    text-align: center;

    @media (max-width: 750px){
        grid-column: 2 / 3;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const ParallaxText = styled.p`
    font-style: italic;
    font-size: 11pt;
`

const Arrow = styled.span`
    @media (max-width: 750px){
        display: none
    }
`