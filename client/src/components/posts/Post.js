import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
// import DOMPurify from 'dompurify'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'
import PostDetail from '../public/PostDetail'

const Post = props => {
    console.log(props)
    const {_id, draft, title, authorName, date, content, img, openModal, readonly} = props
    const {getPost, deletePost} = useContext(UserContext)

    const [toggleModal, setToggleModal] = useState(false)
    console.log(toggleModal)
    const handleOpenPostEditor = e => {
        getPost(_id)
        openModal(e)
    }

    const handleModalToggle = () => {
        setToggleModal(prevToggle => !prevToggle)
    }

    // const cleanCode = DOMPurify.sanitize(content)
    // const snippetStart = cleanCode.search('<p>')
    // const textEnd = cleanCode.search('</p>')
    // const snippetEnd = textEnd - snippetStart > 200 ? 200 : textEnd
    // const blogSnippet = {__html: `${cleanCode.slice(snippetStart, snippetEnd)} ${cleanCode?.length > 190 ? ' ...' : ''}`} 

    return (
        <>
            {!readonly ?
                <Container>
                    <Title>{title}</Title>
                    <Date>{date}</Date>
                    {/* <div dangerouslySetInnerHTML={blogSnippet}/> */}
                    <ButtonsContainer>
                        <Button onClick={handleOpenPostEditor} name='post'>Edit</Button>
                        <Button onClick={handleModalToggle}>Preview</Button>
                        <Button delete onClick={() => deletePost(_id)}>Delete</Button>
                    </ButtonsContainer>
                    {toggleModal && 
                        <PreviewModal onClick={handleModalToggle}>
                            <PreviewHeader>
                                <Close>X</Close>
                            </PreviewHeader>
                            <PostDetail postId={_id} preview={true} toggleModal={handleModalToggle}/>
                        </PreviewModal>
                    }
                </Container>
            :
                <PostLink to={`/p/${_id}`}>
                    <Container>
                        <Title>{title}</Title>
                        <Date>{date}</Date>
                    </Container>
                </PostLink>
            }
        </>
    )
}

export default Post

const Container = styled.div`
    border: solid 1px #a1a1a1;
    border-radius: 4px;
    padding: 10px;
    margin: 0 auto 20px auto;
    transition: box-shadow .4s;
    /* position: relative; */

    &:hover {
        box-shadow: 2px 2px 5px #606060
    }
`

const Title = styled.h2``

const Date = styled.p``

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: 10px;
`

const Button = styled.button`
    margin-right: 4px;
    padding: 2px 4px;
    background-color: white;
    border: solid 1px ${props => props.delete ? 'red' : '#214761'};
    border-radius: 4px;
    color: ${props => props.delete ? 'red' : '#214761'};
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.delete ? 'red' : '#214761'};
        color: whitesmoke;
    }
`

const PreviewModal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    z-index: 2;
`

const PreviewHeader = styled.div`
    background-color: white;
    position: absolute;
    width: 944px;
    height: 44px;
    left: 50%;
    margin-left: -472px;
    top: 2vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media (max-width: 960px){
        width: 96%;
        margin-left: 0;
        left: 2%
    }
`

const Close = styled.p`
    font-size: 26px;
    padding: 2px 8px;
    margin-right: 6px;
    border-radius: 4px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
`

const PostLink = styled(Link)`
    text-decoration: none;
    color: #1d1d1d
`