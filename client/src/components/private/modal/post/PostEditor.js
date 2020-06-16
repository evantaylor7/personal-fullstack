// import React, {useState} from 'react'
// import {Editor, EditorState, RichUtils, convertFromHTML} from 'draft-js'
// import 'draft-js/dist/Draft.css'
// // import styled from 'styled-components'

// const PostEditor = () => {
//     const [editorState, setEditorState] = useState(
//         () => EditorState.createEmpty()
//     )

//     const handleChange = editorState => {
//         setEditorState(editorState)
//     }

//     const handleKeyCommand = (command, editorState) => {
//         const newState = RichUtils.handleKeyCommand(editorState, command)
//         if(newState){
//             return 'handled'
//         } 
//         return 'not handled'
//     }

//     const onBoldClick = () => {
//         handleChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
//     }

//     return (
//         <>
//             <button onClick={onBoldClick}>Bold</button>
//             <Editor 
//                 editorState={editorState} 
//                 onChange={handleChange}
//                 handleKeyCommand={handleKeyCommand}
//             />
//         </>
//     )
// }

// export default PostEditor

import React from 'react'
import {Editor} from '@tinymce/tinymce-react'

const key = process.env.REACT_APP_TINY_KEY

const PostEditor = () => {
    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content)
    }

    return (
        <Editor
            apiKey={key}
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
                height: 500,
                menubar: true,
                plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
        />
    )
}

export default PostEditor