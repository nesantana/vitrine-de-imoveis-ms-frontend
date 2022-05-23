import React from 'react'
import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html translate="no">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Condensed&display=swap" rel="stylesheet" />
          <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ca992385d4fcc64" />
          <script
            async
            defer
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE}&libraries=places`}
          />
        </Head>
        <body>
          <div id="fb-root" />
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v13.0&appId=2265940586964005&autoLogAppEvents=1"
            nonce="vxcDoudn"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
