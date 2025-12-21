import React from 'react';
import useRole from '../../Hook/UserRole/useRole';
import UserDashboardHome from '../User/UserDashboardHome/UserDashboardHome';
import VendorDashBoard from '../Vendor/VendorDashBoard/VendorDashBoard';
import AdminSection from '../Admin/AdminSection/AdminSection';

const DashBoardHome = () => {
    const { role } = useRole();

    if (role === 'user') {
        return <UserDashboardHome></UserDashboardHome>
    }
    else if (role === 'vendor') {
        return <VendorDashBoard></VendorDashBoard>
    }
    else {
        return <AdminSection></AdminSection>
    }
};

export default DashBoardHome;