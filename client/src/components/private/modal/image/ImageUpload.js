import React, {useState} from 'react'
import styled from 'styled-components'

const ImageUpload = props => {
    const {handleImgChange, img} = props
    
    const handleChange = e => {
        const imgFile = e.target.files[0]
        imgFile && handleImgChange({
            file: imgFile,
            url: URL.createObjectURL(imgFile),
            loaded: 0
        })
    }

    return(
        <Container>
            <Label>
                {img ? 'Choose Different Image' : 'Choose Image'}
                <UploadInput 
                    type='file' 
                    accept='image/*'
                    onChange={handleChange}
                />
            </Label>
            {img?.url && <ImgPreview src={img.url}/>}
        </Container>
    )
}

export default ImageUpload

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Label = styled.label`
    margin: 10px auto;
    background-color: #214761;
    color: whitesmoke;
    padding: 5px;
    border-radius: 4px;

    &:hover {
        cursor: pointer
    }
`

const UploadInput = styled.input`
    display: none;
`

const ImgPreview = styled.img`
    max-width: 90%;
    max-height: 60vh;
`