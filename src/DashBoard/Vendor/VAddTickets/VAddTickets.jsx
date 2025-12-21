import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Component/Auth/AuthContext/useAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxios from '../../../Hook/UseAxios/UseAxios';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const VAddTickets = () => {
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();
    const { user } = useAuth();
    const axiosApi = UseAxios();
    const navigate = useNavigate();

    const { data: destination = [] } = useQuery({
        queryKey: ["Destination"],
        queryFn: async () => {
            const res = await axiosApi.get(`/destination`);
            return res.data;
        }
    })

    console.log(destination);
    const districtList = destination.flatMap(d =>
        Array.isArray(d.districts) ? d.districts : []
    );

    const handleAddTicket = async (data) => {
        if (data.from === data.to) {
            return alert("From and To cannot be the same district");
        }
        const localDateTime = `${data.departureDate}T${data.departureTimeOnly}:00`;
        const departureTime = new Date(localDateTime).toISOString();
        const verificationStatus = 'pending';
        const isAdvertised = false;
        const createdAt = new Date();
        let image;
        data.price = parseInt(data.price);
        data.quantity = parseInt(data.quantity);
        const profileImg = data.photo[0];
        const formData = new FormData();
        formData.append('image', profileImg);

        // 2. send the photo to store and get the ul
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

        await axios.post(image_API_URL, formData)
            .then(res => {
                const photoURL = res.data.data.url;
                // console.log(photoURL)
                image = photoURL;
            })

        const finalData = {
            ...data,
            departureTime,
            verificationStatus,
            isAdvertised,
            image,
            createdAt
        };

        delete finalData.departureDate;
        delete finalData.departureTimeOnly;
        delete finalData.photo;
        console.log(finalData);

        axiosApi.post('/tickets', finalData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'top-right',
                        title: `Ticket added successfully`,
                        icon: "success",
                        draggable: true,
                        timer: 1500
                    });
                    navigate('/dashboard/myAddTickets');
                }
            })
    }

    return (
        <div>
            <h1 className='text-center font-bold text-2xl'>Add ticket</h1>

            <form onSubmit={handleSubmit(handleAddTicket)} className='mt-12 p-4 text-black'>
                {/* two column */}
                <div className='grid'>
                    <h4 className="text-2xl font-semibold text-center">Ticket Details</h4>

                    <fieldset className="fieldset grid grid-cols-2 gap-2 p-2">
                        {/* ticket info: name*/}
                        <div>
                            <fieldset className="fieldset">
                                <label className="label">Ticket Name</label>
                                <input type="text" {...register('title')} className="input w-full" placeholder="Ticket Name" />
                            </fieldset>
                            {/* destination */}

                            <div className='flex gap-5 px-3'>
                                {/* from region */}
                                <div>
                                    <label className="label">From</label>
                                    <select {...register('from')} defaultValue="" className="select w-full">
                                        <option value="" disabled>Select a district</option>

                                        {districtList.map((district, index) => (
                                            <option key={index} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                {/* to districts */}
                                <div>
                                    <label className="label">To</label>
                                    <select {...register('to')} defaultValue="" className="select w-full">
                                        <option value="" disabled>Select a district</option>

                                        {districtList.map((district, index) => (
                                            <option key={index} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>


                            {/* Ticket Price */}
                            <label className="label mt-4">Ticket Price</label>
                            <input type="number" {...register('price')} className="input w-full" placeholder="Ticket Price" />

                            {/* Ticket quantity  */}
                            <label className="label mt-4">Ticket quantity </label>
                            <input type="number" {...register('quantity')} className="input w-full" placeholder="Ticket Quantity " />
                            <div>
                                <h1 className='text-2xl font-semibold text-center m-2'>Select Transport Type</h1>
                                <div className='grid grid-cols-2 md:flex justify-center gap-6'>
                                    <label className="label mr-4">
                                        <input type="radio" {...register('transportType')} value="Bus" className="radio" defaultChecked />
                                        Bus
                                    </label>
                                    <label className="label">
                                        <input type="radio" {...register('transportType')} value="Train" className="radio" />
                                        Train
                                    </label>
                                    <label className="label">
                                        <input type="radio" {...register('transportType')} value="Air" className="radio" />
                                        Air
                                    </label>
                                    <label className="label">
                                        <input type="radio" {...register('transportType')} value="Launch" className="radio" />
                                        Launch
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='gird'>
                            {/* Departure date & time  */}
                            <div>
                                <label className="label mt-1">Departure date & time   </label>
                                <div className='flex gap-2 mt-1.5'>
                                    <input type="date" className="input w-full" onChange={(e) => {
                                        setValue('departureDate', e.target.value);
                                    }} />

                                    <input type="time" className="input w-full" onChange={(e) => {
                                        setValue('departureTimeOnly', e.target.value);
                                    }} />
                                </div>

                            </div>
                            {/* perks */}
                            <div className=' grid gap-1'>
                                <label className="label mt-4">Perks</label>
                                <div className="flex flex-wrap gap-4">
                                    {['AC', 'WiFi', 'Sleepers', 'Snacks', 'Ocean View', 'Fishing', 'Padma view'].map((perk) => (
                                        <label key={perk} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                                            <input
                                                type="checkbox"
                                                value={perk}
                                                {...register('perks')}
                                                className="w-4 h-4 text-blue-600 rounded"
                                            />
                                            <span className="text-sm font-medium text-gray-600">{perk}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Image */}

                            <div className=' grid gap-1'>
                                <label className="label mt-5">Image</label>
                                <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />

                            </div>
                            {/* vendor name */}
                            <div className=' grid gap-1'>
                                <label className="label mt-3">Sender Name</label>
                                <input type="text" {...register('vendorName')}
                                    defaultValue={user?.displayName} readOnly
                                    className="input w-full" placeholder="Vendor Name" />
                            </div>

                            {/* vendor email */}
                            <div className=' grid gap-1'>
                                <label className="label">Sender Email</label>
                                <input type="text" {...register('vendorEmail')}
                                    defaultValue={user?.email} readOnly
                                    className="input w-full" placeholder="Vendor Email" />
                            </div>
                        </div>
                    </fieldset>

                </div>
                <div className='flex justify-center'>
                    <input type="submit" className='btn btn-primary mt-8 text-black' value="Add Ticket" />
                </div>
            </form>
        </div>
    );
};

export default VAddTickets;