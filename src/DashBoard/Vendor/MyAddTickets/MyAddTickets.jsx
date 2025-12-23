import React from 'react';
import useAuth from '../../../Component/Auth/AuthContext/useAuth';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Edit, MapPin, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyAddTickets = () => {
    const { user } = useAuth();
    const axios = UseAxios();
    const navigate = useNavigate();
    const { refetch, data: myAddTickets = [] } = useQuery({
        queryKey: ["Tickets", user.email],
        queryFn: async () => {
            const res = await axios.get(`/tickets/user/${user.email}`);
            return res.data;
        }
    })
    // console.log(myAddTickets);
    const sortedTickets = [...myAddTickets].sort((a, b) => {
        if (a.verificationStatus === 'pending' && b.verificationStatus !== 'pending') return -1;
        if (a.verificationStatus !== 'pending' && b.verificationStatus === 'pending') return 1;
        return 0;
    });

    const handleDelete = (id) => {
        console.log(id);
        axios.delete(`/tickets/delete/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ticket Updated Successfully',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    refetch();
                }
            })
    };

    const handleUpdate = (id) => {
        console.log(id);
        navigate(`/dashboard/updateTicket/${id}`);
    };

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold ">My Added Tickets</h1>
                    <span className=" text-sm">Manage your inventory and status</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedTickets.map((ticket) => (
                        <div
                            key={ticket._id}
                            className=" rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
                        >

                            <div className="relative h-48">
                                <img
                                    src={ticket.image}
                                    alt={ticket.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3">
                                    {
                                        ticket.verificationStatus === "pending" && <span className="text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase"><span className="loading loading-ring loading-xs"></span>
                                            Pending</span>}
                                    {ticket.verificationStatus === "approved" && <span className=" text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Accepted</span>}
                                    {ticket.verificationStatus === "rejected" && <span className="text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Rejected</span>}
                                </div>
                            </div>

                            <div className="p-5 flex flex-col grow">
                                <h3 className="text-xl font-bold  mb-2 truncate" title={ticket.title}>
                                    {ticket.title}
                                </h3>

                                <div className="flex items-center gap-2  mb-3 text-sm">
                                    <MapPin size={16} className="shrink-0" />
                                    <span className="font-medium">{ticket.from}</span>
                                    <span>→</span>
                                    <span className="font-medium">{ticket.to}</span>
                                </div>


                                <div className="flex items-center gap-2  mb-4 text-xs">
                                    <Calendar size={14} />
                                    {new Date(ticket.departureTime).toLocaleDateString()}
                                    <span className="mx-1">•</span>
                                    {new Date(ticket.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-lg border border-gray-100">
                                    <div>
                                        <p className="text-xs  uppercase">Price</p>
                                        <p className="font-bold">৳{ticket.price}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs  uppercase">Qty</p>
                                        <p className="font-bold ">{ticket.quantity}</p>
                                    </div>
                                </div>

                                {/* update button */}
                                <div className="mt-auto flex gap-3 pt-2 border-t border-gray-100">
                                    <button
                                        onClick={() => handleUpdate(ticket._id)}
                                        disabled={ticket.verificationStatus === 'rejected'}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors
                      ${ticket.verificationStatus === 'rejected'
                                                ? 'cursor-not-allowed'
                                                : ' hover:text-blue-500'
                                            }`}
                                    >
                                        <Edit size={16} /> Update
                                    </button>

                                    {/* delete button */}
                                    <button
                                        onClick={() => handleDelete(ticket._id)}
                                        disabled={ticket.verificationStatus === 'rejected'}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors
                      ${ticket.verificationStatus === 'rejected'
                                                ? ' cursor-not-allowed'
                                                : 'hover:text-red-400'
                                            }`}
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>

                                {ticket.verificationStatus === 'rejected' && (
                                    <p className="text-xs text-center mt-2 italic">
                                        Actions disabled (Ticket Rejected)
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyAddTickets;