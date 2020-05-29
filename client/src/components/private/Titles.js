import React, {useState} from 'react'
import styled from 'styled-components'

const Titles = props => {
    const {title, subtitle, updateBlog} = props
    const prevInputs = {
        title: title,
        subtitle: subtitle
    }
    const [formToggle, setFormToggle] = useState({title: false, subtitle: false})
    const [inputs, setInputs] = useState(prevInputs)
    console.log(inputs)

    const handleToggle = type => {
        setFormToggle(prevFormToggle => ({
            ...prevFormToggle,
            [type]: !prevFormToggle.type
        }))
    }

    const handleChange = e => {
        const {name, value} = e.target
        console.log(name)
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
            [name]: !prevFormToggle.name
        }))
    }

    return(
        <Container>
            <Title onClick={() => handleToggle('title')}>
                {
                !formToggle.title && title ? 
                    <h1>{title}</h1>
                : 
                    <TitleForm onSubmit={handleSubmit}>
                        <TitleInput 
                            type='text'
                            name='title'
                            value={inputs.title} 
                            handleChange={handleChange} 
                            input={inputs.title}
                            autoFocus
                            // placeholder='Add Blog Title'
                        />
                        <button>Save</button>
                    </TitleForm>
                }
            </Title>
            <Subtitle onClick={() => handleToggle('subtitle')}>
                {
                !formToggle.subtitle && subtitle ? 
                    <h3>{subtitle}</h3>
                : 
                    <SubtitleForm onSubmit={handleSubmit}>
                        <SubtitleInput 
                            type='text' 
                            name='subtitle'
                            value={inputs.subtitle}
                            handleChange={handleChange} 
                            input={inputs.subtitle}
                            autoFocus
                            // placeholder='Add Blog Subtitle'
                        /> 
                        <button>Save</button>
                    </SubtitleForm>
                }
            </Subtitle>
        </Container>
    )
}

export default Titles

const Container = styled.div`
    grid-column: 2 / -1;
    margin: 10px;
`

const Title = styled.div`

`

const TitleForm = styled.form`

`

const TitleInput = styled.input`

`

const Subtitle = styled.div`

`

const SubtitleForm = styled.form`

`

const SubtitleInput = styled.input`

`