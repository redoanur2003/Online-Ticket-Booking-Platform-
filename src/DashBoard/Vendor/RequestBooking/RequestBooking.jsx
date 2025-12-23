import React from 'react';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { Check, Mail, Ticket, User, X } from 'lucide-react';
import Title from './FindingInfo/Title';
import Userinfo from './FindingInfo/Userinfo';
import Swal from 'sweetalert2';

const RequestBooking = () => {
    const axios = UseAxios();
    const { refetch, data: requestedTicket = [] } = useQuery({
        queryKey: ["Tickets",],
        queryFn: async () => {
            const res = await axios.get(`/ticketPurchaseInfo`);
            return res.data;
        }
    })
    console.log(requestedTicket);

    //accept
    const handleStatus = (id, status) => {
        // console.log(id, status);
        const data = { status };
        axios.patch(`/ticketPurchaseInfo/status/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${status} update successfully`,
                        timer: 1500,
                        showConfirmButton: false
                    });
                    refetch();
                }
            })
    };


    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold ">Requested Bookings</h1>
                    <p className="">Manage user booking requests for your tickets</p>
                </div>

                {/* Table Container */}
                {requestedTicket.length > 0 ?
                    <div className=" rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">

                                {/* Table Head */}
                                <thead className=" uppercase text-xs font-bold tracking-wider">
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
                                        <tr key={req._id} className="hover:bg-yellow-400 transition-colors">

                                            {/*  User Name/Email  */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2 font-semibold ">
                                                        <User size={16} className="text-blue-500" />
                                                        <Userinfo info={req.email}></Userinfo>
                                                    </div>
                                                    <div className="flex items-center gap-2  text-xs mt-1">
                                                        <Mail size={14} />
                                                        {req.email}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Ticket Title */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 font-medium ">
                                                    <Ticket size={16} className="" />
                                                    <Title id={req.ticketId}></Title>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span className=" px-3 py-1 rounded-full font-bold">
                                                    {req.bookQuantity}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 font-bold">
                                                ৳{req.totalPrice}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                {req.status === 'pending' ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleStatus(req._id, 'accepted')}
                                                            className=" hover:bg-green-200 hover:text-green-800 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                            title="Accept Request"
                                                        >
                                                            <Check size={16} /> Accept
                                                        </button>

                                                        <button
                                                            onClick={() => handleStatus(req._id, 'rejected')}
                                                            className=" hover:bg-red-200 hover:text-red-800 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                            title="Reject Request"
                                                        >
                                                            <X size={16} /> Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    // Status Badge if already processed
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                          ${req.status === 'accepted' ? 'text-green-400 font-black ' : 'font-bold'}
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