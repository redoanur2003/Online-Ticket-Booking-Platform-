import React from 'react';

import logo from '../../assets/ticketBari.jpg'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <div className='grid'>
                <img className='w-44 h-44' src={logo} alt="" />
                <h3 className="text-3xl text-center font-bold -ms-2.5">TicketBari</h3>
            </div>
        </Link>
    );
};

export default Logo;