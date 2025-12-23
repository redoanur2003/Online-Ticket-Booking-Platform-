import React from 'react';
import image from '../../assets/ticketBari.jpg';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="  border-t-2 border-gray-100 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    <div className="flex flex-col items-start">
                        <NavLink to="/">
                            <div className="flex items-center gap-x-2 mb-4">
                                <img className="w-10 h-10 rounded-full object-cover" src={image} alt="TicketBari Logo" />
                                <h2 className="text-2xl font-bold ">TicketBari</h2>
                            </div>
                        </NavLink>
                        <p className=" text-sm leading-relaxed max-w-xs">
                            Book bus, train, launch & flight tickets easily. Your one-stop solution for travel.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 ">Quick Links</h3>
                        <ul className="space-y-2 ">
                            <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                            <li><Link to="/allTickets" className="hover:text-blue-500 transition-colors">All Tickets</Link></li>
                            <li><Link to="/" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
                            <li><Link to="/" className="hover:text-blue-500 transition-colors">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 ">Contact Info</h3>
                        <ul className="space-y-3 ">
                            <li><span className="font-medium ">Email:</span> support@ticketbari.com</li>
                            <li><span className="font-medium ">Phone:</span> +880 1234 567 890</li>

                            <li className="pt-2">
                                <nav className="flex gap-4 items-center">
                                    <a href="#" className="group flex flex-col items-center gap-1 hover:text-pink-600 transition">
                                        <FaInstagram size={24} />
                                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-4   px-1 rounded">IG</span>
                                    </a>
                                    <a href="#" className="group flex flex-col items-center gap-1 hover: transition">
                                        <FaXTwitter size={24} />
                                    </a>
                                    <a href="#" className="group flex flex-col items-center gap-1 hover:text-blue-600 transition">
                                        <FaFacebook size={24} />
                                    </a>
                                </nav>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 ">Payment Methods</h3>
                        <div className="flex flex-wrap gap-3">
                            <div className=" border px-4 py-2 rounded  font-bold text-sm">
                                Stripe
                            </div>
                            <div className=" border px-4 py-2 rounded  font-bold text-sm">
                                Visa
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t pt-8 mt-8">
                    <p className=" text-sm text-center">
                        &copy; 2025 TicketBari. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;