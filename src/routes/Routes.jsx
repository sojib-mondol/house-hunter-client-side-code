import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../pages/home/Home";
import PageNotFound from "../pages/shared/pageNotFound/PageNotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <PageNotFound/>,
        children: [
            {
                path:'/',
                element: <Home/>
            },

        ]
    }
])

export default router;