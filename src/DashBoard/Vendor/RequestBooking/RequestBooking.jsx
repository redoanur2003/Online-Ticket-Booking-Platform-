import React from 'react';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { Check, Mail, Ticket, User, X } from 'lucide-react';
import Title from './FindingInfo/Title';
import Userinfo from './FindingInfo/Userinfo';

const RequestBooking = () => {
    const axios = UseAxios();
    const { data: requestedTicket = [] } = useQuery({
        queryKey: ["Tickets",],
        queryFn: async () => {
            const res = await axios.get(`/ticketPurchaseInfo`);
            return res.data;
        }
    })
    console.log(requestedTicket);

    //accept
    const handleAccept = (id) => {
        console.log(id);
    };

    //  Reject Booking
    const handleReject = (id) => {
        console.log(id);

    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Requested Bookings</h1>
                    <p className="text-gray-500">Manage user booking requests for your tickets</p>
                </div>

                {/* Table Container */}
                {requestedTicket.length > 0 ?
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">

                                {/* Table Head */}
                                <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">User Info</th>
                                        <th className="px-6 py-4">Ticket Info</th>
                                        <th className="px-6 py-4 text-center">Qty</th>
                                        <th className="px-6 py-4">Total Price</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {requestedTicket.map((req) => (
                                        <tr key={req._id} className="hover:bg-gray-50 transition-colors">

                                            {/*  User Name/Email  */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                        <User size={16} className="text-blue-500" />
                                                        <Userinfo info={req.email}></Userinfo>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                                        <Mail size={14} />
                                                        {req.email}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Ticket Title */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 font-medium text-gray-700">
                                                    <Ticket size={16} className="text-gray-400" />
                                                    <Title id={req.ticketId}></Title>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
                                                    {req.bookQuantity}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 font-bold text-gray-800">
                                                ৳{req.totalPrice.toLocaleString()}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                {req.status.toLowerCase() === 'pending' ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleAccept(req.id)}
                                                            className="bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-800 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                            title="Accept Request"
                                                        >
                                                            <Check size={16} /> Accept
                                                        </button>

                                                        <button
                                                            onClick={() => handleReject(req.id)}
                                                            className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                            title="Reject Request"
                                                        >
                                                            <X size={16} /> Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    // Status Badge if already processed
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                          ${req.status.toLowerCase() === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                        `}>
                                                        {req.status}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                    : <div>
                        <h1 className='text-center text-2xl'> No tickets are not booking</h1>
                    </div>}
            </div>
        </div>
    );
};

export default RequestBooking;