import React, {useState} from 'react'
import styled from 'styled-components'

const ImageUpload = props => {
    const {handleImgChange, img} = props
    const [error, setError] = useState(null)
    
    const handleChange = e => {
        const imgFile = e.target.files[0]
        if(!imgFile){
            return
        } else if(imgFile.size > 10000000){
            setError('Image file is too large. Limit: 10mb.')
        } else {
            setError(null)
            imgFile && handleImgChange({
                file: imgFile,
                url: URL.createObjectURL(imgFile),
                name: 'upload'
                // loaded: 0
                // ^ may be needed ***
            })
        }
    }

    return (
        <Container>
            <Label>
                {img ? 'Choose Different Image' : 'Choose Image'}
                <UploadInput 
                    type='file' 
                    accept='image/*'
                    onChange={handleChange}
                />
            </Label>
            {error !== '' && <ErrorMessage>{error}</ErrorMessage>}
            {img?.url && <ImgPreview src={img.url}/>}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Label = styled.label`
    margin: 10px auto;
    background-color: white;
    color: #214761;
    padding: 8px 14px;
    font-size: 14px;
    border: solid 1px #214761;
    border-radius: 4px;
    transition: .4s;

    &:hover {
        cursor: pointer;
        background-color: #214761;
        color: whitesmoke;
    }
`

const UploadInput = styled.input`
    display: none;
`

const ErrorMessage = styled.p`
    color: #c40000;
`

const ImgPreview = styled.img`
    max-width: 90%;
    max-height: 60vh;
`

export default ImageUpload