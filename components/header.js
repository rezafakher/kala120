import React from 'react';
import Link from 'next/link'
import {FaUserCircle} from 'react-icons/fa'

function Header(props) {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Next Js</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" href="/">
                                    <a className="text-white mx-3">Home</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/about">
                                    <a className="text-white mx-3">About</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/events">
                                    <a className="text-white mx-3">Events</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/events/addEvent">
                                    <a className="text-white mx-3">Add Events</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/account/login">
                                    <a className="text-white mx-3"><FaUserCircle /> Login</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
