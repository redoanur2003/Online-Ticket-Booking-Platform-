import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Component/Auth/AuthContext/useAuth';
import UseAxios from '../UseAxios/UseAxios';

const useRole = () => {
    const { user } = useAuth();
    const axios = UseAxios();

    const { data: role = '' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/users/${user.email}/role`);

            return res.data?.role || 'user';
        }
    })

    return { role };
};

export default useRole;