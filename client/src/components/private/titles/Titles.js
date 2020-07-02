import React, {useState, useEffect} from 'react'
import ColorChooser from './ColorChooser.js'
import styled from 'styled-components'

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

    return (
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

const Container = styled.div`
    margin: ${props => !props.img ? '40px 0 0 0' : props.titleAbove ? '30px 0 40px' : '10px'};
    text-align: center;
    position: ${props => !props.titleAbove && props.img && 'absolute'};
    top: ${props => !props.titleAbove && props.img && '50%'};
    left: ${props => !props.titleAbove && props.img && '50%'};
    transform: ${props => !props.titleAbove && props.img && 'translate(-50%, -50%)'};

    @media (max-width: 1080px){
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
`

const Title = styled.div`
    @media (max-width: 1080px){
        width: 90%;
        margin: auto
    }
`

const TitleContent = styled.p`
    font-size: 70px;
    font-weight: 300;
    color: ${props => props.color};
    display: inline-block;
    padding: 2px 6px 6px 6px;

    &:hover {
        border-radius: 10px;
        background-color: #b5d3e7;
        cursor: pointer;
    }
    @media (max-width: 530px){
        width: 100%;
    }
    @media (max-width: 480px){
        font-size: 50px
    }
    @media (max-width: 350px){
        font-size: 44px
    }
`

const TitleForm = styled.form``

const TitleInput = styled.input`
    border: none;
    outline: none;
    font-size: 70px;
    font-weight: 300;
    padding: 2px 6px 6px 6px;
    width: 90%;
    text-align: center;

    @media (max-width: 530px){
        width: 100%;
    }
    @media (max-width: 480px){
        font-size: 50px
    }
    @media (max-width: 350px){
        font-size: 44px
    }
`

const SubtitleContainer = styled.div`
    display: ${props => props.setting ? 'block' : 'none'};
    margin-top: 4px;
`

const Subtitle = styled.div`
    @media (max-width: 1080px){
        width: 90%;
        margin: auto
    }
`

const SubtitleContent = styled.h2`
    display: inline-block;
    color: ${props => props.color};
    padding: 2px 6px 6px 6px;
    font-weight: 300;
    font-size: 30px;

    &:hover {
        border-radius: 10px;
        background-color: #b5d3e7;
        cursor: pointer;
    }
    @media (max-width: 480px){
        font-size: 26px
    }
`

const SubtitleForm = styled.form``

const SubtitleInput = styled.input`
    padding: 2px 6px 6px 6px;
    font-size: 30px;
    font-style: italic;
    text-align: center;
    border: none;
    outline: none;
    width: 90%;
    border-radius: 4px;

    @media (max-width: 480px){
        font-size: 26px
    }
`

const DescriptionContainer = styled.div`
    display: ${props => props.setting ? 'block' : 'none'};
`

const Description = styled.div`
    margin-top: 10px;
`

const DescriptionContent = styled.p`
    display: inline-block;
    width: 800px;
    margin: auto;
    color: ${props => props.color};
    word-break: break-word;
    padding: 6px;
    line-height: 22px;

    &:hover {
        border-radius: 10px;
        background-color: #b5d3e7;
        cursor: pointer;
    }

    @media (max-width: 1080px){
        width: 90%;
        margin: auto
    }
`

const DescriptionForm = styled.form``

const DescriptionInput = styled.textarea`
    width: 800px;
    height: 90px;
    margin: 10px auto 0 auto;
    padding: 6px;
    border: none;
    outline: none;
    text-align: center;
    resize: none;
    border-radius: 4px;

    @media (max-width: 1080px){
        width: 90%
    }
`

export default Titles