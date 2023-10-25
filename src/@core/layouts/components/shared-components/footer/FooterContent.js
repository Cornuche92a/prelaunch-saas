// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`Subify © ${new Date().getFullYear()}, Fait avec `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` pour `}
        Vous
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link target='_blank' href='/conditions'>
            Conditions
          </Link>
          <Link target='_blank' href='/legal'>
            Mentions légales
          </Link>
          <Link target='_blank' href='mailto:contact@subify.fr'>
            Contact
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
