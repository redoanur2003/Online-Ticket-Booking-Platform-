import React from 'react';
import UseAxios from '../../../../Hook/UseAxios/UseAxios';
import { useQuery } from '@tanstack/react-query';

const Userinfo = ({ info }) => {
    const axios = UseAxios();
    const { data: user = [] } = useQuery({
        queryKey: ["Tickets", info],
        queryFn: async () => {
            const res = await axios.get(`/users/${info}`);
            return res.data;
        }
    })
    return (
        <div>
            <h1>{user.displayName}</h1>
        </div>
    );
};

export default Userinfo;