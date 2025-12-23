import React from 'react';
import useAuth from '../Auth/AuthContext/useAuth';
import useRole from '../../Hook/UserRole/useRole';
import Loading from '../Loading/Loading';
import Forbidden from '../Forbidden/Forbidden';

const VendorRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role } = useRole()

    if (loading || !user) {
        return <Loading></Loading>
    }

    if (role !== 'vendor') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default VendorRoute;