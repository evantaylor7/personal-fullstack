import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import styled from 'styled-components'

const key = process.env.REACT_APP_TINY_KEY

const PostEditor = props => {
    const {onChange, value, save} = props

    const handleEditorChange = (content, editor) => {
        onChange(content)
    }

    return (
        <Container>
            <Editor
                apiKey={key}
                value={value}
                onBlur={save}
                
                init={{
                    content_style: 
                        'h1, h2, h3, h4, h5, h6 {font-weight: 200} body {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-weight: 300}',
                        setup : function(ed) {
                            ed.on('keydown', function(evt) {
                                console.debug('Key up event: ' + evt.keyCode);
                                if (evt.keyCode == 9){ // tab pressed
                                  ed.execCommand('mceInsertContent', false, '&emsp;&emsp;'); // inserts tab
                                  evt.preventDefault();
                                  evt.stopPropagation();
                                  return false;
                                }
                            });
                         },
                    resize: false,
                    placeholder: 'Write your post here. Add images, line breaks, embed videos, and go nuts with emoticons.',
                    height: '100%',
                    browser_spellcheck: true,
                    contextmenu: false,
                    menubar: true,
                    menu: {file: {title: 'File', items: 'preview | print'}},
                    plugins: [
                    'quickbars advlist autolink lists link image hr emoticons charmap print preview',
                    'searchreplace visualblocks code codesample fullscreen',
                    'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic underline backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | image link hr | removeformat | preview'
                }}
                onEditorChange={handleEditorChange}
            />
        </Container>
    )
}

export default PostEditor

const Container = styled.div`
    width: 96%;
    height: calc(100% - 84px);
    margin: auto;
`