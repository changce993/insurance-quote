import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ContenedorHeader = styled.header`
    background-color: #26C6DA;
    padding: 10px;
    font-weight:bold;
    color: #fff;
`

const TextoHeader = styled.h1`
    font-size: 2rem;
    margin:0;
    text-align:center;
    font-family:'Helvetica', serif;
    letter-spacing:3px;
`

const Header = ({titulo}) => {
    return (
        <ContenedorHeader>
            <TextoHeader>{titulo}</TextoHeader>
        </ContenedorHeader>
    )
}

Header.propTypes = {
    titulo: PropTypes.string.isRequired
}

export default Header
