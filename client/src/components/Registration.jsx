import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "../styles/Register.css";

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();

        const payload = {
            name: userName,
            email: email,
            bio: bio,
            password: password
        };

        axios.post('http://localhost:3000/user/register', payload)
            .then((res) => {
                setLoading(false);
                toast("Registration Successful");
                console.log("User registered", res);
            })
            .catch((err) => {
                toast("Registration Failed");
                console.log("Error during registration", err);
                setLoading(false);
            });
    };

    return (
        <div className="registration-container">
            <div className="registration-box">
                <h2 className="registration-title">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userName" className="registration-label">Name</label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            className="registration-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="userName" className="registration-label">Bio</label>
                        <input
                            type="text"
                            id="userName"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required
                            className="registration-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="registration-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="registration-input"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="registration-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="registration-input"
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="registration-button"
                    >
                        {loading ? 'Submitting...' : "Sign up"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registration;
