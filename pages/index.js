import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import '../styles/Home.module.scss';
import '../styles/login.scss';

export default function Homepage() {
    const [userName, setUserName] = React.useState('')
    const handleChange = (e) => {
        setUserName(e.target.value)
    }
    return (
        <div className="homepage">
            <div class="login-card">
                <div class="login-card-content">
                    <div class="header">
                        <div class="logo">
                            <div className="title-cont">
                                <img src="../assests/logo.png" alt="logo" />
                            </div>
                        </div>
                    </div>
                    <div class="form">
                        <div class="form-field username">
                            <div class="icon">
                                <i class="far fa-user"></i>
                            </div>
                            <input type="text" placeholder="Trainers Name" onChange={handleChange} value={userName} />
                        </div>
                        <Link href={{
                            pathname: '/listing',
                            query: { userName },
                        }} >
                            <p className="button">Explore</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}