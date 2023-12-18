// ./src/services/apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const client = new ApolloClient({
    uri: `https://graphql.prepr.io/${process.env.REACT_APP_PREPR_ACCESS_TOKEN}`,
    cache: new InMemoryCache(),
  });

  return client;
};

export default createApolloClient;
