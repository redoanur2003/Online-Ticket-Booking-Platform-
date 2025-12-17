import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='mb-4'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;