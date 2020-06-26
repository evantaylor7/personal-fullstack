import React, {useState, useContext} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import styled from 'styled-components'
import {UserContext, userAxios} from '../../../../context/UserProvider'

const key = process.env.REACT_APP_TINY_KEY

const PostEditor = props => {
    const {postId, onChange, value, save, toggleImgModal} = props
    const {uploadImage} = useContext(UserContext)
    console.log(value)

    const handleEditorChange = (content, editor) => {
        onChange(content)
    }

    return (
        <Container>
            <Editor
                apiKey={key}
                initialValue={value}
                onBlur={save}
                init={{
                    content_style: 
                        'h1, h2, h3, h4, h5, h6 {font-weight: 200} body {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-weight: 300} p > img {max-width: 100%; height: 100%;} p {font-weight: 300; line-height: 1.8em;} p > span {font-weight: 300; line-height: 1.8em;}',
                    setup : function(ed) {
                        ed.on('keydown', function(evt) {
                            console.debug('Key up event: ' + evt.keyCode)
                            if (evt.keyCode == 9){
                                ed.execCommand('mceInsertContent', false, '&emsp;&emsp;')
                                evt.preventDefault()
                                evt.stopPropagation()
                                return false
                            }
                        })
                    },
                    file_picker_types: 'image',
                    images_upload_handler: postId => (
                        function (blobInfo, success, failure) {
                            let data = new FormData()
                            data.append('imageData', blobInfo.fileName())
                            userAxios.put(`/api/image/posts/${postId}`, data)
                                .then(function (res) {
                                    console.log(res.data)
                                    success(res.data.location)
                                })
                                .catch(function (err) {
                                    failure('HTTP Error: ' + err.message)
                                })
                        }
                    ),
                    resize: false,
                    placeholder: 'Write your post here. Add images, line breaks, emoticons, etc. Press "shift + enter" to start a new paragraph without a space.',
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
    width: 100%;
    height: 100%;
    margin: auto;
`