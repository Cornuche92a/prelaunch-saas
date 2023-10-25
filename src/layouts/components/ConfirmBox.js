// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

//** Browser checker
import { BrowserView, isBrowser, MobileView } from 'react-device-detect'

//** Component Imports
import ServiceLogos from '../../@core/components/newsletter/avatars'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import ReactConfetti from 'react-confetti'
import Box from '@mui/material/Box'

function ConfirmBox() {
  // ** State
  const [open, setOpen] = useState(true)

  function handleClose() {
    setOpen(false)
  }

  return (
    <Box>
      <Dialog display={'inline-block'} overflow={'hidden'} aria-labelledby='Pré-inscription confirmée !' open={open}>
        <ReactConfetti
          style={{ width: '-webkit-fill-available', height: '-webkit-fill-available' }}
          numberOfieces={1000}
          recycle={false}
        />
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <Typography variant='h6' component='span'>
            <b>Bienvenue chez Subify ! 🎉</b>
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: theme => theme.palette.grey[500] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4 }}>
          <Typography gutterBottom>
            Bienvenue dans notre liste d'attente. Vous recevrez un e-mail dès notre ouverture !<ServiceLogos />{' '}
            <p>
              Vous êtes désormais pré-inscrit(e) ! Vous bénéficierez d'
              <b>un mois offert</b> sur votre <b>service préféré</b> !
            </p>
          </Typography>

          <Typography variant={'caption'}>
            Vous pouvez à tout moment vous désinscrire en cliquant sur <b>"se désinscrire"</b> dans le mail de
            confirmation.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            p: theme => {
              theme.spacing(4)
            }
          }}
        >
          <Button onClick={handleClose}>Terminer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ConfirmBox
