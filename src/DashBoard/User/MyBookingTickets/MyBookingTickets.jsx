import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Component/Auth/AuthContext/useAuth';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import Booking from './Booking';

const MyBookingTickets = () => {
    const { user } = useAuth();
    const axios = UseAxios();
    const { data: myBookings = [] } = useQuery({
        queryKey: ["Tickets", user.email],
        queryFn: async () => {
            const res = await axios.get(`/ticketPurchaseInfo/${user.email}`);
            return res.data;
        }
    })
    return (
        <>
            <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">My Booked Tickets</h1>

                    {myBookings.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myBookings.map((booking) => (
                                <Booking booking={booking} ></Booking>
                            ))}
                        </div> :
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">You haven't booked any tickets yet.</p>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default MyBookingTickets;