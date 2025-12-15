import { createBrowserRouter } from "react-router";
import Root from "../Component/Root/Root";
import Home from "../Page/Home/Home";
import AuthLayout from "../Component/Root/Authlayout";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import ForgetPassword from "../Page/Login/ForgetPassword";

export const router = createBrowserRouter([{
    path: '/',
    Component: Root,
    children: [
        { index: true, path: '/', Component: Home }
    ]
},
{
    path: '/',
    Component: AuthLayout,
    children: [
        {
            path: '/login',
            Component: Login
        },
        {
            path: '/register',
            Component: Register
        },
        {
            path: '/forget',
            Component: ForgetPassword
        }
    ]
}])