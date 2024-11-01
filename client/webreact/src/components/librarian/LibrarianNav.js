import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/LibrarianNav.css';

function LibrarianNav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="librarian-nav">
            <h1 className="librarian-nav-title">Библиотекарь</h1>
            <nav className="librarian-nav-links">
                <Link to="/librarian/books" className="librarian-nav-link">Книги</Link>
                <Link to="/librarian/readers" className="librarian-nav-link">Читатели</Link>
                <button onClick={handleLogout} className="librarian-nav-button">Logout</button>
            </nav>
        </header>
    );
}

export default LibrarianNav;
