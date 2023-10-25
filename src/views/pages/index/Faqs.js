// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const AccordionControlled = () => {
  // ** State
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary id='controlled-panel-header-1' aria-controls='controlled-panel-content-1' expandIcon={'+'}>
          <Typography>
            <a style={{fontWeight: 'bold'}}>🤔 Comment fonctionne Subify ?</a>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <a style={{fontWeight: 'bold'}}>Subify</a> est un service vous permettant de souscrire à tous vos
            abonnements préférés <a style={{fontWeight: 'bold'}}>à prix bas</a>, et de regrouper tous vos abonnements
            directement en un seul endroit. Il vous permet aussi de les{' '}
            <a style={{fontWeight: 'bold'}}>contrôler à 100%</a>.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary id='controlled-panel-header-2' aria-controls='controlled-panel-content-2' expandIcon={'+'}>
          <Typography>
            <a style={{fontWeight: 'bold'}}>❌ Pourrai-je résilier mon abonnement ?</a>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tout à fait ! Les abonnements sont <a style={{fontWeight: 'bold'}}>sans engagement</a>, <a
            style={{fontWeight: 'bold'}}>résiliables
          </a> à tout moment et <a style={{fontWeight: 'bold'}}>sans pénalité</a> ! En un seul clic sur votre
            espace
            client, vous pouvez tout contrôler ! 😁
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary id='controlled-panel-header-3' aria-controls='controlled-panel-content-3' expandIcon={'+'}>
          <Typography>
            <a style={{fontWeight: 'bold'}}>💳 Comment pourrai-je payer ?</a>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Les paiements par <a style={{fontWeight: 'bold'}}>Carte Bancaire</a>,{' '}
            <a style={{fontWeight: 'bold'}}>PayPal</a>, <a style={{fontWeight: 'bold'}}>Apple Pay</a> ou{' '}
            <a style={{fontWeight: 'bold'}}>Google Pay</a> seront acceptés !
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default AccordionControlled
