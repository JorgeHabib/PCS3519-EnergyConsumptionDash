import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthContext'
import { globalStyles } from './styles/global'
import Head from 'next/head'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <Head>
          <title>SolarSystem POLI</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
  )
}
