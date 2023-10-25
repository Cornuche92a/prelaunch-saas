//IMPORT MONGODB FUNC
import {connectDatabase, find} from '../../helpers/db-util'

// ** MUI Components
import Spinner from '../@core/components/spinner'
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React, {useEffect, useState} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

// ** Layout Import
import Logo from '../../public/images/logo_blue.png'
import ConfirmBox from '../layouts/components/ConfirmBox'
import {BrowserView} from 'react-device-detect'

// Google Analytics Import
import * as ga from '../lib/ga'

// ** Demo Imports
import ErrorBox from '../layouts/components/ErrorBox'
import TimelineActivity from '../layouts/components/Timeline'
import Prices from '../layouts/components/Prices'
import Grid from '@mui/material/Grid'
import {Alert} from '@mui/material'
import Image from 'next/image'
import PricingCTA from '../views/pages/index/PricingCTA'
import Faqs from '../views/pages/index/Faqs'
import TwitterCard from '../layouts/components/TwitterCard'
import InstaCard from '../layouts/components/InstaCard'

// ** Styled Components
const BoxWrapper = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))


function ComingSoon(props) {
  const {events} = props
  const {services} = props

  const [spinner, setSpinner] = useState(false)
  const [unsubmitted, setUnsubmitted] = useState(false)
  const [error, setError] = useState('')
  const [varCaptchacode, setvarCaptchacode] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const recaptchaRef = React.createRef()

  ga.event({
    action: 'page_view'
  })

  const handleChange = ({target: {value}}) => {
    setEmail(value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    recaptchaRef.current.execute()
  }

  useEffect(() => {
    if (varCaptchacode !== '') {
      // Récupération de l'e-mail dans l'évent
      const reqBody = {
        // Objet envoyé dans la requête POST
        email: email,
        captcha: varCaptchacode
      }

      setSpinner(true)
      setSubmitted(false)
      setUnsubmitted(false)

      // Communication avec API newsletter
      fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // Récupération de la réponse
          setSpinner(false)

          return response.json()
        })
        .then(message => {
          if (message.message === 'Pre-registered user !') {
            setSubmitted(true)
            ga.event({
              action: 'pre-registered'
            })

            return
          }
          if (message.message === 'I know you') {
            setUnsubmitted(true)
            setError('Duplicated')
          } else {
            setUnsubmitted(true)
            setError('Something went wrong')
          }
        })
      recaptchaRef.current.reset()
    }
  }, [varCaptchacode])

  function OnReCAPTCHAChange(captchaCode) {
    // Fonction éxecutée lors d'un évènement avec le Captcha
    setvarCaptchacode(captchaCode)
  }

  if (spinner) {
    return <Spinner/>
  }

  return (
    <Box style={{zIndex: 0, overflow: 'hidden'}} className='content-center'>
      {submitted && <ConfirmBox/>}
      {unsubmitted && <ErrorBox errorType={error}/>}

      <Box sx={{p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{maxWidth: '30vh'}} display={'flex'}>
          <Image src={Logo} objectPosition={'center'} loading={'lazy'} alt={'Logo'}/>
        </Box>
        <BoxWrapper>
          <Box sx={{mb: 10, textAlign: 'center', marginTop: 10}}>
            <Typography variant='h5' sx={{mb: 2.5, fontSize: '1.5rem !important'}}>
              Ouverture prochainement ! 🚀
            </Typography>
            <Alert severity='info'>
              En ce moment profitez d'<b>1 mois offert</b> sur votre abonnement !
            </Alert>
          </Box>
          <form noValidate autoComplete='on' onSubmit={handleSubmit}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <TextField
                required
                autoFocus
                defaultValue={''}
                onChange={handleChange}
                size='small'
                type='email'
                sx={{mr: 6}}
                onInput={e => setEmail(e.target.value)}
                placeholder='Adresse e-mail'
              />
              <Button type={'submit'} variant='contained'>
                🎁
              </Button>
              <ReCAPTCHA
                style={{visibility: 'hidden'}}
                ref={recaptchaRef}
                size='invisible'
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={OnReCAPTCHAChange}
              />
            </Box>
          </form>
        </BoxWrapper>

        <Grid container spacing={6} sx={{paddingTop: 10}} className='match-height'>
          <Grid item xs={12}>
            <Prices services={services}/>
          </Grid>
          <Grid item xs={12}>
            <TimelineActivity events={events}/>
          </Grid>
          <Grid item xs={12}>
            <Faqs/>
          </Grid>
          <Grid item xs={12}>
            <PricingCTA/>
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{paddingTop: 10}} className='match-height'>
          <Grid item xs={12} sm={6}>
            <TwitterCard/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InstaCard/>
          </Grid>
        </Grid>
      </Box>
      <BrowserView></BrowserView>
    </Box>
  )
}

ComingSoon.authGuard = false
ComingSoon.guestGuard = false

export async function getStaticProps() {
  console.log('RE GENERATINGUE')
  const client = await connectDatabase()
  const servicesQuery = await find(client, 'services')
  const eventsQuery = await find(client, 'prelaunchSettings')
  const events = JSON.parse(JSON.stringify(eventsQuery))
  const services = JSON.parse(JSON.stringify(servicesQuery))

  client.close()

  return {
    props: {
      events: events,
      services: services
    },
    revalidate: 30
  }
}

// ComingSoon.getLayout = page => <BlankLayout>{page}</BlankLayout>       <FooterIllustrations />

export default ComingSoon
