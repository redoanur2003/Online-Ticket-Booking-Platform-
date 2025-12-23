import React, { useEffect, useState } from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaRegCreditCard } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../Hook/UserRole/useRole';
import logoImg from '../assets/ticketBari.jpg'
import { GitPullRequest, LogOut, Ticket, TicketCheck, User, UserCircle } from 'lucide-react';
import { MdRequestPage } from "react-icons/md";
import { FaRectangleAd, FaRegSquarePlus } from 'react-icons/fa6';
import useAuth from '../Component/Auth/AuthContext/useAuth';
import Swal from 'sweetalert2';

const DashboardLayout = () => {
    const { role } = useRole();
    const { logOut } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

    useEffect(() => {
        const html = document.querySelector('html')
        html.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])


    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light")
    }

    // console.log("role ", role)
    const handleLogOut = () => {
        // console.log("Log out click")
        Swal.fire({
            title: "Agree Sure to LogOut?",
            text: `You will be LogOut!!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            position: 'top-right',
                            title: "LogOut",
                            icon: "success",
                            draggable: true,
                            timer: 1000
                        })
                    })
                    .catch(error => {
                        alert(error);
                    })

            }
        });
    }
    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto ">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 flex justify-between">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">Ticket-Bari Dashboard</div>
                    <div>
                        <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input
                                onChange={(e) => handleTheme(e.target.checked)}
                                defaultChecked={localStorage.getItem('theme') === "dark"}
                                type="checkbox" />

                            {/* sun icon */}
                            <svg
                                className="swap-on h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-off h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>
                </nav>

                {/* Page content here */}
                <div className='mt-4'>
                    <Outlet></Outlet>
                </div>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to="/"><img src={logoImg} alt="" /></Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Home page</span>
                            </Link>
                        </li>
                        <li>
                            <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile" to="/dashboard/profile">
                                <UserCircle size={16} />
                                <span className="is-drawer-close:hidden">My profile </span>
                            </NavLink>
                        </li>

                        {/* our dashboard links */}

                        {role === "user" && <>

                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Booked Tickets" to="/dashboard/myBookingTickets">
                                    <Ticket size={16} />
                                    <span className="is-drawer-close:hidden">My Booked Tickets</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History" to="/dashboard/payment-history">
                                    <FaRegCreditCard />
                                    <span className="is-drawer-close:hidden">Payment History</span>
                                </NavLink>
                            </li>
                        </>
                        }

                        {role === "vendor" && <>

                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Ticket" to="/dashboard/addTicket">
                                    <FaRegSquarePlus size={16} />
                                    <span className="is-drawer-close:hidden">Add Ticket</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Added Tickets" to="/dashboard/myAddTickets">
                                    <Ticket size={16} />
                                    <span className="is-drawer-close:hidden">My Added Tickets</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip=" Requested Bookings" to="/dashboard/requestedBookings">
                                    <GitPullRequest size={16} />
                                    <span className="is-drawer-close:hidden"> Requested Bookings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Revenue Overview" to="/dashboard/revenue">
                                    <MdRequestPage size={16} />
                                    <span className="is-drawer-close:hidden">Revenue Overview </span>
                                </NavLink>
                            </li>
                        </>
                        }

                        {role === "admin" && <>

                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Ticket" to="/dashboard/manageTickets">
                                    <TicketCheck size={16} />
                                    <span className="is-drawer-close:hidden">Manage Tickets</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users" to="/dashboard/manageUsers">
                                    <User size={16} />
                                    <span className="is-drawer-close:hidden">Manage Users</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip=" Advertise Tickets" to="/dashboard/advertiseTickets">
                                    <FaRectangleAd size={16}></FaRectangleAd>
                                    <span className="is-drawer-close:hidden"> Advertise Tickets</span>
                                </NavLink>
                            </li>
                        </>
                        }

                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleLogOut()} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="LogOut">
                                {/* Settings icon */}
                                <LogOut size={16}></LogOut>
                                <span className="is-drawer-close:hidden">LogOut</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;