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
import ErrorPage from "../Page/Error/ErrorPage";
import ErrorTicket from "../Page/Error/ErrorTickets";
import UseAxios from "../Hook/UseAxios/UseAxios";
import VendorRoute from "../Component/Root/VendorRoute";
import AdminRoute from "../Component/Root/AdminRoute";
import MyPayment from "../DashBoard/User/MyPayment/MyPayment";
import UserRoute from "../Component/Root/UserRoute";

const api = UseAxios();
export const router = createBrowserRouter([{
    path: '/',
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index: true, path: '/', Component: Home
        },
        {
            path: '/allTickets', Component: AllTIcket
        },
        {
            path: '/tickets/:id', element: <PrivateRoute><SingleTicket></SingleTicket></PrivateRoute>,
            loader: ({ params }) => api.get(`/tickets/id/${params.id}`),
            errorElement: <ErrorTicket></ErrorTicket>
        }
    ]
},
{
    path: '/',
    Component: AuthLayout,
    errorElement: <ErrorPage></ErrorPage>,
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
    errorElement: <ErrorPage></ErrorPage>,
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
            element: <UserRoute>
                <MyBookingTickets></MyBookingTickets>
            </UserRoute>

        },

        {
            path: '/dashboard/payment-history',
            element: <UserRoute>
                <MyPayment></MyPayment>
            </UserRoute>
        },


        {
            path: '/dashboard/addTicket',
            element: <VendorRoute>
                <VAddTickets></VAddTickets>
            </VendorRoute>
        },
        {
            path: '/dashboard/myAddTickets',
            element: <VendorRoute>
                <MyAddTickets></MyAddTickets>
            </VendorRoute>
        },
        {
            path: '/dashboard/updateTicket/:id',
            errorElement: <ErrorTicket></ErrorTicket>,
            element: <VendorRoute>
                <UpdateTicket></UpdateTicket>
            </VendorRoute>
        },
        {
            path: '/dashboard/requestedBookings',
            element: <VendorRoute>
                <RequestBooking></RequestBooking>
            </VendorRoute>
        },
        {
            path: '/dashboard/revenue',
            element: <VendorRoute>
                <Revenue></Revenue>
            </VendorRoute>
        },
        {
            path: '/dashboard/manageTickets',
            element: <AdminRoute>
                <ManageTicket></ManageTicket>
            </AdminRoute>
        },
        {
            path: '/dashboard/manageUsers',
            element: <AdminRoute>
                <ManageUser></ManageUser>
            </AdminRoute>
        },
        {
            path: '/dashboard/advertiseTickets',
            element: <AdminRoute>
                <AdvertiseTicket></AdvertiseTicket>
            </AdminRoute>
        },
    ]
}
])