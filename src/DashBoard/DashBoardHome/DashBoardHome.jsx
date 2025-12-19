import React from 'react';
import useRole from '../../Hook/UserRole/useRole';
import UserDashboardHome from '../User/UserDashboardHome/UserDashboardHome';

const DashBoardHome = () => {
    const { role } = useRole();

    if (role === 'user') {
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashBoardHome;