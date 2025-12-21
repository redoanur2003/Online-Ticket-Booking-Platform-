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
import VAddTickets from "../DashBoard/Vendor/VAddTickets/VAddTickets";
import MyAddTickets from "../DashBoard/Vendor/MyAddTickets/MyAddTickets";
import RequestBooking from "../DashBoard/Vendor/RequestBooking/RequestBooking";
import Revenue from "../DashBoard/Vendor/Revenue/Revenue";
import UpdateTicket from "../DashBoard/Vendor/MyAddTickets/UpdateTicket";
import ManageTicket from "../DashBoard/Admin/ManageTicket/ManageTicket";
import ManageUser from "../DashBoard/Admin/ManageUser/ManageUser";
import AdvertiseTicket from "../DashBoard/Admin/AdvertiseTicket/AdvertiseTicket";

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
        },
        {
            path: '/dashboard/addTicket',
            Component: VAddTickets
        },
        {
            path: '/dashboard/myAddTickets',
            Component: MyAddTickets
        },
        {
            path: '/dashboard/updateTicket/:id',
            Component: UpdateTicket
        },
        {
            path: '/dashboard/requestedBookings',
            Component: RequestBooking
        },
        {
            path: '/dashboard/revenue',
            Component: Revenue
        },
        {
            path: '/dashboard/manageTickets',
            Component: ManageTicket
        },
        {
            path: '/dashboard/manageUsers',
            Component: ManageUser
        },
        {
            path: '/dashboard/advertiseTickets',
            Component: AdvertiseTicket
        },
    ]
}
])