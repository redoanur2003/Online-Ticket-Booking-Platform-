import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Payment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState(number);

    const handelPayment = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Payment confirm",
            text: `You will be charged ${price} taka!`,
            icon: "confirm",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        })
        setIsModalOpen(false);

    }

    return (
        <div className='items-center p-2'>
            <h1 className='text-2xl text-center'>Here is the payment method</h1>
            <ul className='flex justify-around p-2'>
                <button onClick={() => setIsModalOpen(true)} className='bg-pink-400 p-2 rounded-2xl'>bkash</button>
                <button className='bg-green-300 p-2 rounded-2xl'>Card</button>
            </ul>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-base-100  flex items-center justify-center  backdrop-blur-sm p-4">
                    <form onSubmit={handelPayment}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Mobile number</label>
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-semibold"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-semibold"
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 rounded-lg border btn border-gray-300  font-medium hover:btn-primary transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 rounded-lg btn border-gray-300 font-bold hover:btn-primary transition-colors shadow-md"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Payment;