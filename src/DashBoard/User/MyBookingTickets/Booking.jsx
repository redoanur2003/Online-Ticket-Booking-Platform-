import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import UseAxios from '../../../Hook/UseAxios/UseAxios';

const Booking = ({ booking }) => {
    const axios = UseAxios();
    const [timeLeft, setTimeLeft] = useState({});
    const [isExpired, setIsExpired] = useState(false);
    console.log("id ", booking.ticketId)

    const { data: ticket = [] } = useQuery({
        queryKey: ["Tickets", booking.ticketId],
        queryFn: async () => {
            const res = await axios.get(`/tickets/id/${booking.ticketId}`);
            return res.data;
        }
    })

    // 1. Countdown Logic
    useEffect(() => {
        if (booking.status === 'rejected') return;

        const calculateTimeLeft = () => {
            const difference = +new Date(ticket.departureTime) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    m: Math.floor((difference / 1000 / 60) % 60),
                    s: Math.floor((difference / 1000) % 60),
                });
                setIsExpired(false);
            } else {
                setIsExpired(true);
                setTimeLeft({});
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [ticket.departureTime, booking.status]);

    return (
        <div className=" rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">

            <div className="relative h-48">
                <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-3 right-3 shadow-sm">
                    {booking.status.toLowerCase() === "pending" && <span className=" px-3 py-1 text-yellow-500 bg-base-100 rounded-full text-xs font-bold uppercase"><span className="loading loading-ring loading-xs"></span>
                        Pending</span> ||
                        booking.status.toLowerCase() === "accepted" && <span className=" text-blue-800 bg-base-100 px-3 py-1 rounded-full text-xs font-bold uppercase">Accepted</span> ||
                        booking.status.toLowerCase() === "rejected" && <span className="text-red-800 bg-base-100  px-3 py-1 rounded-full text-xs font-bold uppercase">Rejected</span> ||
                        booking.status.toLowerCase() === "paid" && <span className="text-green-800 bg-base-100  px-3 py-1 rounded-full text-xs font-bold uppercase">Paid</span>}
                </div>
            </div>

            <div className="p-5 flex flex-col grow">
                <h3 className="text-xl font-bold  mb-2 truncate">
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
                    {new Date(ticket.departureTime).toLocaleString()}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-lg">
                    <div>
                        <p className="text-xs ">Quantity</p>
                        <p className="font-bold ">{booking.bookQuantity}</p>
                    </div>
                    <div>
                        <p className="text-xs ">Total Price</p>
                        <p className="font-bold text-blue-600">৳{booking.totalPrice}</p>
                    </div>
                </div>

                {booking.status !== 'rejected' && !isExpired && (
                    <div className="mb-4 text-center py-2 rounded-md">
                        <p className="text-[10px] uppercase tracking-wider  mb-1">Departure In</p>
                        <div className="font-mono font-bold text-sm flex justify-center gap-3">
                            <span>{timeLeft.d || 0}d</span>
                            <span>{timeLeft.h || 0}h</span>
                            <span>{timeLeft.m || 0}m</span>
                            <span>{timeLeft.s || 0}s</span>
                        </div>
                    </div>
                )}

                {isExpired && (
                    <div className="mb-4 text-center bg-red-50  py-2 rounded-md text-sm font-semibold border border-red-100">
                        <AlertCircle size={16} className="inline mr-1" /> Time Expired
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-auto pt-2 border-t border-gray-100">
                    {booking.status.toLowerCase() === 'accepted' && !isExpired && (
                        <button className="w-full  hover:bg-green-700  font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <CreditCard size={18} /> Pay Now
                        </button>
                    )}

                    {booking.status.toLowerCase() === 'pending' && (
                        <button className="w-full   font-bold py-2 rounded-lg">
                            <span className="loading loading-ring loading-xs"></span>
                            Waiting for Approval
                        </button>
                    )}

                    {booking.status.toLowerCase() === 'paid' && isExpired === false && (
                        <button className="w-full  hover:bg-blue-700 text-blue-600 font-bold py-2 rounded-lg  border border-blue-100">
                            Payment Complete
                        </button>
                    )}

                    {booking.status.toLowerCase() === 'rejected' && (
                        <button className="w-full text-red-500 font-bold py-2 rounded-lg border border-red-100">
                            Booking Rejected
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;