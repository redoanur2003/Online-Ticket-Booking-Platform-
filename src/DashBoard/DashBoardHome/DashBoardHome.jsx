import React from 'react';
import useRole from '../../Hook/UserRole/useRole';
import UserDashboardHome from '../User/UserDashboardHome/UserDashboardHome';
import VendorDashBoard from '../Vendor/VendorDashBoard/VendorDashBoard';

const DashBoardHome = () => {
    const { role } = useRole();

    if (role === 'user') {
        return <UserDashboardHome></UserDashboardHome>
    }
    else if (role === 'vendor') {
        return <VendorDashBoard></VendorDashBoard>
    }
};

export default DashBoardHome;