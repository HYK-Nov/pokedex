import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import './styles/index.scss'
import {MantineProvider} from "@mantine/core";
import theme from "./styles/theme.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx";
import {RecoilRoot} from "recoil";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";

const apolloClient = new ApolloClient({
    link: createHttpLink({uri: 'https://beta.pokeapi.co/graphql/v1beta'}),
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <RecoilRoot>
                <MantineProvider theme={theme}>
                    <RouterProvider router={router}/>
                </MantineProvider>
            </RecoilRoot>
        </ApolloProvider>
    </React.StrictMode>,
)
