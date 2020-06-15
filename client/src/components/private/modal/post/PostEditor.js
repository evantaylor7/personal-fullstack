import React, {useState} from 'react'
import {Editor, EditorState, RichUtils, convertFromHTML} from 'draft-js'
import 'draft-js/dist/Draft.css'
// import styled from 'styled-components'

const PostEditor = () => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty()
    )

    const handleChange = editorState => {
        setEditorState(editorState)
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if(newState){
            return 'handled'
        } 
        return 'not handled'
    }

    const onBoldClick = () => {
        handleChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    return (
        <>
            <button onClick={onBoldClick}>Bold</button>
            <Editor 
                editorState={editorState} 
                onChange={handleChange}
                handleKeyCommand={handleKeyCommand}
            />
        </>
    )
}

export default PostEditor