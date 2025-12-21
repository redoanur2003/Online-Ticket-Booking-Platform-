import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { LogOut, Menu, UserCircle2, X } from 'lucide-react';
import image from '../../assets/ticketBari.jpg'
import useAuth from '../Auth/AuthContext/useAuth';
import Swal from 'sweetalert2';


const NavBar = () => {
    const [state, setState] = useState(false);

    const { user, logOut } = useAuth();
    console.log(user)

    const handleLogOut = () => {
        console.log("Log out click")
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'top-right',
                    title: "LogOut",
                    icon: "success",
                    draggable: true,
                    timer: 1000
                });
            })
            .catch(error => {
                alert(error);
            })
    }


    return (
        <nav className="p-4 flex justify-between items-center border border-b-gray-400">
            <div>

                <NavLink to={'/'} className="flex items-center gap-x-2">
                    <img className="w-10 h-10 rounded-full" src={image} alt="PageLogo" />
                    <h1 className="text-xl text-black font-bold">TicketBari</h1>
                </NavLink>

                <div className="md:hidden relative" onClick={() => setState(!state)}>
                    {state ? <X></X> : <Menu></Menu>}

                    <ul
                        className={`absolute bg-white rounded-lg px-2  shadow-lg duration-1000 ${state ? 'grid gap-4 p-2 w-50 text-xl' : '-ml-40 grid gap-2'}`}>
                        <Link to='/' className="hover:text-cyan-300 hover:underline">
                            Home</Link>

                        <Link to='/allTIckets' className="hover:text-cyan-300 hover:underline cursor-pointer transition-colors">
                            All Tickets</Link>

                        <Link to='dashBoard' className="hover:text-cyan-300 hover:underline">
                            DashBoard</Link>

                        {user ? <Link to='/dashBoard/profile'>Profile</Link> :
                            <div className='grid gap-4'>
                                <Link to='login' className="hover:text-cyan-300 hover:underline">
                                    Login</Link>

                                <Link to='register' className="hover:text-cyan-300 hover:underline">
                                    Register</Link>
                            </div>
                        }
                    </ul>
                </div>
            </div>

            <div className="flex items-center">

                <ul className="hidden md:flex text-black gap-6">
                    <Link to='/' className="hover:text-cyan-300 hover:underline">
                        Home</Link>

                    <Link to='/allTickets' className="hover:text-cyan-300 hover:underline">
                        All Tickets</Link>

                    <Link to='/dashBoard' className="hover:text-cyan-300 hover:underline">
                        DashBoard</Link>

                    {user ? <Link to='/dashBoard/profile'>Profile</Link> :
                        <div className='flex gap-6'>
                            <Link to='login' className="hover:text-cyan-300 hover:underline">
                                Login</Link>

                            <Link to='register' className="hover:text-cyan-300 hover:underline">
                                Register</Link>
                        </div>
                    }
                </ul>

            </div>

            <div>

                {user ?
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="rounded-full">{<UserCircle2></UserCircle2>}</div>
                        <ul tabIndex="" className="dropdown-content menu bg-base-100 -ml-15 rounded-box p-2">
                            <Link to='/dashboard/profile'>
                                <li className='p-2 hover:shadow-lg'>Profile</li>
                            </Link>
                            <button onClick={() => handleLogOut()} className='p-2 flex btn btn-primary text-black'> <LogOut size={16}></LogOut>LogOut</button>
                        </ul>
                    </div>
                    :
                    <div className='flex gap-3'>
                        <NavLink to='/login'>
                            <button className=' text-black btn btn-primary'>Login</button>
                        </NavLink>
                    </div>
                }
            </div>
        </nav>
    );
};

export default NavBar;
