import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { AppProvider } from '../context/AppProvider';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AppProvider>
  );
}

export default MyApp;
