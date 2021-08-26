import React from 'react';
import {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import {FaUser} from 'react-icons/fa'
import Layout from "@/components/Layout";

export default function LoginPage(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({username,password})
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Layout title="user login">
            <div className="shadow-lg border w-50 m-auto p-5">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="d-block w-100 my-3">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               id="username"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               className='form-control'/>
                    </div>

                    <div className="d-block w-100 my-3">
                        <label htmlFor="password">Password</label>
                        <input type="text"
                               id="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className='form-control'/>
                    </div>

                    <input type="submit" value="Login" className="btn btn-info"/>
                </form>

                <div className="mt-5 fw-bold">
                    if not register yet
                    <Link href="/account/register">
                        <a className='btn btn-outline-dark ms-3 fw-bold'><FaUser/> Register</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
