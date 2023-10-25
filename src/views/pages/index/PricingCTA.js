// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// ** Util Import
import Card from '@mui/material/Card'

//** isMobile import
import { BrowserView, isBrowser, MobileView } from 'react-device-detect'

//** deco import
import ReactConfetti from 'react-confetti'
import React from 'react'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12.5, 35),

  // backgroundColor: hexToRGBA(theme.palette.primary.main, 0.05),

  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(12.5, 20)
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'center'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(12.5, 5)
  }
}))

const GridStyled = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

const Img = styled('Img')(({ theme }) => ({
  bottom: 0,
  right: 144,
  width: 190,
  position: 'absolute',
  [theme.breakpoints.down('md')]: {
    width: 200,
    position: 'static'
  },
  [theme.breakpoints.down('sm')]: {
    width: 180
  }
}))

const ScrollTop = () => {
  const anchor = document.querySelector('body')
  if (anchor) {
    anchor.scrollIntoView({ behavior: 'smooth' })
  }
}

const PricingCTA = () => {
  return (
    <Card raised={true} variant={'elevation'}>
      <BoxWrapper>
        <BrowserView>
          <ReactConfetti
            style={{ width: '-webkit-fill-available' }}
            width={'2000wm'}
            numberOfPieces={50}
            recycle={true}
          />
        </BrowserView>
        <MobileView>
          <ReactConfetti
            style={{ width: '-webkit-fill-available' }}
            width={'700wm'}
            numberOfPieces={50}
            recycle={true}
          />
        </MobileView>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <Typography variant='h5' sx={{ mb: 2.5, color: 'info.main' }}>
              Profitez d'<a style={{ fontWeight: 'bold' }}>1 mois offert</a> pour vous convaincre !
            </Typography>
            <Typography variant='body2' sx={{ mb: 10 }}>
              Vous bénéficierez d'<a style={{ fontWeight: 'bold' }}>1 mois offert</a> sur votre abonnement préféré pour
              vous convaincre.
            </Typography>
            <Button onClick={ScrollTop} variant='contained'>
              Obtenir mon mois offert
            </Button>
          </Grid>
          <BrowserView>
            <GridStyled item xs={12} md={4}>
              <Img alt='pricing-cta-avatar' src='/images/avatars/pricing-cta-illustration.png' />
            </GridStyled>
          </BrowserView>
        </Grid>
      </BoxWrapper>
    </Card>
  )
}

export default PricingCTA
