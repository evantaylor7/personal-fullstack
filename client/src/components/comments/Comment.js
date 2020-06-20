import React, {useContext, useState} from 'react'
import {UserContext} from '../../context/UserProvider.js'
import styled from 'styled-components'

const Comment = props => {
	const {postedBy, date, content, user: commentUser, postUser, _id: commentId} = props
    const {user: {_id: userId}, token, deleteComment, editComment} = useContext(UserContext)

	const [toggleForm, setToggleForm] = useState(false)
	const [editInput, setEditInput] = useState(content)

	const handleEditToggle = () => {
        setToggleForm(prevToggleForm => !prevToggleForm)
	}
	
	const handleChange = e => {
		const {value} = e.target
		setEditInput(value)
	}

	const handleEditSubmit = e => {
		e.preventDefault()
		editComment(commentId, {content: editInput})
		handleEditToggle()
	}

	const handleDelete = () => {
        deleteComment(commentId)
    }

    return (
        <Container>
            <NameDate>
                <Name><b>{postedBy}</b></Name>
                <Date>posted on {date}</Date>
            </NameDate>
            <ContentContainer>
                {
				toggleForm ?
					<EditForm onSubmit={handleEditSubmit}>
						<EditInput type='text' value={editInput} onChange={handleChange}/>
						<Edit>Save</Edit>
					</EditForm>
				:
                    <Content>{content}</Content>
                }
            </ContentContainer>
            {token &&
                <>
					{
					commentUser === userId && 
						<Edit onClick={handleEditToggle}>{toggleForm ? 'Cancel' : 'Edit'}</Edit>
					}
                    {
                    (commentUser === userId || postUser === userId) && 
                        <Edit onClick={handleDelete}>Delete</Edit>
                    }
                </>
            }
        </Container>
    )
}

export default Comment

const Container = styled.div`
    margin-top: 20px;
    width: 500px;
`

const NameDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #b5d3e7;
`

const Name = styled.p``

const Date = styled.p`
    font-size: 12px;
    margin-left: 4px;
`

const ContentContainer = styled.div``

const EditForm = styled.form``

const EditInput = styled.textarea`
	margin-top: 8px;
    padding: 10px;
    border-radius: 6px;
    outline: none;
    height: 100px;
    width: 500px;
    max-width: 700px;
    max-height: 600px;
`

const Content = styled.p``

const Edit = styled.button``