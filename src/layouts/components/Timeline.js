// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import {styled} from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

function TimelineActivity(props) {
  const {events} = props

  return (
    <Card>
      <CardHeader title='Suivez notre avancée'/>
      <CardContent sx={{pt: theme => `${theme.spacing(2.5)} !important`}}>
        <Timeline sx={{my: 0, py: 0}}>
          {events.map((event, index) =>
            <div key={index}>
              {event.enabled && <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={event.pastilleColor}/>
                  <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent sx={{mt: 0, mb: theme => `${theme.spacing(3)} !important`}}>
                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography sx={{mr: 2, fontWeight: 600}}>{event.title}</Typography>
                    <Typography variant='caption' sx={{color: 'text.disabled'}}>
                      Depuis le {event.date}
                    </Typography>
                  </Box>
                  <Typography variant='body2' sx={{mb: 2}}>
                    {event.description}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              }</div>)}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default TimelineActivity
