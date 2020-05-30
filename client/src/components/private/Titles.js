import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const initInputs = {
    title: '',
    subtitle: ''
}

const Titles = props => {
    const {title, subtitle, description, updateBlog, settings} = props

    const [formToggle, setFormToggle] = useState({title: false, subtitle: false, description: false})
    const [inputs, setInputs] = useState(initInputs)
    
    useEffect(() => { 
        setInputs({title: title, subtitle: subtitle, description: description})
    }, [title, subtitle, description])

    const handleToggle = type => {
        setFormToggle(prevFormToggle => ({
            ...prevFormToggle,
            [type]: true
        }))
    }

    const handleChange = e => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        const {name} = e.target
        updateBlog(inputs)
        setFormToggle(prevFormToggle => ({
            ...prevFormToggle,
            [name]: false
        }))
    }

    return(
        <Container>
            <TitleContainer onClick={() => handleToggle('title')}>
                {
                !formToggle.title && title ? 
                    <Title>{title}</Title>
                : 
                    <TitleForm onSubmit={handleSubmit} name='title'>
                        <TitleInput 
                            type='text'
                            name='title'
                            value={inputs.title} 
                            onChange={handleChange} 
                            autoFocus
                            onBlur={handleSubmit}
                            placeholder={title ? '' : 'Add Blog Title'}
                        />
                    </TitleForm>
                }
            </TitleContainer>
            <Subtitle onClick={() => handleToggle('subtitle')} setting={settings?.subtitle}>
                {
                !formToggle.subtitle && subtitle ? 
                    <h3>{subtitle}</h3>
                : 
                    <SubtitleForm onSubmit={handleSubmit} name='subtitle'>
                        <SubtitleInput 
                            type='text' 
                            name='subtitle'
                            value={inputs.subtitle}
                            onChange={handleChange} 
                            autoFocus
                            onBlur={handleSubmit}
                            placeholder={subtitle ? '' : 'Add a Subtitle'}
                        /> 
                    </SubtitleForm>
                }
            </Subtitle>
            <Description onClick={() => handleToggle('description')} setting={settings?.description}>
                {
                !formToggle.description && description ? 
                    <p>{description}</p>
                : 
                    <DescriptionForm onSubmit={handleSubmit} name='description'>
                        <DescriptionInput 
                            type='text' 
                            name='description'
                            value={inputs.description}
                            onChange={handleChange} 
                            autoFocus
                            onBlur={handleSubmit}
                            placeholder={description ? '' : 'Add a description of your blog'}
                        /> 
                    </DescriptionForm>
                }
            </Description>
        </Container>
    )
}

export default Titles

const Container = styled.div`
    grid-column: 2 / -1;
    margin: 10px;
    text-align: center
`

const TitleContainer = styled.div`

`

const Title = styled.h1`
    &:hover {
        border: solid 1px black;
        border-radius: 10px;
        background-color: lightblue
    }
`

const TitleForm = styled.form`

`

const TitleInput = styled.input`

`

const Subtitle = styled.div`
    display: ${props => props.setting ? 'block' : 'none'}
`

const SubtitleForm = styled.form`

`

const SubtitleInput = styled.input`

`

const Description = styled.div`
    display: ${props => props.setting ? 'block' : 'none'}
`

const DescriptionForm = styled.form`

`

const DescriptionInput = styled.textarea`

`