import React, { useEffect, useState } from 'react';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { LucideArrowRightSquare, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { MdDone } from 'react-icons/md';

const AdvertiseTicket = () => {
    const axios = UseAxios();
    const [advertised, setAdvertised] = useState([]);
    const [totalAdver, setTotalAdver] = useState(0);
    const [accepted, setAccepted] = useState([]);
    const { refetch, data: tickets = [] } = useQuery({
        queryKey: ["Tickets",],
        queryFn: async () => {
            const res = await axios.get(`/tickets`);
            return res.data;
        }
    })

    //for approved
    useEffect(() => {
        const advTicket = tickets.filter(at => at.verificationStatus === 'approved');
        setAccepted(advTicket);
    }, [tickets]);

    //for add
    useEffect(() => {
        const advTicket = tickets.filter(at => at.isAdvertised === true);
        setAdvertised(advTicket);
        setTotalAdver(advTicket.length);
    }, [tickets]);


    console.log(totalAdver);

    const handleStatus = (id, status) => {
        console.log(id, status);
        const data = { status };
        if (status) {
            if (totalAdver >= 6) {
                alert("You already add 6 advertise ticket!!");
                return;
            }
            else {
                setTotalAdver(totalAdver + 1);
                axios.patch(`/tickets/admin/advertised/${id}`, data)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `Advertised ticket add successfully`,
                                timer: 1500,
                                showConfirmButton: true
                            });
                            refetch();
                        }
                    });
            }
        }

        else {
            setTotalAdver(totalAdver - 1);
            axios.patch(`/tickets/admin/advertised/${id}`, data)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Advertised ticket remove successfully`,
                            timer: 1500,
                            showConfirmButton: true
                        });
                        refetch();
                    }
                })
        }
    };
    return (
        <>
            <h1 className='text-center text-2xl'>Advertise ticket</h1>

            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Advertise Ticket</h1>
                        <p className="text-gray-500">Add Advertise Ticket </p>
                        <p className="text-black">Total Ticket: {accepted.length} </p>
                    </div>

                    {/* Table Container */}
                    {tickets.length > 0 ?
                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">

                                    {/* Table Head */}
                                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Title</th>
                                            <th className="px-6 py-4">Image</th>
                                            <th className="px-6 py-4 text-center flex gap-1">From <LucideArrowRightSquare></LucideArrowRightSquare> To</th>
                                            <th className="px-6 py-4">Price</th>
                                            <th className="px-6 py-4">Quantity</th>
                                            <th className="px-6 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {accepted.map((req) => (
                                            <tr key={req._id} className="hover:bg-gray-50 transition-colors">

                                                {/*  title  */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                                                        <h1>{req.title}</h1>
                                                    </div>
                                                </td>
                                                {/* image */}

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 font-medium text-gray-700">
                                                        <img className='rounded-2xl w-54' src={req.image} alt={req.title} />
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 gap-3 text-center">
                                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
                                                        {req.from}
                                                    </span>
                                                    <p>To</p>
                                                    <span className="bg-blue-50 text-gray-800 px-3 py-1 rounded-full font-bold">
                                                        {req.to}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 font-bold text-gray-800">
                                                    {req.price}
                                                </td>

                                                <td className="px-6 py-4 font-bold text-gray-800">
                                                    {req.quantity}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    {req.isAdvertised === false ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleStatus(req._id, true)}
                                                                className="bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-800 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                                title="Accept Request"
                                                            >
                                                                <MdDone size={16} /> Advertised.
                                                            </button>
                                                        </div>
                                                    ) :
                                                        <button
                                                            onClick={() => handleStatus(req._id, false)}
                                                            className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                            title="Reject Request"
                                                        >
                                                            <X size={16} /> UnAdvertised.
                                                        </button>
                                                    }
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

export default AdvertiseTicket;
