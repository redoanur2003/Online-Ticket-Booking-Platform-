import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';
import image from '../../assets/ticketBari.jpg'
import useAuth from '../Auth/AuthContext/useAuth';


const NavBar = () => {
    const [state, setState] = useState(false);

    const { user, logOut } = useAuth();
    console.log(user)

    const handleLogOut = () => {
        logOut()
            .then()
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

                        <Link to='login' className="hover:text-cyan-300 hover:underline">
                            Login</Link>

                        <Link to='register' className="hover:text-cyan-300 hover:underline">
                            Register</Link>
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

                    <Link to='/login' className="hover:text-cyan-300 hover:underline">
                        Login</Link>

                    <Link to='/register' className="hover:text-cyan-300 hover:underline">
                        Register</Link>
                </ul>

            </div>

            <div>

                {user ?
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="rounded-full">{user.displayName}</div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><a>Profile</a></li>
                            <li onClick={handleLogOut}><a>LogOut</a></li>
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
