import React from 'react';
import {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import {FaUser} from 'react-icons/fa'
import Layout from "@/components/Layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage(props) {
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('password and confirm password is not match')
            return
        }
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <Layout title="user login">
            <div className="shadow-lg border w-50 m-auto p-5">
                <h1>Register</h1>
                <ToastContainer />
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-lg-6 my-3">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               id="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className='form-control'/>
                    </div>

                    <div className="col-lg-6 my-3">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               id="username"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               className='form-control'/>
                    </div>

                    <div className="col-lg-6 my-3">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               id="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className='form-control'/>
                    </div>

                    <div className="col-lg-6 my-3">
                        <label htmlFor="confirmPassword">confirm Password</label>
                        <input type="password"
                               id="confirmPassword"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               className='form-control'/>
                    </div>

                    <div className="col-lg-12">
                        <input type="submit" value="Register" className="btn btn-info"/>
                    </div>
                </form>

                <div className="mt-5 fw-bold">
                    if have account
                    <Link href="/account/login">
                        <a className='btn btn-outline-dark ms-3 fw-bold'><FaUser/> Login</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
