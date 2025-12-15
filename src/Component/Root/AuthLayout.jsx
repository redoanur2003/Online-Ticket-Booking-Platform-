import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Logo/Logo';
const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex justify-center'>
                <Logo></Logo>
            </div>
            <div className='flex items-center m-5'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;