import React from 'react';
import UseAxios from '../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const SomeInfo = () => {
    const axiosSecure = UseAxios();

    const { data: newAdd = [] } = useQuery({
        queryKey: ["New"],
        queryFn: async () => {
            const res = await axiosSecure.get("/newTickets");
            return res.data;
        }
    })

    const { data: advertisement = [] } = useQuery({
        queryKey: ["AdvertisementTickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/advertisementTickets");
            return res.data;
        }
    })


    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className='text-center text-2xl'>For Advertisement</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advertisement.map((info) => (
                    <div
                        key={info._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
                    >
                        <div className="relative h-52 w-full">
                            <img
                                src={info.image}
                                alt={info.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                {info.transportType}
                            </div>
                            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                {info.quantity} Left
                            </div>
                        </div>

                        <div className="p-5 flex flex-col grow">

                            {/* Title & Price */}
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-gray-800 leading-tight">
                                    {info.title}
                                </h2>
                                <div className="text-right ml-2">
                                    <span className="text-2xl font-bold flex text-green-600">
                                        <FaBangladeshiTakaSign />{info.price}</span>
                                    <span className="text-xs text-gray-400 font-medium">per unit</span>
                                </div>
                            </div>

                            {/* Perks List */}
                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">
                                    Included Perks
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {info.perks.map((perk, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200"
                                        >
                                            {perk}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="mt-auto w-full btn btn-primary text-white font-medium py-3 rounded-lg transition-colors duration-200 flex justify-center items-center gap-2">
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className=' m-4 mt-10'>
                <h1 className='text-center text-2xl'>New ticket Added</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newAdd.map((info) => (
                        <div
                            key={info._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
                        >
                            <div className="relative h-52 w-full">
                                <img
                                    src={info.image}
                                    alt={info.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    {info.transportType}
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                    {info.quantity} Left
                                </div>
                            </div>

                            <div className="p-5 flex flex-col grow">

                                {/* Title & Price */}
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold text-gray-800 leading-tight">
                                        {info.title}
                                    </h2>
                                    <div className="text-right ml-2">
                                        <span className="text-2xl font-bold flex text-green-600">
                                            <FaBangladeshiTakaSign />{info.price}</span>
                                        <span className="text-xs text-gray-400 font-medium">per unit</span>
                                    </div>
                                </div>

                                {/* Perks List */}
                                <div className="mb-6">
                                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">
                                        Included Perks
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {info.perks.map((perk, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200"
                                            >
                                                {perk}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button className="mt-auto w-full btn btn-primary text-white font-medium py-3 rounded-lg transition-colors duration-200 flex justify-center items-center gap-2">
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SomeInfo;