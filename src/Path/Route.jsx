import { createBrowserRouter } from "react-router";
import Root from "../Component/Root/Root";
import Home from "../Page/Home/Home";
import AuthLayout from "../Component/Root/Authlayout";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import ForgetPassword from "../Page/Login/ForgetPassword";
import AllTIcket from "../Page/AllTicket/AllTIckets/AllTIcket";
import PrivateRoute from "../Component/Root/PrivateRoute";
import SingleTicket from "../Page/SingleTicket/SingleTicket";
import DashboardLayout from "./DashboardLayout";
import DashBoardHome from "../DashBoard/DashBoardHome/DashBoardHome";
import Profile from "../DashBoard/Profile/Profile";
import MyBookingTickets from "../DashBoard/User/MyBookingTickets/MyBookingTickets";

export const router = createBrowserRouter([{
    path: '/',
    Component: Root,
    children: [
        {
            index: true, path: '/', Component: Home
        },
        {
            path: '/allTickets', Component: AllTIcket
        },
        {
            path: '/tickets/:id', element: <PrivateRoute><SingleTicket></SingleTicket></PrivateRoute>,
        }
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
},
{
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
        {
            index: true,
            Component: DashBoardHome
        },
        {
            path: '/dashboard/profile',
            Component: Profile
        },
        {
            path: '/dashboard/myBookingTickets',
            Component: MyBookingTickets
        }
    ]
}
])