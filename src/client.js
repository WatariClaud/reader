import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

  
const client = new ApolloClient({
    uri: 'https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql',
    cache: new InMemoryCache()
  });

  export default client;