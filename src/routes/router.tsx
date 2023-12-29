import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/layout/Layout.tsx";
import Main from "../pages/main";
import Detail from "../pages/detail";
import Category from "../pages/category";
import Error from "../exception/Error.tsx";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Main/>,
                errorElement: <Error/>,
            },
            {
                path: "/:pokemonId",
                element: <Detail/>,
                errorElement: <Error/>,
            },
            {
                path: "/category",
                element: <Category/>,
            },
        ],
    }
])