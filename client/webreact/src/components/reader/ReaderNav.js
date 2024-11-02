import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/ReaderNav.css';

function ReaderNav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="reader-nav">
            <h1 className="reader-nav-title">Читатель</h1>
            <nav className="reader-nav-links">
                <Link to="/reader/books" className="reader-nav-link">Книги</Link>
                <Link to="/reader/issue" className="reader-nav-link">Запись</Link>
                <button onClick={handleLogout} className="reader-nav-button">Logout</button>
            </nav>
        </header>
    );
}

export default ReaderNav;
