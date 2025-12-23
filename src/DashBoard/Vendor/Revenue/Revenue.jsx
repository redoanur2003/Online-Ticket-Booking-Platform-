import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, Ticket, Layers, TrendingUp } from 'lucide-react';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';

const Revenue = () => {

    const axios = UseAxios();
    const { data: tickets = [] } = useQuery({
        queryKey: ["Tickets",],
        queryFn: async () => {
            const res = await axios.get(`/tickets`);
            return res.data;
        }
    })

    const { data: purchaseTicket = [] } = useQuery({
        queryKey: ["Purchase",],
        queryFn: async () => {
            const res = await axios.get(`/ticketPurchaseInfo`);
            return res.data;
        }
    })

    let totalTicket = 0;
    tickets.map(tiki => {
        totalTicket += tiki.quantity;
    });
    console.log("Total tickets:", totalTicket);

    let sellTicket = 0;
    purchaseTicket.map(pur => {
        sellTicket += pur.bookQuantity;
    });

    let totalRevenue = 0;
    purchaseTicket.map(pur => {
        totalRevenue += pur.totalPrice;
    });
    console.log("pur tickets:", purchaseTicket);

    console.log(tickets);

    // Prepare Bar Chart data (Tickets Added vs Sold per day)
    const chartData = tickets.map(ticket => {
        const purchaseInfo = purchaseTicket.find(p => p.ticketId === ticket._id);
        const sold = purchaseInfo ? purchaseInfo.bookQuantity : 0;

        return {
            name: new Date(ticket.createdAt).toLocaleDateString("en-US", { weekday: 'short' }),
            added: ticket.quantity,
            sold: sold,
            revenue: purchaseInfo ? purchaseInfo.totalPrice : 0
        };
    });

    // Prepare Pie Chart data (Revenue by Transport Type)
    const transportRevenueMap = {};
    purchaseTicket.forEach(pur => {
        const ticket = tickets.find(t => t._id === pur.ticketId);
        if (ticket) {
            const type = ticket.transportType;
            if (!transportRevenueMap[type]) transportRevenueMap[type] = 0;
            transportRevenueMap[type] += pur.totalPrice;
        }
    });

    const pieData = Object.keys(transportRevenueMap).map(type => ({
        name: type,
        value: transportRevenueMap[type]
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold ">Revenue Overview</h1>
                    <p className="">Track your earnings and inventory performance</p>
                </div>

                {/* 1. Stat Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="p-4 rounded-3xl  shadow-sm border text-center border-gray-100">
                        <p className="text-sm  font-semibold">Total Revenue</p>
                        <h3 className="text-2xl font-bold">৳ {totalRevenue}</h3>
                    </div>

                    <div className="p-4 rounded-3xl  shadow-sm border text-center border-gray-100">
                        <p className="text-sm  font-semibold">Total Added Tickets</p>
                        <h3 className="text-2xl font-bold">{totalTicket}</h3>
                    </div>

                    <div className="p-4 rounded-3xl  shadow-sm border text-center border-gray-100">
                        <p className="text-sm  font-semibold">Total Tickets Sold</p>
                        <h3 className="text-2xl font-bold">{sellTicket}</h3>
                    </div>

                </div>

                {/* 2. Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Bar Chart: Tickets Added vs Sold */}
                    <div className=" p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold  mb-6">Sales vs Inventory</h2>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                                    <Legend />
                                    <Bar dataKey="added" fill="#8884d8" name="Tickets Added" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="sold" fill="#82ca9d" name="Tickets Sold" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart: Revenue by Transport Type */}
                    <div className=" p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold  mb-6">Revenue by Transport Type</h2>
                        <div className="h-72 w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Revenue;