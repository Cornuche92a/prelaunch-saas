// ** React Imports
import React, { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

//** Component Imports
import ServiceLogos from '../../@core/components/newsletter/avatars'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import ReactConfetti from 'react-confetti'
import Box from '@mui/material/Box'

function ConfirmBox(props) {
  // ** State

  const errorType = props.errorType

  const [open, setOpen] = useState(true)

  function handleClose() {
    setOpen(false)
  }

  return (
    <div>
      <Dialog display={'inline-block'} aria-labelledby='customized-dialog-title' open={open}>
        {errorType === 'Duplicated' && open && (
          <ReactConfetti
            style={{ width: '-webkit-fill-available', height: '-webkit-fill-available' }}
            numberOfieces={300}
            recycle={false}
          />
        )}
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <Typography variant='h6' component='span'>
            <b>
              {errorType === 'Duplicated' && 'Vous êtes déjà enregistré(e) ! 😀'}
              {errorType === 'Something went wrong' && "Quelque chose s'est mal passé..."}
            </b>
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
          {errorType === 'Duplicated' && (
            <Typography gutterBottom>
              Votre adresse e-mail existe déjà dans notre base, mais ne vous en faites pas, il y en aura sûrement pour
              vous aussi 😉
              <ServiceLogos />
              <p>
                Soyez parmi les 100 premiers à inaugurer l'ouverture en vous inscrivant, et bénéficiez d'
                <b>un mois offert</b> sur votre<b> abonnement préféré</b> !
              </p>
            </Typography>
          )}

          {errorType === 'Something went wrong' && (
            <Typography gutterBottom>
              Une erreur est survenue, veuillez ré-essayer. Sinon contactez-nous par e-mail à <b>support@subify.fr</b>
            </Typography>
          )}

          <Typography variant={'caption'}>
            Vous pouvez à tout moment vous désinscrire en nous contactant à l'adresse : <b>contact@subify.fr</b> ou en
            cliquant sur "se désinscrire" dans le mail de confirmation.
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
    </div>
  )
}

export default ConfirmBox
