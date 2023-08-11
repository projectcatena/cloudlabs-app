import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'
import { Provider } from 'jotai'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}
