import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Component/Auth/AuthContext/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
                Swal.fire({
                    position: 'top-right',
                    title: "Login",
                    icon: "success",
                    draggable: true,
                    timer: 1000
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    position: 'top-right',
                    title: "Error!?",
                    text: "Account not found or Wrong password",
                    icon: "question",
                    timer: 1000
                });
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome back</h3>
            <p className='text-center'>Please Login</p>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required </p>
                    }


                    <div><Link to='/forget' className="link link-hover">Forgot password?</Link></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>If you don't have any account?Please<Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/register">Register</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;