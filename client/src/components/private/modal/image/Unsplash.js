import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../../../context/UserProvider'

const Unsplash = props => {
    const {handleImgSelect, collection} = props
    const {unsplash, getPhotos, searchPhotos, unsplashCleanup} = useContext(UserContext)
    console.log(unsplash)
    const [input, setInput] = useState('')
    const [imgSelector, setImgSelector] = useState('')
    const [imgPreview, setImgPreview] = useState('')

    useEffect(() => {
        getPhotos(unsplash?.page + 1)

        return function cleanup(){
            unsplashCleanup()
        }
    }, [])

    const loadMore = () => {
        input !== '' ? searchPhotos(unsplash.page + 1, input) : getPhotos(unsplash?.page + 1)
    }

    const handleChange = e => {
        const {value} = e.target
        setInput(value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        searchPhotos(1, input, 'new')
    }
    console.log(unsplash.photos)
    const imgList = unsplash?.photos.map((photo, i) => (
        <ImgContainer key={i}>
            <Img src={photo.urls.small} selected={imgSelector === photo.id}/>
            {
            imgPreview !== '' && 
                <ImgPreviewModal onClick={() => setImgPreview('')}>
                    <ImgPreviewContainer>
                        <CancelButton onClick={() => setImgPreview('')}>&times;</CancelButton>
                        <ImgPreview src={imgPreview}/>
                    </ImgPreviewContainer>
                </ImgPreviewModal>
            }
            <Overlay 
                onClick={() => {
                    handleImgSelect({name: 'unsplash', photoId: photo.id, src: photo.urls[
                        collection?.name === 'post-preview' ? 
                            'regular'
                        : 
                            photo.width * photo.height > 30000000 ? 
                                'regular' 
                            : 
                                'raw'
                    ]})
                    setImgSelector(photo.id)
                }}
            >
                <PreviewContainer onClick={() => setImgPreview(photo.urls.regular)}>
                    <Preview>&#8691;</Preview>
                </PreviewContainer>
                <Attribute>By <Name target='_blank' href={photo.user.links.html}>{photo.user.name}</Name></Attribute>
            </Overlay>
        </ImgContainer>
    ))

    return (
        <Container>
            <SearchForm onSubmit={handleSubmit}>
                <Input 
                    placeholder='Search Unsplash for Images. i.e. "nature", "travel", "italian food"'
                    value={input}
                    onChange={handleChange}
                />
            </SearchForm>
            <UnsplashTextContainer>
                <UnsplashText>Photos provided by </UnsplashText>
                <UnsplashLink href='https://unsplash.com/' target='_blank'>Unsplash</UnsplashLink>
            </UnsplashTextContainer>
            <ImgListContainer>
                {imgList}
            </ImgListContainer>
            <Button onClick={loadMore}>Load More</Button>
        </Container>
    )
}

export default Unsplash

const Container = styled.div``
const SearchForm = styled.form``

const Input = styled.input`
    width: 80%;
    outline: none;
    margin: 0 0 5px 5px;
    padding: 10px;
    border-radius: 4px;
    border: solid 1px black;

    @media (max-width: 7300px){
        width: calc(100% - 10px);
        margin: 0 5px 5px 5px
    }
`

const UnsplashTextContainer = styled.div`
    display: flex;
    margin: 10px 0 16px;
    justify-content: center;
`

const UnsplashText = styled.p`
    color: #4b4b4b;
`

const UnsplashLink = styled.a`
    margin-left: 6px;
    color: #4b4b4b;
`

const ImgListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    justify-content: space-evenly;
`

const ImgContainer = styled.div`
    position: relative;
`

const Img = styled.img`
    height: 150px;
    margin: 5px;
    outline: ${props => props.selected && '6px solid #214761'};
`

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, .2);
    font-size: 12px;
    position: absolute;
    height: calc(100% - 13px);
    width: calc(100% - 10px);
    top: 5px;
    right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    opacity: 0;
    transition: .4s;

    ${ImgContainer}:hover & {
        opacity: 1
    }
`

const PreviewContainer = styled.div`
    height: 30px;
    width: 30px;
    margin: 6px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, .3);
    align-self: flex-end;
    transition: .4s;

    &:hover {
        background-color: rgba(0, 0, 0, .4)
    }
`

const Preview = styled.p`
    margin-left: 6px;
    margin-top: -6px;
    font-size: 34px;
    color: whitesmoke;
    transform: rotate(45deg);
`

const ImgPreviewModal = styled.div`
    position: fixed;
    z-index: 5;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`

const ImgPreviewContainer = styled.div`
    width: 90%;
    height: 90%;
    margin: auto;
    margin-top: 5vh;
    background-color: black;
    /* border-radius: 10px; */
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 500px){
        width: 100%;
        height: 98%;
        margin-top: 1vh;
    }
`

const CancelButton = styled.button`
    border: none;
    color: white;
    outline: none;
    position: absolute;
    background-color: rgba(0, 0, 0, .4);
    top: 0;
    right: 0;
    margin: 10px;
    font-size: 30px;
    padding: 0 10px 4px;
    border-radius: 20px;
    transition: .4s;
    z-index: 6;
    transition: .2s;

    &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, .6)
    }
`

const ImgPreview = styled.img`
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
`

const Attribute = styled.p`
    color: white;
    text-align: center;
    background-color: rgba(0, 0, 0, .3);
    width: 100%;
    padding: 4px 0;
`

const Name = styled.a`
    color: white;
`

const Button = styled.button`
    margin-top: 40px;
    width: 84px;
    margin-left: calc(50% - 42px);
    background-color: white;
    color: #214761;
    padding: 4px 8px;
    border: solid 1px #214761;
    border-radius: 4px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
`