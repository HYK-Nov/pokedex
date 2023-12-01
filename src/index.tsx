import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import './styles/index.scss'
import {MantineProvider} from "@mantine/core";
import theme from "./styles/theme.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx";
import {RecoilRoot} from "recoil";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <MantineProvider theme={theme}>
                    <ReactQueryDevtools/>
                    <RouterProvider router={router}/>
                </MantineProvider>
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>,
)
