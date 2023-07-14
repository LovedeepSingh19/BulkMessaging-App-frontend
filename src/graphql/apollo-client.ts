import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: "https://backend-bulk-message-app.vercel.app/graphql",
    credentials: "include"
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})