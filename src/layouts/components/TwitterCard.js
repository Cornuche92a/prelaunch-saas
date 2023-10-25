// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'
import Twitter from 'mdi-material-ui/Twitter'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import { ArrowRight } from 'mdi-material-ui'
import Button from '@mui/material/Button'

const CardTwitter = () => {
  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#16B1FF' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography variant='h6' sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white' }}>
          <Twitter sx={{ mr: 2.5 }} />
          Twitter
        </Typography>
        <Typography variant='body2' sx={{ mb: 3, color: 'common.white' }}>
          Suivez les actualités de Subify sur Twitter pour être tenu informés de nouveautés, profiter de réductions et
          d'offres exclusives !
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Button
              fullWidth
              variant='contained'
              endIcon={<ArrowRight />}
              href={'https://twitter.com/intent/user?screen_name=SubifyFR'}
            >
              Nous suivre
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardTwitter
