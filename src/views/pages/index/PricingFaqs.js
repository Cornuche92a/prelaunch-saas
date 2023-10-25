// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import Card from '@mui/material/Card'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import { Icon } from '@mui/material'
import Typography from '@mui/material/Typography'
import AccordionDetails from '@mui/material/AccordionDetails'
import { useState } from 'react'

const PricingFaqs = ({ data }) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Card>
      <div className='pricing-faq'>
        <h3 className='text-center'>FAQ's</h3>
        <p className='text-center mb-0'>Let us help answer the most common questions.</p>
        <Row className='mt-75 mb-2'>
          <Col className='mx-auto' sm='12' lg={{ size: 10, offset: 2 }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                id='controlled-panel-header-1'
                aria-controls='controlled-panel-content-1'
                expandIcon={<Icon icon='mdi:chevron-down' />}
              >
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
                  Topping soufflé tart sweet croissant.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                id='controlled-panel-header-2'
                aria-controls='controlled-panel-content-2'
                expandIcon={<Icon icon='mdi:chevron-down' />}
              >
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Sugar plum sesame snaps caramels. Cake pie tart fruitcake sesame snaps donut cupcake macaroon.
                  Gingerbread pudding cheesecake pie ice cream.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                id='controlled-panel-header-3'
                aria-controls='controlled-panel-content-3'
                expandIcon={<Icon icon='mdi:chevron-down' />}
              >
                <Typography>Accordion 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu. Jelly pie cake. Sweet
                  roll dessert sweet pastry powder.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default PricingFaqs
