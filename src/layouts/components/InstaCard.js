// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'
import Instagram from 'mdi-material-ui/Instagram'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import Button from '@mui/material/Button'
import { ArrowRight } from 'mdi-material-ui'

const InstaCard = () => {
  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#ff16ec' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography variant='h6' sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white' }}>
          <Instagram sx={{ mr: 2.5 }} />
          Instagram
        </Typography>
        <Typography variant='body2' sx={{ mb: 3, color: 'common.white' }}>
          Suivez-nous sur Instagram pour être tenus informés de nouveautés, nous parler et gagner des mois d'abonnements
          !
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Button fullWidth variant='contained' endIcon={<ArrowRight />} href={'https://m.instagram.com/subifyfr/'}>
              Nous suivre
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default InstaCard
