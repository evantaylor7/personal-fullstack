import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../../../context/UserProvider'

const Unsplash = props => {
    const {handleImgSelect, collection} = props
    const {unsplash, getPhotos, searchPhotos} = useContext(UserContext)
    console.log(unsplash)
    const [input, setInput] = useState('')
    const [imgSelector, setImgSelector] = useState('')

    useEffect(() => {
        getPhotos()
    }, [])

    const handleChange = e => {
        const {value} = e.target
        setInput(value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        searchPhotos(input)
    }
    
    const imgList = unsplash.map(photo => (
        <Img 
            key={photo.id} 
            selected={imgSelector === photo.id}
            src={photo.urls.small} 
            onClick={() => {
                handleImgSelect(photo.urls[
                    collection?.name === 'post-preview' ? 
                        'regular'
                    : 
                        photo.width * photo.height > 30000000 ? 
                            'regular' 
                        : 
                            'raw'
                ])
                setImgSelector(photo.id)
            }}
        />
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
            <ImgListContainer>
                {imgList}
            </ImgListContainer>
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

const ImgListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    justify-content: space-evenly;
`

const Img = styled.img`
    height: 150px;
    margin: 5px;
    outline: ${props => props.selected && '6px solid #214761'};
    
    &:hover {
        cursor: pointer;
    }
`