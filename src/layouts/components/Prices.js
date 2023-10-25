// ** React Imports
import {useState} from 'react'

// ** MUI Import
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import Table from '@mui/material/Table'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'


function RenderTabContent({service}) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{'& .MuiTableCell-root': {py: theme => `${theme.spacing(2.5)} !important`}}}>
            <TableCell sx={{whiteSpace: 'nowrap'}}>Forfait</TableCell>
            <TableCell align='center'>DURÉE</TableCell>
            <TableCell align='right'>Subify</TableCell>
            <TableCell align='right'>{service.name}</TableCell>
            <TableCell align='right'>Économies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {service.subscriptions && service.subscriptions.map((subscription, index) =>

            subscription.display === true &&
            (

              <TableRow
                key={index}
                sx={{
                  '& .MuiTableCell-root': {
                    border: 0,
                    py: theme => `${theme.spacing(1.5)} !important`
                  },
                  '&:first-child .MuiTableCell-body': {
                    pt: theme => `${theme.spacing(3)} !important`
                  },
                  '&:last-child .MuiTableCell-body': {
                    pb: theme => `${theme.spacing(3)} !important`
                  }
                }}
              >
                <TableCell>
                  <Typography variant='body2' sx={{fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary'}}>
                    {subscription.name}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={subscription.state.text}
                    color={subscription.state.color}
                    sx={{height: 20, fontWeight: 500, '& .MuiChip-label': {px: 1.625, lineHeight: 1.539}}}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    sx={{fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap', color: 'primary.main'}}
                  >
                    {subscription.price} €
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    sx={{fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap', color: 'error.main'}}
                  >
                    {subscription.originalPrice} €
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 600,
                      textAlign: 'right',
                      color: subscription.conversionDifference === 'negative' ? 'error.main' : 'success.main'
                    }}
                  >
                    + {`${parseFloat(subscription.originalPrice - subscription.price).toFixed(2)}`} €
                  </Typography>
                </TableCell>
              </TableRow>

            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function Prices(props) {
  const {services} = props

  // ** State
  const [value, setValue] = useState(services[0]._id)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function RenderTabAvatar({service}) {
    return (
      <Avatar
        variant='rounded'
        alt={`tab-${service.name}`}
        src={`/images/cards/${service.name}.png`}
        sx={{
          width: 100,
          height: 92,
          backgroundColor: 'transparent',

          border: theme =>
            value === service._id ? `2px solid ${theme.palette.primary.main}` : `2px dashed ${theme.palette.divider}`
        }}
      />
    )
  }

  return (
    <Card>
      <CardHeader title='Nos abonnements' subheader='Vous ne trouverez pas moins cher'/>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='top referral sources tabs'
          sx={{
            mb: 2.5,
            px: 5,
            '& .MuiTab-root:not(:last-child)': {mr: 4},
            '& .MuiTabs-indicator': {display: 'none'}
          }}
        >
          {services.map((service, index) => (
            <Tab key={index} value={service._id} sx={{p: 0}} label={<RenderTabAvatar service={service}/>}/>
          ))}
        </TabList>

        {services.map((service, index) => (
          <TabPanel key={index} sx={{p: 0}} value={service._id}>
            <RenderTabContent service={service}/>
          </TabPanel>
        ))}
      </TabContext>
    </Card>
  )
}

export default Prices
