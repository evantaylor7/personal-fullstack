import React, {useContext} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import styled from 'styled-components'
import {UserContext, userAxios} from '../../../../context/UserProvider'

const key = process.env.REACT_APP_TINY_KEY

const PostEditor = props => {
    const {postId, onChange, value, save} = props
    const {deleteImage} = useContext(UserContext)

    const handleEditorChange = (content, editor) => {
        onChange(content)
    }

    const handleImgUpload = (blobInfo, success, failure, progress) => {
        const data = new FormData()
        const file = blobInfo.blob()
        if(file.size > 10000000){
            failure('Image file is too large. Limit: 10mb')
            return
        }
        data.append('imageData', file)
        userAxios.put(`/api/image/post/${postId}`, data)
            .then(res => {
                const {contentImgs} = res.data
                const location = contentImgs[contentImgs.length - 1]
                success(location)
            })
            .catch(err => {
                failure('HTTP Error: ' + err.message)
            })
    }

    const handleDeleteImg = imgPath => {
        deleteImage(imgPath.replace('http://localhost:3000/', ''), postId)
    }

    return (
        <Container>
            <Editor
                apiKey={key}
                initialValue={value}
                onBlur={save}
                init={{
                    branding: false,
                    content_style: 
                        'h1, h2, h3, h4, h5, h6 {font-weight: 200} body {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; font-weight: 300} p > img {max-width: 100%; height: auto;} figure {object-fit: scale-down;} figure > img {max-width: 100%; max-height: 100%; height: auto; object-fit: scale-down; transform: scale(1, 1)} p {font-weight: 300; line-height: 1.8em;} p > span {font-weight: 300; line-height: 1.8em;} iframe {max-width: 100%} table {max-width: 100%}',
                    setup: editor => {
                        editor.on('keydown', e => {
                            console.debug('Key up event: ' + e.keyCode)
                            if(e.keyCode == 9){
                                editor.execCommand('mceInsertContent', false, '&emsp;&emsp;')
                                e.preventDefault()
                                e.stopPropagation()
                                return false
                            }
                            if((e.keyCode === 8 || e.keyCode === 46) && editor.selection){
                                const selectedNode = editor.selection.getNode()
                                if(selectedNode && selectedNode.nodeName === 'IMG'){
                                    handleDeleteImg(selectedNode.src)
                                }
                            }
                        })
                    },
                    file_picker_types: 'image',
                    image_caption: true,
                    automatic_uploads: true,
                    images_upload_base_path: "http://localhost:3000/uploads/",
                    images_upload_handler: (blobInfo, success, failure, progress) => handleImgUpload(blobInfo, success, failure, progress),
                    resize: false,
                    placeholder: 'Write your post here. Add images, line breaks, emoticons, etc. Press "shift + enter" to start a new paragraph without a space.',
                    height: '100%',
                    browser_spellcheck: true,
                    contextmenu: false,
                    menubar: false,
                    plugins: [
                        'quickbars advlist autolink lists link image hr emoticons charmap print',
                        'searchreplace visualblocks codesample fullscreen',
                        'insertdatetime media table paste wordcount'
                    ],
                    quickbars_selection_toolbar: 'bold italic underline | quicklink h1 h2 h3 | blockquote',
                    quickbars_insert_toolbar: 'image media quicktable | hr',
                    toolbar: "formatgroup paragraphgroup insertgroup fullscreen",
                    toolbar_groups: {
                        formatgroup: {
                            icon: "format",
                            tooltip: "Formatting",
                            items:
                            "bold italic underline strikethrough | forecolor backcolor | superscript subscript | fontsizeselect | removeformat"
                        },
                        paragraphgroup: {
                            icon: "paragraph",
                            tooltip: "Paragraph format",
                            items:
                            "h1 h2 h3 | blockquote codesample | bullist numlist | alignleft aligncenter alignright | indent outdent"
                        },
                        insertgroup: {
                            icon: "plus",
                            tooltip: "Insert",
                            items: "media image link | emoticons charmap | hr insertdatetime table"
                        }
                    },
                    icons: "thin",
                    mobile: {
                        toolbar_mode: "floating"
                    },
                }}
                onEditorChange={handleEditorChange}
            />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
`

export default PostEditor