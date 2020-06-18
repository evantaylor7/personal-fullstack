import React, {useState, useEffect} from 'react'
import ColorChooser from './ColorChooser.js'
import styled from 'styled-components'

// const initInputs = {
//     title: {
//         content: '',
//         color: '#1d1d1d'
//     },
//     subtitle: {
//         content: '',
//         color: '#1d1d1d'
//     },
//     description: {
//         content: '',
//         color: '#1d1d1d'
//     }
// }

const Titles = props => {
    const {title, subtitle, description, updateBlog, settings} = props

    const [formToggle, setFormToggle] = useState({title: false, subtitle: false, description: false})
    const [inputs, setInputs] = useState({})
    
    useEffect(() => { 
        setInputs({
            title: {content: title?.content, color: title?.color},
            subtitle: {content: subtitle?.content, color: subtitle?.color}, 
            description: {content: description?.content, color: description?.color}
        })
    }, [title, subtitle, description])

    const handleToggle = type => {
        setFormToggle(prevFormToggle => ({
            ...prevFormToggle,
            [type]: true
        }))
    }

    const handleContentChange = e => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: {
                ...prevInputs[name],
                content: value
            }
        }))
    }

    const handleSubmitContent = e => {
        e.preventDefault()
        const {name} = e.target
        updateBlog(inputs)
        setFormToggle(prevFormToggle => ({
            ...prevFormToggle,
            [name]: false
        }))
    }

    return(
        <Container titleAbove={settings?.titleAbove} img={settings?.img}>
            {
            !formToggle.title && title?.content ? 
                <Title>
                    <ColorChooser title={Title} name='title' update={updateBlog} inputs={inputs}/>
                    <TitleContent onClick={() => handleToggle('title')} color={title.color}>
                        {title?.content}
                    </TitleContent>
                </Title>
            : 
                <TitleForm onSubmit={handleSubmitContent} name='title'>
                    <TitleInput 
                        type='text'
                        name='title'
                        value={inputs?.title?.content} 
                        onChange={handleContentChange} 
                        autoFocus
                        onBlur={handleSubmitContent}
                        placeholder={title ? '' : 'Add Blog Title'}
                    />
                </TitleForm>
            }
            <SubtitleContainer setting={settings?.subtitle}>
                {
                !formToggle.subtitle && subtitle?.content ? 
                    <Subtitle>
                        <ColorChooser subtitle={Subtitle} name='subtitle' update={updateBlog} inputs={inputs}/>
                        <SubtitleContent onClick={() => handleToggle('subtitle')} color={subtitle.color}>
                            <i>{subtitle?.content}</i>
                        </SubtitleContent>
                    </Subtitle>
                : 
                    <SubtitleForm onSubmit={handleSubmitContent} name='subtitle'>
                        <SubtitleInput 
                            type='text' 
                            name='subtitle'
                            value={inputs?.subtitle?.content}
                            onChange={handleContentChange} 
                            autoFocus
                            onBlur={handleSubmitContent}
                            placeholder={subtitle ? '' : 'Add a Subtitle'}
                        /> 
                    </SubtitleForm>
                }
            </SubtitleContainer>
            <DescriptionContainer setting={settings?.description}>
                {
                !formToggle.description && description?.content ? 
                    <Description>
                        <ColorChooser description={Description} name='description' update={updateBlog} inputs={inputs}/>
                        <DescriptionContent onClick={() => handleToggle('description')} color={description.color}>
                            {description.content}
                        </DescriptionContent>
                    </Description>
                : 
                    <DescriptionForm onSubmit={handleSubmitContent} name='description'>
                        <DescriptionInput 
                            type='text' 
                            name='description'
                            value={inputs?.description?.content}
                            onChange={handleContentChange} 
                            autoFocus
                            onBlur={handleSubmitContent}
                            placeholder={description ? '' : 'Add a description of your blog'}
                        /> 
                    </DescriptionForm>
                }
            </DescriptionContainer>
        </Container>
    )
}

export default Titles

const Container = styled.div`
    margin: 10px;
    text-align: center;
    position: ${props => !props.titleAbove && props.img && 'absolute'};
    top: ${props => !props.titleAbove && props.img && '50%'};
    left: ${props => !props.titleAbove && props.img && '50%'};
    transform: ${props => !props.titleAbove && props.img && 'translate(-50%, -50%)'};
`

const Title = styled.div``

const TitleContent = styled.p`
    font-size: 30pt;
    font-weight: 600;
    color: ${props => props.color};

    &:hover {
        border-radius: 10px;
        background-color: #b5d3e7;
        cursor: pointer;
    }
`

const TitleForm = styled.form``

const TitleInput = styled.input``

const SubtitleContainer = styled.div`
    display: ${props => props.setting ? 'block' : 'none'};
`

const Subtitle = styled.div`
    &:hover {
        border-radius: 10px;
        background-color: #b5d3e7;
        cursor: pointer;
    }
`

const SubtitleContent = styled.h2`
    color: ${props => props.color};
`

const SubtitleForm = styled.form``

const SubtitleInput = styled.input``

const DescriptionContainer = styled.div`
    display: ${props => props.setting ? 'block' : 'none'};
`

const Description = styled.div`
    &:hover {
        border-radius: 10px;
        background-color: #b5d3e7;
        cursor: pointer;
    }
`

const DescriptionContent = styled.p`
    max-width: 800px;
    margin: auto;
    color: ${props => props.color};
    word-break: break-word;
`

const DescriptionForm = styled.form``

const DescriptionInput = styled.textarea``