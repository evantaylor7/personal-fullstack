import React from 'react'
import styled from 'styled-components'

const ColorChooser = props => {
    const {title, subtitle, description, name, update, inputs} = props

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

    const defaultColors = ['whitesmoke', '#1d1d1d', '#343837', '#214761', '#3C0008', '#0F9B8E', '#C85A53','#CB7723', '#048243', '#D0FEFE', '#8F1402']

    return(
        <ColorsContainer title={title} subtitle={subtitle} description={description}>
            {defaultColors.map(color => 
                <Colors key={color} onClick={() => handleColorChange(color)} color={color}/>
            )}
        </ColorsContainer>
    )
}

export default ColorChooser

const ColorsContainer = styled.div`
    display: none;
    flex-direction: row;
    position: absolute;
    left: 50%;
    margin-left: -90px;
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