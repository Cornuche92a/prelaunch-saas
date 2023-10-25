// ** MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import React from "react";

//** Swing Imports
import styled, { keyframes } from "styled-components";
import Swing from "@bit/formidablelabs.react-animations.swing";

//** Consts
const SwingAnimation = keyframes`${Swing}`;
const SwingDiv = styled.div`animation: infinite 5s ${SwingAnimation};`;

function ServiceLogos() {

  const services = [
    {name: 'crunchyroll.jpeg'},
    {name: 'disney.png'},
    {name: 'netflix.webp'},
    {name: 'playstation.jpeg'},
    {name: 'spotify.jpeg'},
    {name: 'youtube.png'}
  ]

  return (
    <Box className='demo-space-x' sx={{ display: 'flex', alignItems: 'center' }}>
      {services.map((service, index) => (
        <SwingDiv key={service.name}>
        <Avatar key={service.name} src={`/images/logos/${service.name}`} alt='ictor Anderson'/>
      </SwingDiv>

      ))}
    </Box>
  )
}

export default ServiceLogos
