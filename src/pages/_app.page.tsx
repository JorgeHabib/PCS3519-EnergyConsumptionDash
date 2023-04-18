import type { AppProps } from 'next/app'
import { AuthProvider } from '@/contexts/AuthContext'
import { globalStyles } from './styles/global'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

globalStyles()

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Head>
          <title>SolarSystem POLI</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  )
}
