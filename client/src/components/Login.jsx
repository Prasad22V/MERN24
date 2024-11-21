import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/Login.css"; // Import the new CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        };

        axios.post('http://localhost:3000/user/login', payload)
            .then((res) => {
                setLoading(false);
                toast("Login Successful");
                console.log("Login done", res);
                localStorage.setItem('token', JSON.stringify(res.data.token));
                navigate("/profile");
            })
            .catch((err) => {
                toast("Invalid Credentials");
                console.log("Error while login", err);
                setLoading(false);
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="login-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="login-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="login-button"
                    >
                        {loading ? 'Submitting..' : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
