/* eslint-disable react/no-danger */
import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '~/styles/theme'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const sheet = new ServerStyleSheets()

    const page = ctx.renderPage((App: any) => (props: any) => sheet.collect(<App {...props} />))
    const styleTag = sheet.getStyleElement()

    return {
      ...initialProps,
      ...page,
      styles: [...React.Children.toArray(initialProps.styles), styleTag],
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" href={`${process.env.PUBLIC_URL}/icon-32x32.png`} sizes="32x32" />
          <link rel="icon" href={`${process.env.PUBLIC_URL}/icon-192x192.png`} sizes="192x192" />
          <link rel="apple-touch-icon" href={`${process.env.PUBLIC_URL}/icon-192x192.png`} />
          <link rel="manifest" href={`${process.env.PUBLIC_URL}/manifest.json`} />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="preload" as="style" href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/materialicons/v78/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2"
            as="font"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/materialicons/v78/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
            as="font"
            type="font/woff2"
          />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
          <script async src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_OPTIMIZE_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                'optimize_id': '${process.env.NEXT_PUBLIC_OPTIMIZE_ID}'
              });

              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                ga('create', '${process.env.NEXT_PUBLIC_GA_ID}', 'auto');
                ga('send', 'pageview')
              `,
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              title="GTM"
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
