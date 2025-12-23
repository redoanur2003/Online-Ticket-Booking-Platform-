import React from 'react';
import UseAxios from '../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';

const ExtraSection = () => {
    const axiosSecure = UseAxios();

    const { data: popularRoutes = [] } = useQuery({
        queryKey: ["Popular"],
        queryFn: async () => {
            const res = await axiosSecure.get("/popularRoute");
            return res.data;
        }
    })
    const { data: factRoute = [] } = useQuery({
        queryKey: ["Fact"],
        queryFn: async () => {
            const res = await axiosSecure.get("/factRoute");
            return res.data;
        }
    })


    return (
        <div>
            <section className="my-12 px-4 md:px-8 lg:px-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold  mb-2">
                        Popular Routes
                    </h2>
                    <p className="">
                        Discover the most traveled destinations at the best prices
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularRoutes.map((item) => (
                        <div
                            key={item._id}
                            className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="h-64 w-full">
                                <img
                                    src={item.image}
                                    alt={item.route}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="absolute inset-0 to-transparent flex flex-col justify-end p-4">

                                <div className="absolute top-4 right-4 /20 backdrop-blur-md px-3 py-1 rounded-full text-xs  font-medium border border-white/30">
                                    {item.transportType}
                                </div>

                                <h3 className="text-xl font-bold  mb-1">
                                    {item.route}
                                </h3>
                                <p className=" text-sm font-medium">
                                    Starts from <span className="font-bold">{item.startingPrice} BDT</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16  px-4 md:px-8 lg:px-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold  mb-3">
                        Why Choose TicketBari?
                    </h2>
                    <p className=" max-w-2xl mx-auto">
                        We simplify your travel experience with reliability, security, and speed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {factRoute.map((feature) => (
                        <div
                            key={feature._id}
                            className=" p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-gray-100 h-full"
                        >
                            <div className="mb-6 p-4  rounded-full">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold  mb-3">
                                {feature.title}
                            </h3>

                            <p className=" text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default ExtraSection;