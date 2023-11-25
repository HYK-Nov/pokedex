import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/layout/Layout.tsx";
import Main from "../pages/main";
import {loader as detailLoader} from "./detail.ts";
import {loader as mainLoader} from "./main.ts";
import Detail from "../pages/detail";
import Type from "../pages/type";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Main/>,
                loader: mainLoader,

            },
            {
                path: "/:pokemonId",
                loader: detailLoader,
                element: <Detail/>,
            },
            {
                path: "/category",
                element: <Type/>,
            },
        ]
    }
])