import { useState } from 'react';
import { NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';
import image from '../../assets/ticketBari.jpg'


const NavBar = () => {
    const [state, setState] = useState(false);


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
                        <li className="hover:text-cyan-300 hover:underline">
                            Home</li>

                        <li className="hover:text-cyan-300 hover:underline cursor-pointer transition-colors">
                            All Tickets</li>

                        <li className="hover:text-cyan-300 hover:underline">
                            DashBoard</li>

                        <li className="hover:text-cyan-300 hover:underline">
                            Login</li>

                        <li className="hover:text-cyan-300 hover:underline">
                            Register</li>
                    </ul>
                </div>
            </div>

            <div className="flex items-center">

                <ul className="hidden md:flex text-black gap-6">
                    <li className="hover:text-cyan-300 hover:underline">
                        Home</li>

                    <li className="hover:text-cyan-300 hover:underline">
                        All Tickets</li>

                    <li className="hover:text-cyan-300 hover:underline">
                        DashBoard</li>

                    <li className="hover:text-cyan-300 hover:underline">
                        Login</li>

                    <li className="hover:text-cyan-300 hover:underline">
                        Register</li>
                </ul>

            </div>

            <div>
                <div className='flex gap-3'>
                    <button className=' text-black btn btn-primary'>Login</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
