import React, {useState} from 'react'
import styled from 'styled-components'

const ColorChooser = props => {
    const {title, subtitle, description, name, update, inputs} = props

    const [show, setShow] = useState(false)

    const handleColorChange = color => {
        const updates = {
            ...inputs,
            [name]: {
                content: inputs[name].content,
                color: color
            }
        }
        update(updates)
    }

    const handleColorInput = e => {
        const {value} = e.target
        const updates = {
            ...inputs,
            [name]: {
                content: inputs[name].content,
                color: value
            }
        }
        update(updates)
    }

    const defaultColors = ['whitesmoke', '#1d1d1d', '#343837', '#D0FEFE', '#0F9B8E', '#C85A53', '#CB7723']

    return (
        <ColorsContainer title={title} subtitle={subtitle} description={description} show={show}>
            {defaultColors.map(color => 
                <Colors key={color} onClick={() => handleColorChange(color)} color={color}/>
            )}
            <ColorInput 
                type='color' 
                value={inputs[name].color} 
                onChange={handleColorInput} 
                onClick={() => setShow(true)}
                onBlur={() => setShow(false)}
            />
        </ColorsContainer>
    )
}

const ColorInput = styled.input`
    margin-left: 1px;
    
    &:active {
        display: flex;
    }
`

const ColorsContainer = styled.div`
    display: ${props => props.show ? 'flex' : 'none'};
    flex-direction: row;
    position: absolute;
    left: 50%;
    margin-left: -100px;
    margin-top: -18px;

    ${props => props.title}:hover & {
        display: flex
    }
    ${props => props.subtitle}:hover & {
        display: flex
    }
    ${props => props.description}:hover & {
        display: flex
    }
    ${ColorInput}:hover & {
        display: flex;
    }
    @media (max-width: 750px){
        display: flex;
    }
`

const Colors = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: ${props => props.color};
    border: solid black 1px;
    margin: 1px;

    &:hover {
        cursor: pointer;
    }
`

export default ColorChooser