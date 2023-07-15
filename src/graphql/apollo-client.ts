import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: "https://vercel.live/link/backend-bulk-message-app-git-main-lovedeepsingh19.vercel.app?via=deployment-domains-list-branch/graphql",
    credentials: "include"
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})