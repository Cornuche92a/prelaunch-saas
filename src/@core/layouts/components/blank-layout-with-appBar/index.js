// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import Box from "@mui/material/Box";

const StyledLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const BlankLayoutAppBar = () => {
  // ** Hooks
  const theme = useTheme()

  return (
    <AppBar elevation={3} color='default' position='sticky'>
      <center><Toolbar
        sx={{
          justifyContent: 'space-between',
          p: theme => `${theme.spacing(0, 6)} !important`,
          minHeight: `${theme.mixins.toolbar.minHeight}px !important`
        }}
      >
        <Link href='/' passHref>
          <Box   style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <StyledLink>
              <center><img   style={{
                justifyContent: 'center',
                alignItems: 'center',
              }} src={'/images/logo.svg'}></img></center>
            </StyledLink>
          </Box>
        </Link>
      </Toolbar>
      </center>
    </AppBar>
  )
}

export default BlankLayoutAppBar
