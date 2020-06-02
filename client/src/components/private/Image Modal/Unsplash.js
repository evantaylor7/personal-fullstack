import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {UserContext} from '../../../context/UserProvider'

const Unsplash = props => {
    const {unsplash, getPhotos, searchPhotos} = useContext(UserContext)
    console.log(unsplash)

    useEffect(() => {
        getPhotos()
    }, [])

    const photo = unsplash.map(photo => (
        <Img key={photo.id} src={photo.urls.raw}/>
    ))

    return(
        <div>
            {photo}
        </div>
    )
}

export default Unsplash

const Img = styled.img`
    /* max-width: 200px; */
    height: 150px
`