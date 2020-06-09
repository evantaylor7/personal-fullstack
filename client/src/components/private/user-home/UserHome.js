import React, {useContext, useEffect, useState} from 'react'
import Sidebar from './Sidebar.js'
import Endpoint from './Endpoint.js'
import Titles from '../titles/Titles.js'
import Modal from '../modal/Modal.js'
import PostList from '../../posts/PostList.js'
import AboutForm from '../about/AboutForm.js'
import {UserContext} from '../../../context/UserProvider'
import styled from 'styled-components'

const UserHome = () => {
    const {
        blog,
        getUserBlog, 
        updateBlog,
    } = useContext(UserContext)

    const [toggleModal, setToggleModal] = useState('')

    useEffect(() => {
        getUserBlog()
    }, [])

    const handleModalClose = () => {
        setToggleModal('')
    }

    const colorArray = ['rgb(237, 101, 90)', 'rgb(225, 192, 76)', 'rgb(114, 190, 71)']
    const windowDots = colorArray.map(dot => <Dot key={dot} color={dot}/>)

    return(
        <Container>
            <Sidebar blog={blog} updateBlog={updateBlog}/>
            <BlogContainer>
                <Url>
                    <DotContainer>
                        {windowDots}
                    </DotContainer>
                    <Endpoint/>
                </Url>
                <Hr/>
                <TitleContainer>
                    <Titles 
                        title={blog.title} 
                        subtitle={blog.subtitle} 
                        description={blog.description}
                        updateBlog={updateBlog} 
                        settings={blog.settings}
                    />
                    <MainImg setting={blog?.settings?.img} imgUrl={blog?.img} parallax={blog?.settings?.parallax}>
                        <Button onClick={() => setToggleModal('img')}>Choose Image</Button>
                    </MainImg>
                    {
                    toggleModal === 'img' && 
                        <Modal 
                            toggle={toggleModal} 
                            close={handleModalClose}
                        />
                    }
                </TitleContainer>
                {!blog?.settings?.img && <Hr mid/>}
                <ContentContainer profile={blog?.settings?.profile ? 'true' : 'thisseemssilly'}>
                    <PostContainer>
                        <h2>Your Posts</h2>
                        <Button onClick={() => setToggleModal('post')}>Make New Post</Button>
                        {
                        toggleModal === 'post' &&
                            <Modal
                                toggle={toggleModal}
                                close={handleModalClose}
                            />
                        }
                        <PostList/>
                    </PostContainer>
                    {blog?.settings?.profile && <AboutForm/>}
                </ContentContainer>
                <Button primary>Publish</Button>
            </BlogContainer>
        </Container>
    )
}

export default UserHome

const Container = styled.div`
    display: grid;
    grid-template-columns: 220px auto;
    padding-top: 40px;
    background-color: whitesmoke;
`

const BlogContainer = styled.div`
    grid-column: 2 / -1;
    border: solid lightgrey 1px;
    border-radius: 6px;
    margin: 10px;
    margin-left: 0;
    background-color: white;
`

const Url = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2px;
`

const Hr = styled.hr`
    margin-top: 2px;
    ${props => props.mid && 'width: 96%; margin: auto'}
`

const DotContainer = styled.div`
    display: flex;
    margin: 10px;
`

const Dot = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 10px;
    margin-right: 5px;
    background-color: ${props => props.color};
`

const TitleContainer = styled.div`
    position: relative;
`

const MainImg = styled.div`
    display: ${props => props.setting ? 'block' : 'none'};
    height: 500px;
    margin: 10px 0;
    background-image: url(${props => props.imgUrl ? props.imgUrl : 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${props => props.parallax ? '110px center' : 'center'};
    background-attachment: ${props => props.parallax && 'fixed'};
`

const Button = styled.button`
    height: ${props => props.primary ? '40px' : '30px'};
    padding: 5px;
    border-radius: 4px;
    border: solid 1px black;
    background-color: #214761;
    color: whitesmoke;
    cursor: pointer;
    ${props => props.primary && 'margin-top: 40px; font-size: 18pt'};
`

const ContentContainer = styled.div`
    display: ${props => props.profile === 'true' ? 'grid' : 'block'};
    text-align: center;
    grid-template-columns: auto 400px;
    padding-top: 20px;
`

const PostContainer = styled.div`
    grid-column: 1 / 2;
    justify-self: center;
`