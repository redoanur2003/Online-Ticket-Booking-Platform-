import React from 'react';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageUser = () => {
    const axios = UseAxios();
    const { refetch, data: user = [] } = useQuery({
        queryKey: ["Tickets",],
        queryFn: async () => {
            const res = await axios.get(`/users`);
            return res.data;
        }
    });

    const person = user.filter(us => us.role !== 'admin');
    // console.log("user: ", person)

    const handleStatus = (id, status) => {
        console.log(id, status);
        const data = { status };
        axios.patch(`/users/admin/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `User ${status} update successfully`,
                        timer: 1500,
                        showConfirmButton: false
                    });
                    refetch();

                }
            })
    };

    return (
        <div>
            <h1>Manage user</h1>

            <div className="p-6 min-h-screen">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Managing Added tickets</h1>
                        <p className="">Manage vendor requested tickets</p>
                    </div>

                    {/* Table Container */}
                    {person.length > 0 ?
                        <div className=" rounded-xl shadow-md overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">

                                    {/* Table Head */}
                                    <thead className="  uppercase text-xs font-bold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="divide-y text-sm">
                                        {person.map((req) => (
                                            <tr key={req._id} className="hover:bg-green-500 transition-colors">

                                                {/*  name  */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 font-semibold ">
                                                        <h1>{req.displayName}</h1>
                                                    </div>
                                                </td>
                                                {/* role */}

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 font-medium ">
                                                        <h1>{req.role}</h1>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    {req.role === 'user' ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleStatus(req._id, 'admin')}
                                                                className=" hover:bg-green-200 hover:text-green-800 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                                title="Admin"
                                                            >
                                                                Admin
                                                            </button>

                                                            <button
                                                                onClick={() => handleStatus(req._id, 'vendor')}
                                                                className=" hover:bg-yellow-200 hover:text-yellow-400 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                                title="Vendor"
                                                            >
                                                                Vendor
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        // Status Badge if already processed
                                                        <div className="flex items-center justify-center gap-2">
                                                            {req.role === 'vendor' ? <button
                                                                onClick={() => handleStatus(req._id, 'fraud')}
                                                                className=" hover:bg-red-200 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                                title="Fraud"
                                                            >
                                                                Fraud
                                                            </button>
                                                                : <button
                                                                    onClick={() => handleStatus(req._id, 'vendor')}
                                                                    className=" hover:bg-blue-400 p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold px-3"
                                                                    title="Vendor"
                                                                >
                                                                    Vendor
                                                                </button>}
                                                        </div>
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
        </div>
    );
};

export default ManageUser;