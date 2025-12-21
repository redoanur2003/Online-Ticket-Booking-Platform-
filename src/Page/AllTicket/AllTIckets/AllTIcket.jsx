import React, { useEffect, useMemo, useState } from 'react';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { FaBangladeshiTakaSign, FaLocationArrow, FaLocationPin } from 'react-icons/fa6';
// import { useForm, useWatch } from 'react-hook-form';
import Loading from '../../../Component/Loading/Loading';
import { NavLink } from 'react-router';
import { Calendar, Clock } from 'lucide-react';


const AllTIcket = () => {

    const axios = UseAxios();
    const [type, setType] = useState('');
    const [tick, setTick] = useState([]);

    const { data: allTicket = [] } = useQuery({
        queryKey: ["Tickets"],
        queryFn: async () => {
            const res = await axios.get("/tickets");
            return res.data;
        }
    })

    const { data: user = [] } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axios.get("/users");
            return res.data;
        }
    })


    const vendors = useMemo(() => {
        return user
            .filter(u => u.role?.toLowerCase() === 'fraud')
            .map(u => u.email);
    }, [user]);

    useEffect(() => {
        if (!allTicket.length) return;

        let filtered = allTicket.filter(
            t => t.verificationStatus === 'approved'
        );

        // hide fraud vendor tickets
        filtered = filtered.filter(
            t => !vendors.includes(t.vendorEmail)
        );

        setTick(filtered);
    }, [allTicket, vendors, type]);

    //handel select
    const handleSelect = (selectedItem) => {
        if (type === selectedItem) {
            setType('');
            setTick(allTicket);
        } else {
            setType(selectedItem);

            const filteredData = allTicket.filter(
                ticket => ticket.transportType.toLowerCase() === selectedItem.toLowerCase()
            );

            setTick(filteredData);
        }
    };

    // console.log("All ticket: ", allTicket);
    return (
        <>
            <div className=''>
                <h3 className='text-xl text-center'>Select your transportType.</h3>
                <div className='grid grid-cols-2 md:flex justify-center gap-32 p-2 mb-4 '>
                    <p onClick={() => handleSelect('bus')} className={`border text-center w-18 hover:text-green-300 rounded-2xl ${type === 'bus' ? 'bg-green-400' : ''}`}>Bus</p>
                    <p onClick={() => handleSelect('train')} className={`border text-center w-18 hover:text-green-300 rounded-2xl ${type === 'train' ? 'bg-green-400' : ''}`}>Train</p>
                    <p onClick={() => handleSelect('plane')} className={`border text-center w-18 hover:text-green-300 rounded-2xl ${type === 'plane' ? 'bg-green-400' : ''}`}>Air</p>
                    <p onClick={() => handleSelect('launch')} className={`border text-center w-18 hover:text-green-300  rounded-2xl ${type === 'launch' ? 'bg-green-400' : ''}`}>Launch</p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                {allTicket.length > 0 ?
                    (tick.length > 0 ?
                        tick.map((ticket) => (
                            <div
                                key={ticket._id}
                                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border p-3 border-gray-100`}>
                                <div className="relative h-52 w-full">
                                    <img
                                        className="w-full h-full object-cover rounded-2xl"
                                        src={ticket.image}
                                        alt={ticket.title}
                                    />
                                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        {ticket.transportType}
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                        {ticket.quantity} Left
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col grow">

                                    {/* Title & Price */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className="text-xl font-bold text-gray-800 leading-tight">
                                            {ticket.title}
                                        </h2>
                                        <div className="text-right ml-2">
                                            <span className="text-2xl font-bold flex text-green-600">
                                                <FaBangladeshiTakaSign />{ticket.price}</span>
                                            <span className="text-xs text-gray-400 font-medium">per unit</span>
                                        </div>
                                    </div>
                                    {/* destination */}

                                    <div className='flex justify-between text-2xl font-bold mb-4'>
                                        <p>From: {ticket.from}</p>
                                        <p>To: {ticket.to}</p>
                                    </div>

                                    {/* Departure time */}
                                    <div className='flex justify-between text-2xl mb-2'>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Calendar size={18} className="text-gray-400" />
                                            <span>Departure Date: <strong>{new Date(ticket.departureTime).toLocaleDateString()}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock size={18} className="text-gray-400" />
                                            <span>Departure Time: <strong>{new Date(ticket.departureTime).toLocaleTimeString()}</strong></span>
                                        </div>
                                    </div>

                                    {/* Perks List */}
                                    <div className="mb-6">
                                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">
                                            Included Perks
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {ticket.perks.map((perk, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200"
                                                >
                                                    {perk}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <NavLink to={`/tickets/${ticket._id}`}>
                                        <button className="mt-auto w-full btn btn-primary text-white font-medium py-3 rounded-lg transition-colors duration-200 flex justify-center items-center gap-2">
                                            See Details
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        )) : <div className='text-center text-xl text-yellow-300'>
                            <p>There are no type of transport for this category</p>
                        </div>
                    )
                    :
                    <div className='flex justify-center'>
                        <Loading></Loading>
                    </div>
                }
            </div>
        </>
    );
};

export default AllTIcket;