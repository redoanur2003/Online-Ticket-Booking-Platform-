import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import UseAxios from '../../Hook/UseAxios/UseAxios';
import { MapPin, Calendar, Bus, AlertCircle, Clock, CheckCircle, Train, Plane } from 'lucide-react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import useAuth from '../../Component/Auth/AuthContext/useAuth';
import { IoIosBoat } from "react-icons/io";
import Swal from 'sweetalert2';

const SingleTicket = () => {
    const { id } = useParams();
    // console.log('id is', id);
    const axios = UseAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { refetch, data: ticket = [] } = useQuery({
        queryKey: ["Tickets", id],
        queryFn: async () => {
            const res = await axios.get(`/tickets/id/${id}`);
            return res.data;
        }
    })

    // console.log('Ticket info: ', tickets);s

    const [timeLeft, setTimeLeft] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookQuantity, setBookQuantity] = useState(1);
    const [isExpired, setIsExpired] = useState(false);

    //  Countdown
    useEffect(() => {
        if (!ticket?.departureTime) return;

        const calculateTimeLeft = () => {
            const difference = new Date(ticket.departureTime) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
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
    }, [ticket?.departureTime]);

    // const transportIcons = {
    //     bus: <Bus size={16} />,
    //     train: <Train size={16} />,
    //     plane: <Plane size={16} />,
    //     launch: <IoIosBoat size={16} />,
    // };



    // 4. Handlers
    const handleBookingSubmit = (e) => {
        e.preventDefault();

        // Validation check
        if (bookQuantity > ticket.quantity) {
            Swal.fire({
                position: 'top-right',
                title: `Error: You cannot book more than ${ticket.quantity} seats.`,
                icon: "warning",
                draggable: true,
                timer: 1000
            });
            return;
        }
        if (bookQuantity <= 0) {
            Swal.fire({
                position: 'top-right',
                title: "At least one ticket",
                icon: "warning",
                draggable: true,
                timer: 1000
            });
            return;
        }

        // convert data into object
        const bookingData = {
            ticketId: ticket._id,
            email: user.email,
            bookQuantity: bookQuantity,
            totalPrice: bookQuantity * ticket.price,
            status: "pending"
        };
        // console.log(bookingData.bookQuantity);

        Swal.fire({
            title: "Agree with the Cost?",
            text: `You will be charged ${bookingData.totalPrice} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {

                // save the ticket info to the database
                axios.post('/ticketPurchaseInfo', bookingData)
                    .then(res => {
                        console.log('after saving ticket purchase ', res.data);
                        if (res.data.insertedId) {
                            //ticket info update
                            const tq = {
                                "q": ticket.quantity - bookingData.bookQuantity
                            }

                            // console.log("availableTicket: ", tq.q);

                            axios.patch(`/tickets/${bookingData.ticketId}`, tq)
                                .then(res => {
                                    console.log(res.data);
                                    if (res.data.modifiedCount) {
                                        refetch();
                                    }
                                });

                            navigate('/dashboard/myBookingTickets')
                        }
                    })


            }
        });
        setIsModalOpen(false);
    };

    // Derived State for Button Disabling

    const isButtonDisabled = isExpired || ticket.quantity === 0;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

                {/* Image & Countdown */}
                <div className="relative h-64 lg:h-auto">
                    <img
                        src={ticket.image}
                        alt={ticket.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-blue-600 flex items-center gap-1">
                        {ticket.transportType?.toLowerCase() === 'bus' && <Bus size={16} /> || ticket.transportType?.toLowerCase() === 'train' && <Train size={16} /> ||
                            ticket.transportType?.toLowerCase() === 'plane' && <Plane size={16} /> || ticket.transportType?.toLowerCase() === 'launch' && <IoIosBoat size={16} />}
                        {/* {transportIcons[ticket.transportType?.toLowerCase()]} */}
                        {ticket.transportType}
                    </div>

                    {/* Countdown Overlay */}
                    {!isExpired ? (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-widest mb-1 text-gray-300">Departure In</p>
                            <div className="flex justify-center gap-4 text-xl font-mono font-bold">
                                <span>{timeLeft.days || 0}d</span>
                                <span>{timeLeft.hours || 0}h</span>
                                <span>{timeLeft.minutes || 0}m</span>
                                <span>{timeLeft.seconds || 0}s</span>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white p-4 text-center">
                            <p className="font-bold flex items-center justify-center gap-2">
                                <AlertCircle size={20} /> Departure Time Passed
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column: Details */}
                <div className="p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{ticket.title}</h1>
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-green-400">
                                {ticket.verificationStatus}
                            </span>
                        </div>

                        {/* Route Info */}
                        <div className="flex items-center gap-2 text-gray-600 mb-6 text-lg">
                            <MapPin className="text-red-500" />
                            <span className="font-medium">{ticket.from}</span>
                            <span className="text-gray-400">→</span>
                            <span className="font-medium">{ticket.to}</span>
                        </div>

                        {/* Price & Seats */}
                        <div className="grid grid-cols-2 gap-4 mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div>
                                <p className="text-sm text-gray-500">Price per Ticket</p>
                                <p className="text-2xl font-bold flex text-blue-600"><FaBangladeshiTakaSign />{ticket.price}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Available Seats</p>
                                <p className={`text-2xl font-bold ${ticket.quantity < 5 ? 'text-red-500' : 'text-gray-800'}`}>
                                    {ticket.quantity}
                                </p>
                            </div>
                        </div>

                        {/* Departure Info */}
                        <div className="mb-6 space-y-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Calendar size={18} className="text-gray-400" />
                                <span>Departure Date: <strong>{new Date(ticket.departureTime).toLocaleDateString()}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Clock size={18} className="text-gray-400" />
                                <span>Departure Time: <strong>{new Date(ticket.departureTime).toLocaleTimeString()}</strong></span>
                            </div>
                        </div>

                        {/* Perks */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Perks & Amenities</h3>
                            <div className="flex flex-wrap gap-2">
                                {ticket?.perks?.map((perk, index) => (
                                    <span key={index} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                        <CheckCircle size={14} className="text-green-500" /> {perk}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={isButtonDisabled}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-lg
              ${isButtonDisabled
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                                : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'
                            }`}
                    >
                        {isExpired
                            ? 'Departure Passed'
                            : ticket.quantity === 0
                                ? 'Sold Out'
                                : 'Book Now'}
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Confirm Booking</h2>
                        <p className="text-gray-500 mb-6">Select how many tickets you want to book.</p>

                        <form onSubmit={handleBookingSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Max: {ticket.quantity})</label>
                                <input
                                    type="number"
                                    value={bookQuantity}
                                    onChange={(e) => setBookQuantity(parseInt(e.target.value))}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-semibold"
                                    required
                                />
                            </div>

                            {/* Total Price Calculation */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                                <span className="text-gray-600">Total Price:</span>
                                <span className="text-xl font-bold text-blue-600">৳{bookQuantity * ticket.price}</span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleTicket;