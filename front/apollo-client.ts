import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "your-graphql-api-endpoint",
  cache: new InMemoryCache(),
});

export default client;
