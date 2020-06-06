import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types'
import { setContext } from 'apollo-link-context'

const GQL_ENDPOINT_TOKEN = '5bbbb90c33ea2e49a6a122d91fcc7be1295946d5'
const GQL_ENDPOINT = 'https://api.github.com/graphql'

export async function createClient() {
  const cache = new InMemoryCache()
  await persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>
  })
  const http = new HttpLink({
    uri: GQL_ENDPOINT,
  })
  const setAuthorizationLink = setContext((_request, _previousContext) => ({
    headers: { authorization: 'Bearer ' + GQL_ENDPOINT_TOKEN },
  }))
  const link = ApolloLink.from([setAuthorizationLink, http])

  const client = new ApolloClient({
    cache,
    link,
    connectToDevTools: true,
  })

  return client
}
