import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Header.css";

function Header() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="header">
            
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/register">Register</Link>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Header;
