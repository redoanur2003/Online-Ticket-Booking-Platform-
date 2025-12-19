import React from 'react';
import useAuth from '../../Component/Auth/AuthContext/useAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxios from '../../Hook/UseAxios/UseAxios';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

const Profile = () => {
    const { user } = useAuth();
    const axios = UseAxios();
    const navigate = useNavigate();

    const { data: info = [] } = useQuery({
        queryKey: ["User", user.email],
        queryFn: async () => {
            const res = await axios.get(`/users/${user.email}`);
            return res.data;
        }
    })

    const date = new Date(user.metadata.creationTime);
    const formattedDate = format(date, 'dd MMMM yyyy');
    const handleProfile = () => {
        navigate('/update');
    }
    return (
        <>
            <div className='card container flex justify-center items-center'>
                <h1 className='text-3xl'>Name: {user.displayName}</h1>
                <img className=' w-fit md:w-75  h-37.5 md:h-75 rounded-xl' src={user.photoURL} alt="" />
            </div>
            <div className='flex justify-center gap-2'>
                <p className='font-medium text-2xl '>Role: {info.role}</p>
                <p className='font-medium text-2xl '>Email: {info.email}</p>
            </div>

            <div className='flex text-xl justify-center'>
                <h2>Created: {formattedDate}</h2>
            </div>
            <div className='flex justify-center mt-5 p-3'>
                <button className='btn btn-primary text-black hover:btn-active' onClick={handleProfile}>Change Profile Data</button>
            </div>
        </>
    );
};

export default Profile;