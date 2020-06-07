import React, {useState} from 'react'
import styled from 'styled-components'

const ImageUpload = props => {
    const {handleImgChange, img} = props
    
    const handleChange = e => {
        const imgFile = e.target.files[0]
        handleImgChange({
            file: imgFile,
            url: URL.createObjectURL(imgFile),
            loaded: 0
        })
    }

    return(
        <Container>
            This is the image uploader
            <UploadInput 
                type='file' 
                name='file' 
                accept='image/*'
                onChange={handleChange}
            />
            Preview:
            {img?.url && <ImgPreview src={img.url}/>}
        </Container>
    )
}

export default ImageUpload

const Container = styled.div``

const UploadInput = styled.input``

const ImgPreview = styled.img`
    max-width: 50%
`