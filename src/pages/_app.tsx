import { themess } from '@/chakra/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={themess}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
