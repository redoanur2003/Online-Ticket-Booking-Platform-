import React from 'react';
import useAuth from '../../../Component/Auth/AuthContext/useAuth';

const AdminSection = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2 className="text-xl md:text-4xl text-center">{user.displayName} you visit your dashBoard.</h2>
        </div>
    );
};

export default AdminSection;