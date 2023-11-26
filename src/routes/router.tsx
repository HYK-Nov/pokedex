import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/layout/Layout.tsx";
import Main from "../pages/main";
import {loader as detailLoader} from "./detail.ts";
import Detail from "../pages/detail";
import Category from "../pages/category";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Main/>,
            },
            {
                path: "/:pokemonId",
                loader: detailLoader,
                element: <Detail/>,
            },
            {
                path: "/category",
                element: <Category/>,
            },
        ]
    }
])