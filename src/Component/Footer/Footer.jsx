import React from 'react';
import image from '../../assets/ticketBari.jpg';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-white text-black border-t-2 border-gray-100 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    <div className="flex flex-col items-start">
                        <NavLink to="/">
                            <div className="flex items-center gap-x-2 mb-4">
                                <img className="w-10 h-10 rounded-full object-cover" src={image} alt="TicketBari Logo" />
                                <h2 className="text-2xl font-bold text-blue-400">TicketBari</h2>
                            </div>
                        </NavLink>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Book bus, train, launch & flight tickets easily. Your one-stop solution for travel.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                            <li><Link to="/tickets" className="hover:text-blue-500 transition-colors">All Tickets</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
                            <li><Link to="/about" className="hover:text-blue-500 transition-colors">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Info</h3>
                        <ul className="space-y-3 text-gray-500">
                            <li><span className="font-medium text-gray-700">Email:</span> support@ticketbari.com</li>
                            <li><span className="font-medium text-gray-700">Phone:</span> +880 1234 567 890</li>

                            <li className="pt-2">
                                <nav className="flex gap-4 items-center">
                                    <a href="#" className="group flex flex-col items-center gap-1 hover:text-pink-600 transition">
                                        <FaInstagram size={24} />
                                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-4 bg-black text-white px-1 rounded">IG</span>
                                    </a>
                                    <a href="#" className="group flex flex-col items-center gap-1 hover:text-black transition">
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
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Payment Methods</h3>
                        <div className="flex flex-wrap gap-3">
                            <div className="bg-gray-100 border border-gray-200 px-4 py-2 rounded text-gray-700 font-bold text-sm">
                                Stripe
                            </div>
                            <div className="bg-gray-100 border border-gray-200 px-4 py-2 rounded text-gray-700 font-bold text-sm">
                                Visa
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                    <p className="text-gray-500 text-sm text-center">
                        &copy; 2025 TicketBari. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;