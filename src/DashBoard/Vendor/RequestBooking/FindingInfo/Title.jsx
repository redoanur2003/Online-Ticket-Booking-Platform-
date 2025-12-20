import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxios from '../../../../Hook/UseAxios/UseAxios';

const Title = ({ id }) => {
    const axios = UseAxios();
    const { data: ticket = [] } = useQuery({
        queryKey: ["Tickets", id],
        queryFn: async () => {
            const res = await axios.get(`/tickets/id/${id}`);
            return res.data;
        }
    })
    return (
        <div>
            <h1>{ticket.title}</h1>
        </div>
    );
};

export default Title;