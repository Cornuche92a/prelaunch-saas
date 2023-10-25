// ** React Import
import {Children} from 'react'

// ** Next Import
import Document, {Html, Head, Main, NextScript} from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'
import Script from "next/script";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='fr'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com'/>
          <link rel='preconnect' href='https://fonts.gstatic.com'/>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
              'debug_mode':true
            });
          `
            }}
          />
          <Script id={'Segment'}>
            {
              !function () {
                var analytics = (window.analytics = window.analytics || [])
                if (!analytics.initialize)
                  if (analytics.invoked)
                    window.console && console.error && console.error('Segment snippet included twice.')
                  else {
                    analytics.invoked = !0
                    analytics.methods = [
                      'trackSubmit',
                      'trackClick',
                      'trackLink',
                      'trackForm',
                      'pageview',
                      'identify',
                      'reset',
                      'group',
                      'track',
                      'ready',
                      'alias',
                      'debug',
                      'page',
                      'once',
                      'off',
                      'on',
                      'addSourceMiddleware',
                      'addIntegrationMiddleware',
                      'setAnonymousId',
                      'addDestinationMiddleware'
                    ]
                    analytics.factory = function (e) {
                      return function () {
                        var t = Array.prototype.slice.call(arguments)
                        t.unshift(e)
                        analytics.push(t)

                        return analytics
                      }
                    }
                    for (var e = 0; e < analytics.methods.length; e++) {
                      var key = analytics.methods[e]
                      analytics[key] = analytics.factory(key)
                    }
                    analytics.load = function (key, e) {
                      var t = document.createElement('script')
                      t.type = 'text/javascript'
                      t.async = !0
                      t.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js'
                      var n = document.getElementsByTagName('script')[0]
                      n.parentNode.insertBefore(t, n)
                      analytics._loadOptions = e
                    }
                    analytics._writeKey = 'afrC8HICJjGr6a3deFog7xy3uuOXObdj'
                    analytics.SNIPPET_VERSION = '4.15.3'
                    analytics.load('afrC8HICJjGr6a3deFog7xy3uuOXObdj')
                    analytics.page()
                  }
              }
            }
            ();
          </Script>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
          />
          <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png'/>
          <link rel='shortcut icon' href='/images/apple-touch-icon.png'/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage || null
  const cache = createEmotionCache()
  const {extractCriticalToChunks} = createEmotionServer(cache)
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
        (
          <App
            {...props} // @ts-ignore
            emotionCache={cache}
          />
        )
    })
  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)

  const emotionStyleTags = emotionStyles.styles.map(style => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{__html: style.css}}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    )
  })

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
