import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Home = props => {
    // const {toggleNav} = props

    // const [nav, setNav] = useState(false)

    // useEffect(() => {
    //     toggleNav()
    //     nav && toggleNav()
    // }, [nav])

    // useLayoutEffect(() => {

    // })

    // const handleScroll = () => {
    //     console.log(window.pageYOffset)
    //     if(window.pageYOffset >= 400){
    //         console.log('set')
    //         console.log(nav)
    //         setNav(true)
    //     }
    // }

    // window.addEventListener('scroll', handleScroll)
    
    return (
        <HomePage>
            <LandingContainer>
                <TitleContainer>
                    <Title>Blogtopia</Title>
                    <Subtitle>A Blog Publishing Website</Subtitle>
                </TitleContainer>
            </LandingContainer>
            <SecondSection>
                <Content>Share with the world</Content>
                    <SignupLink to='/auth'>
                        Get Started
                    </SignupLink>
            </SecondSection>
        </HomePage>
    )
}

export default Home

const HomePage = styled.div`
    padding-top: 40px;
    font-weight: 300;
`

const LandingContainer = styled.div`
    height: calc(100vh - 40px);
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    background-image: url('https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80');
    background-position: center;
    background-size: cover;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    margin-left: 40px;
    width: 785px;
`

const Title = styled.p`
    font-size: 200px;
    font-weight: 250;
    /* color: #3c3c3c; */
    color: white;
`

const Subtitle = styled.p`
    font-size: 40px;
    font-style: italic;
    font-weight: 400;
    /* color: #3c3c3c; */
    color: white;
`

const SecondSection = styled.div`
    margin: 30px;
    font-size: 26px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Content = styled.p``

const SignupLink = styled(Link)`
    margin-top: 10px;
    font-size: 22px;
    text-decoration: none;
    color: whitesmoke;
    padding: 10px;
    background-color: #214761;
    border-radius: 30px;
`