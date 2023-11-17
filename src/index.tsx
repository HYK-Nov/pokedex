import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import './index.scss'
import {MantineProvider} from "@mantine/core";
import theme from "./styles/theme.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router.tsx";
import {RecoilRoot} from "recoil";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RecoilRoot>
            <MantineProvider theme={theme}>
                <RouterProvider router={router}/>
            </MantineProvider>
        </RecoilRoot>
    </React.StrictMode>,
)
