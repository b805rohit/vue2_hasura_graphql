import Vue from "vue";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";

import VueApollo from "vue-apollo";
// Http endpoint

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_BASE_URL_GRAPHQL,
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.VUE_APP_HASURA_SECRET
  }
});

const wsLink = new WebSocketLink({
  uri:process.env.VUE_APP_BASE_URL_WEBSOCKET,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": process.env.VUE_APP_HASURA_SECRET
      }
    }
  }
}); 

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
Vue.use(VueApollo);

const defaultOptions =  {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions:defaultOptions
});

// Call this in the Vue app file
export function createProvider() {
  return new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $loadingKey: "loading",
      ssr: false,
      fetchPolicy: "no-cache"
    }
  });
}

export default { createProvider, apolloClient };