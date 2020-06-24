import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styled, {keyframes} from 'styled-components'

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
                <Content>Share your story with the world</Content>
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

    @media (max-width: 860px){
        width: calc(100% - 40px);
    }
`

const fadeIn = keyframes`
    from {opacity: 0}
    to {opacity: 1}
`

const Title = styled.p`
    opacity: 0;
    font-size: 200px;
    font-weight: 250;
    /* color: #3c3c3c; */
    color: white;
    animation: ${fadeIn} 2s forwards;

    @media (max-width: 860px){
        font-size: 160px;
    }
    @media (max-width: 690px){
        font-size: 140px;
    }
    @media (max-width: 600px){
        font-size: 120px;
    }
    @media (max-width: 530px){
        font-size: 100px;
    }
    @media (max-width: 440px){
        font-size: 80px;
    }
    @media (max-width: 370px){
        font-size: 64px;
    }
`

const Subtitle = styled.p`
    opacity: 0;
    font-size: 40px;
    font-style: italic;
    font-weight: 400;
    /* color: #3c3c3c; */
    color: white;
    animation: ${fadeIn} 2s forwards .5s;

    @media (max-width: 860px){
        font-size: 36px;
    }
    @media (max-width: 600px){
        font-size: 30px;
    }
    @media (max-width: 530px){
        font-size: 26px;
    }
    @media (max-width: 440px){
        font-size: 24px;
    }
    @media (max-width: 370px){
        font-size: 20px;
    }
`

const SecondSection = styled.div`
    margin: 30px 0;
    font-size: 26px;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (max-width: 440px){
        font-size: 22px;
        position: absolute;
        width: 100%;
        text-align: center;
        margin: -100px 0 0 0;
        color: white;
    }
    @media (max-width: 350px){
        font-size: 18px;
    }
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

    @media (max-width: 440px){
        font-size: 20px;
    }
    @media (max-width: 350px){
        font-size: 18px;
    }
`