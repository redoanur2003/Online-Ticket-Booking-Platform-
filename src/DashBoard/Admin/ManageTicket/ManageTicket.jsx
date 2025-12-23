import React from 'react';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { Check, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const ManageTicket = () => {
    const axios = UseAxios();
    const navigate = useNavigate();
    const { refetch, data: tickets = [] } = useQuery({
        queryKey: ["Tickets",],
        queryFn: async () => {
            const res = await axios.get(`/tickets`);
            return res.data;
        }
    })

    const setTicket = [...tickets].sort((a, b) => {
        if (a.verificationStatus === 'pending' && b.verificationStatus !== 'pending') return -1;
        if (a.verificationStatus !== 'pending' && b.verificationStatus === 'pending') return 1;
        return 0;
    });
    // console.log(setTicket);

    const handleStatus = (id, status) => {
        console.log(id, status);
        const data = { status };
        axios.patch(`/tickets/admin/${id}`, data)
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
                    navigate('/allTickets');
                }
            })
    };
    return (
        <>
            <h1 className='text-center text-2xl'>Managing ticket</h1>

            <div className="p-6 min-h-screen">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold ">Managing Added tickets</h1>
                        <p className="">Manage vendor requested tickets</p>
                    </div>

                    {/* Table Container */}
                    {setTicket.length > 0 ?
                        <div className=" rounded-xl shadow-md overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">

                                    {/* Table Head */}
                                    <thead className=" uppercase text-xs font-bold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Title</th>
                                            <th className="px-6 py-4">Image</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4 text-center">From</th>
                                            <th className="px-6 py-4">To</th>
                                            <th className="px-6 py-4">Price</th>
                                            <th className="px-6 py-4">Quantity</th>
                                            <th className="px-6 py-4">DepartureTime</th>
                                            <th className="px-6 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {setTicket.map((req) => (
                                            <tr key={req._id} className="hover:bg-green-500 transition-colors">

                                                {/*  title  */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 font-semibold ">
                                                        <h1>{req.title}</h1>
                                                    </div>
                                                </td>
                                                {/* image */}

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 font-medium ">
                                                        <img className='rounded-2xl' src={req.image} alt={req.title} />
                                                    </div>
                                                </td>

                                                {/* Ticket type */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 font-medium ">
                                                        <h1>{req.transportType}</h1>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <span className=" px-3 py-1 rounded-full font-bold">
                                                        {req.from}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 font-bold ">
                                                    {req.to}
                                                </td>

                                                <td className="px-6 py-4 font-bold ">
                                                    {req.price}
                                                </td>

                                                <td className="px-6 py-4 font-bold ">
                                                    {req.quantity}
                                                </td>

                                                <td className="px-6 py-4 font-bold ">
                                                    <div className=''>
                                                        <strong>{new Date(req.departureTime).toLocaleDateString()}</strong>
                                                        <p>{new Date(req.departureTime).toLocaleTimeString()}</p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    {req.verificationStatus === 'pending' ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleStatus(req._id, 'approved')}
                                                                className=" hover:bg-green-300 hover:text-black p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                                title="Accept Request"
                                                            >
                                                                <Check size={16} /> Accept
                                                            </button>

                                                            <button
                                                                onClick={() => handleStatus(req._id, 'rejected')}
                                                                className="  hover:bg-red-200 hover:text-red-800 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                                title="Reject Request"
                                                            >
                                                                <X size={16} /> Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        // Status Badge if already processed
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                                           ${req.verificationStatus === 'approved' ? ' ' : ' '}`}>
                                                            {req.verificationStatus}
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
        </>
    );
};

export default ManageTicket;