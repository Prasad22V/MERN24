import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../styles/Profile.css"; // Import the new CSS file

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');

    const token = JSON.parse(localStorage.getItem('token'));

    const fetchData = () => {
        setLoading(true); // Show loading state initially

        const header = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.post('http://localhost:3000/user/profile', {}, header)
            .then((res) => {
                setLoading(false);
                setData(res.data.data);
                console.log('User data fetched', res);
            })
            .catch((err) => {
                console.log('Error while fetching data', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="profile-container">
            <p className="profile-loading">{loading && "Data is loading..."}</p>
            <div className="profile-card">
                <div className="profile-content">
                    <h2 className="profile-title">Name: {data.name}</h2>
                    <p className="profile-text">Email: {data.email}</p>
                    <p className="profile-text">Bio: {data.bio}</p>
                    <p className="profile-text">ID: {data.id}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
