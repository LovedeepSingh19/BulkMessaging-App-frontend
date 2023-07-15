import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: "http://localhost:8080/graphql",
    credentials: "include"
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})