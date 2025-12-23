import React from 'react';
import useAuth from '../Auth/AuthContext/useAuth';
import useRole from '../../Hook/UserRole/useRole';
import Loading from '../Loading/Loading';
import Forbidden from '../Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role } = useRole()

    if (loading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;