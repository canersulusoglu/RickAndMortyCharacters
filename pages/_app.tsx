import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from 'utils/apolloClient'
import { FilterProvider } from 'context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <FilterProvider>
        <Component {...pageProps} />
      </FilterProvider>
    </ApolloProvider>
  );
}

export default MyApp
