import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
// import DOMPurify from 'dompurify'
import ExternalModal from '../private/modal/Modal.js'
import PostDetail from '../public/PostDetail'
import styled from 'styled-components'
import {UserContext} from '../../context/UserProvider'

const Post = props => {
    console.log(props)
    const {_id, draft, title, authorName, date, content, previewImg, openModal, readonly} = props
    const {getPost, deletePost, editPost} = useContext(UserContext)

    const [imgModal, setImgModal] = useState(false)
    const [previewModal, setPreviewModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    console.log(previewModal)

    const handleToggleImgModal = () => {
        setImgModal(prevImgModal => !prevImgModal)
    }

    const handleRemoveImg = () => {
        editPost(_id, {previewImg: ''})
    }

    const handleOpenPostEditor = e => {
        getPost(_id)
        openModal(e)
    }

    const handlePreview = () => {
        setPreviewModal(prevToggle => !prevToggle)
    }

    const handleDelete = () => {
        deletePost(_id)
        setDeleteModal(false)
    }

    // <Button delete onClick={() => deletePost(_id)}>Delete</Button>

    // const cleanCode = DOMPurify.sanitize(content)
    // const snippetStart = cleanCode.search('<p>')
    // const textEnd = cleanCode.search('</p>')
    // const snippetEnd = textEnd - snippetStart > 200 ? 200 : textEnd
    // const blogSnippet = {__html: `${cleanCode.slice(snippetStart, snippetEnd)} ${cleanCode?.length > 190 ? ' ...' : ''}`} 

    return (
        <>
            {!readonly ?
                <Container>
                    <PostSnippet>
                        <PreviewImg src={previewImg}>
                            <Button onClick={handleToggleImgModal} name='img'>
                                {previewImg ? 'Change Image' : 'Add Preview Image'}
                            </Button>
                            {previewImg && <Button onClick={handleRemoveImg}>Remove</Button>}
                            {
                            imgModal && 
                                <ExternalModal 
                                    close={handleToggleImgModal} 
                                    name='img'
                                    collection={{name: 'post-preview', postId: _id}}
                                />
                            }
                        </PreviewImg>
                        <PostInfo>
                            <Title>{title}</Title>
                            <Date>{date}</Date>
                            {/* <div dangerouslySetInnerHTML={blogSnippet}/> */}
                        </PostInfo>
                    </PostSnippet>
                    <ButtonsContainer>
                        <Button onClick={handleOpenPostEditor} name='post'>Edit</Button>
                        <Button onClick={handlePreview}>Preview</Button>
                        <Button delete onClick={() => setDeleteModal(true)}>Delete</Button>
                    </ButtonsContainer>
                    {
                    previewModal && 
                        <Modal onClick={handlePreview}>
                            <PreviewHeader>
                                <Close>&times;</Close>
                            </PreviewHeader>
                            <PostDetail postId={_id} preview={true} toggleModal={handlePreview}/>
                        </Modal>
                    }
                    {
                    deleteModal &&
                        <Modal>
                            <DeleteConfirm>
                                <DeleteClose onClick={() => setDeleteModal(false)}>&times;</DeleteClose>
                                <Content>
                                    <DeleteText>
                                        Are you sure you want to delete this {draft ? 'draft' : 'post'}?
                                    </DeleteText>
                                    <DeleteButtons>
                                        <DeleteButton onClick={() => setDeleteModal(false)}>Cancel</DeleteButton>
                                        <DeleteButton confirm onClick={handleDelete}>Confirm</DeleteButton>
                                    </DeleteButtons>
                                </Content>
                            </DeleteConfirm>
                        </Modal>
                    }
                </Container>
            :
                <PostLink to={`/p/${_id}`}>
                    <Container readonly={readonly}>
                        {previewImg && <PreviewImg src={previewImg}></PreviewImg>}
                        <PostInfo>
                            <Title>{title}</Title>
                            <Date>{date}</Date>
                        </PostInfo>
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
    max-width: 700px;
    ${props => props.readonly && 'display: flex'};
    /* position: relative; */

    &:hover {
        box-shadow: 2px 2px 5px #606060
    }
`

const PostSnippet = styled.div`
    display: flex;
`

const PreviewImg = styled.div`
    width: 200px;
    height: 200px;
    background: ${props => props.src ? `url(${props.src})` : 'whitesmoke'};
    ${props => props.src && 
        'background-repeat: no-repeat; background-position: center; background-size: cover'
    };
    display: flex;
    align-items: center;
    justify-content: center;
    /* float: left; */
`

const PostInfo = styled.div`
    margin-left: 10px;
`

const Title = styled.h2``

const Date = styled.p`
    font-size: 14px;
    color: #525252;
`

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: 10px;
    padding-top: 10px;
    justify-content: center;
    border-top: 1px darkgrey solid;
`

const Button = styled.button`
    margin-right: 4px;
    padding: 2px 4px;
    background-color: white;
    border: solid 1px ${props => props.delete ? '#c40000' : '#214761'};
    border-radius: 4px;
    color: ${props => props.delete ? '#c40000' : '#214761'};
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.delete ? '#c40000' : '#214761'};
        color: whitesmoke;
    }
`

const Modal = styled.div`
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
    padding: 0 8px 2px;
    margin-right: 6px;
    border-radius: 16px;
    font-size: 24px;    
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
`

const DeleteConfirm = styled.div`
    width: 500px;
    height: 200px;
    margin: auto;
    margin-top: calc(50vh - 150px);
    background-color: white;
    border-radius: 4px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 550px){
        width: 96%;
    }
`

const DeleteClose = styled.p`
    float: right;
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    border-radius: 16px;
    font-size: 24px;
    padding: 0 8px 2px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
`

const DeleteText = styled.p`
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
`

const DeleteButtons = styled.div``

const DeleteButton = styled.button`
    ${props => props.confirm ? 'margin-left: 10px' : 'margin-right: 10px'};
    padding: 4px 10px;
    background-color: white;
    border: solid 1px ${props => props.confirm ? '#c40000' : '#214761'};
    border-radius: 4px;
    color: ${props => props.confirm ? '#c40000' : '#214761'};
    font-size: 18px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.confirm ? '#c40000' : '#214761'};
        color: whitesmoke;
    }
`

const PostLink = styled(Link)`
    text-decoration: none;
    color: #1d1d1d
`