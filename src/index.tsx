import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'

import { App } from './components/App';
import { createClient } from './helpers/createClient'

import * as serviceWorker from './serviceWorker';
import './index.css';

const Loading: React.FC<{}> = () => {
  return <p>Loading...</p>
}

const Root: React.FC<{}> = () => {
  const [client, setClient] = useState<ApolloClient<any>>()

  useEffect(() => {
    createClient().then(client => setClient(client))
  }, [])

  return !client ? <Loading /> : <ApolloProvider client={client}><App /></ApolloProvider>
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
