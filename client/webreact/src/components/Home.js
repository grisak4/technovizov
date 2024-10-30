import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>Hello world!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
