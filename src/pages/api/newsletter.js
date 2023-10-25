//Database Helpers Import
import {connectDatabase, insertDocument, findOne} from '../../../helpers/db-util'

// BigMailer Import API
const sdk = require('api')('@big mailer/v1.0#1ffq3b36l6uubm3y')

const validator = require('email-validator')

async function storeError(client, err, email, ip) {
  await insertDocument(client, 'logsError', {
    email: email,
    ip_address: ip,
    date: new Date(),
    details: JSON.parse(JSON.stringify(err))
  })
}

async function handler(req, res) {
  if (req.method === 'POST' && req.body.email && req.body.captcha) {
    try {
      // Ping the Google recaptcha verify API to verify the captcha code you received

      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.captcha}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          method: 'POST'
        }
      )

      const captchaValidation = await response.json()

      if (await captchaValidation.success) {
        let client

        if (validator.validate(req.body.email)) {
          try {
            client = await connectDatabase()
          } catch (error) {
            res.status(500).json({message: 'Connecting to the database failed !'})

            return
          }

          if (await findOne(client, 'emails', {email: req.body.email})) {
            return res.status(422).json({message: `I know you`})
          } else {
            try {
              await insertDocument(client, 'emails', {
                email: req.body.email,
                ip_address: req.ip,
                subscribed: true,
                date: new Date().toISOString()
              })

              sdk.auth(process.env.BIGMAILER_API_PRELAUNCH_KEY)
              sdk
                .createContact(
                  {
                    list_ids: [],
                    unsubscribe_all: false,
                    email: req.body.email
                  },
                  {
                    brand_id: process.env.BIGMAILER_BRAND_ID
                  }
                )
                .then(async () =>
                  sdk
                    .sendTransactionalCampaign(
                      {email: req.body.email},
                      {
                        brand_id: process.env.BIGMAILER_BRAND_ID,
                        campaign_id: process.env.BIGMAILER_CAMPAIGN_ID
                      }
                    )
                    .then(async function ({data}) {
                      console.log(data)

                      return res.status(200).json({message: 'Pre-registered user !'})
                    })
                    .catch(async err => {
                      console.log(err)

                      return res.status(500).json({message: 'Data treatment on email base failed !'})
                    })
                )
                .catch(async function (err) {
                  console.log(err)

                  return res.status(500).json({message: 'Data treatment on email base failed !'})
                })

              client.close()
            } catch (error) {
              client.close()

              return res.status(500).json({message: 'Data treatment on database failed !'})
            }
          }
        } else {
          return res.status(422).json({message: 'Invalid e-mail'})
        }
      }
    } catch (error) {
      const client = await connectDatabase()
      await storeError(client, error, req.body.email, req.socket.remoteAddress)

      client.close()

      return res.status(422).json({message: 'Something went wrong'})
    }
  } else {
    return res.status(422).json({
      message: 'Unproccesable request, please provide the required fields'
    })
  }
}

export default handler
