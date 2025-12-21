import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosApi = UseAxios();

    const {
        register,
        handleSubmit,
        reset,
        setValue
    } = useForm();

    /* ================= DESTINATION ================= */
    const { data: destination = [] } = useQuery({
        queryKey: ['Destination'],
        queryFn: async () => {
            const res = await axiosApi.get('/destination');
            return res.data;
        }
    });

    const districtList = destination.flatMap(d =>
        Array.isArray(d.districts) ? d.districts : []
    );

    /* ================= SINGLE TICKET ================= */
    const { data: ticket = {} } = useQuery({
        queryKey: ['Ticket', id],
        queryFn: async () => {
            const res = await axiosApi.get(`/tickets/id/${id}`);
            return res.data;
        }
    });

    /* ================= SET DEFAULT VALUES ================= */
    useEffect(() => {
        if (ticket?._id) {
            reset({
                title: ticket.title,
                from: ticket.from,
                to: ticket.to,
                price: ticket.price,
                quantity: ticket.quantity,
                transportType: ticket.transportType,
                perks: ticket.perks || [],
                vendorName: ticket.vendorName,
                vendorEmail: ticket.vendorEmail,
            });

            if (ticket.departureTime) {
                const date = ticket.departureTime.split('T')[0];
                const time = ticket.departureTime.split('T')[1]?.slice(0, 5);

                setValue('departureDate', date);
                setValue('departureTimeOnly', time);
            }
        }
    }, [ticket, reset, setValue]);

    const handleUpdateTicket = async (data) => {
        if (data.from === data.to) {
            return Swal.fire('Error', 'From and To cannot be same', 'error');
        }

        const localDateTime = `${data.departureDate}T${data.departureTimeOnly}:00`;
        const departureTime = new Date(localDateTime).toISOString();

        let image = ticket.image;

        /* ===== OPTIONAL IMAGE UPDATE ===== */
        if (data.photo?.length) {
            const formData = new FormData();
            formData.append('image', data.photo[0]);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

            const res = await axios.post(image_API_URL, formData);
            image = res.data.data.url;
        }

        const finalData = {
            title: data.title,
            from: data.from,
            to: data.to,
            price: parseInt(data.price),
            quantity: parseInt(data.quantity),
            transportType: data.transportType,
            perks: data.perks || [],
            vendorName: data.vendorName,
            vendorEmail: data.vendorEmail,
            departureTime,
            image
        };

        delete data.photo;
        delete data.departureDate;
        delete data.departureTimeOnly;

        /* ===== UPDATE API ===== */
        axiosApi.patch(`/tickets/vendor/${id}`, finalData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ticket Updated Successfully',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    navigate('/dashboard/myAddTickets');
                }
            })

    };

    /* ================= UI ================= */
    return (
        <div>
            <h1 className="text-center font-bold text-2xl">Update Ticket</h1>

            <form onSubmit={handleSubmit(handleUpdateTicket)} className="mt-12 p-4">

                <fieldset className="grid grid-cols-2 gap-4">

                    {/* LEFT */}
                    <div>
                        <label className="label">Ticket Name</label>
                        <input {...register('title')} className="input w-full" />

                        <div className="flex gap-4 mt-3">
                            <select {...register('from')} className="select w-full">
                                <option value="" disabled>Select From</option>
                                {districtList.map((d, i) => (
                                    <option key={i} value={d.name}>{d.name}</option>
                                ))}
                            </select>

                            <select {...register('to')} className="select w-full">
                                <option value="" disabled>Select To</option>
                                {districtList.map((d, i) => (
                                    <option key={i} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        <label className="label mt-3">Price</label>
                        <input type="number" {...register('price')} className="input w-full" />

                        <label className="label mt-3">Quantity</label>
                        <input type="number" {...register('quantity')} className="input w-full" />

                        <h3 className="mt-4 font-semibold">Transport</h3>
                        {['Bus', 'Train', 'Air', 'Launch'].map(t => (
                            <label key={t} className="mr-4">
                                <input type="radio" {...register('transportType')} value={t} /> {t}
                            </label>
                        ))}
                    </div>

                    {/* RIGHT */}
                    <div>
                        <label className="label">Departure Date & Time</label>
                        <div className="flex gap-2">
                            <input type="date" {...register('departureDate')} className="input w-full" />
                            <input type="time" {...register('departureTimeOnly')} className="input w-full" />
                        </div>

                        <label className="label mt-4">Perks</label>
                        <div className="flex flex-wrap gap-3">
                            {['AC', 'WiFi', 'Sleepers', 'Snacks', 'Ocean View', 'Fishing', 'Padma view'].map(p => (
                                <label key={p}>
                                    <input type="checkbox" value={p} {...register('perks')} /> {p}
                                </label>
                            ))}
                        </div>

                        <label className="label mt-4">Image</label>
                        <input type="file" {...register('photo')} />

                        {ticket.image && (
                            <img src={ticket.image} alt="ticket" className="w-32 mt-2 rounded" />
                        )}

                        <input {...register('vendorName')} className="input w-full mt-3" />
                        <input {...register('vendorEmail')} className="input w-full mt-2" />
                    </div>
                </fieldset>

                <div className="text-center">
                    <button className="btn btn-primary mt-6">Update Ticket</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTicket;
