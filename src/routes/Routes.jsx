import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../pages/home/Home";
import PageNotFound from "../pages/shared/pageNotFound/PageNotFound";
import SignUp from "../pages/shared/signUp/SignUp";
import Login from "../pages/shared/login/Login";

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
            {
                path:'/signup',
                element: <SignUp/>
            },
            {
                path:'/login',
                element: <Login/>
            },

        ]
    }
])

export default router;