import React, { useState, useEffect } from "react";
import ReaderNav from "./ReaderNav";
import '../styles/ReaderIssue.css'; // Импортируем стили

function ReaderIssue() {
    const [books, setBooks] = useState([]);
    const [librarians, setLibrarians] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedLibrarian, setSelectedLibrarian] = useState(null);
    const [message, setMessage] = useState('');
    const [readerId, setReaderId] = useState(null);

    useEffect(() => {
        fetchBooks();
        fetchLibrarians();
        fetchReaderId();
    }, []);

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/reader/getbooks', {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (!response.ok) throw new Error('Ошибка при получении книг');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const fetchLibrarians = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/reader/getlibrarians', {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (!response.ok) throw new Error('Ошибка при получении списка библиотекарей');
            const data = await response.json();
            setLibrarians(data);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const fetchReaderId = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setReaderId(payload.user_id);
        }
    };

    const handleIssueBook = async () => {
        if (!selectedBook || !selectedLibrarian || !readerId) {
            setMessage("Пожалуйста, выберите книгу, библиотекаря и убедитесь, что вы авторизованы.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/reader/issuebook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    reader_id: Number(readerId),
                    book_id: Number(selectedBook),
                    librarian_id: Number(selectedLibrarian)
                }),
            });
            if (!response.ok) throw new Error('Ошибка при выдаче книги');
            setMessage('Запрос на выдачу книги отправлен успешно!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="issue-body">
            <ReaderNav />
            <h1 className="issue-title">Запрос на выдачу книги</h1>
            {message && <p className="error-message">{message}</p>}
            
            <div className="issue-container">
                <div className="select-container">
                    <label htmlFor="book">Выберите книгу:</label>
                    <select
                        id="book"
                        onChange={(e) => setSelectedBook(e.target.value)}
                        value={selectedBook || ''}
                    >
                        <option value="">-- Выберите книгу --</option>
                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.title}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="librarian">Выберите библиотекаря:</label>
                    <select
                        id="librarian"
                        onChange={(e) => setSelectedLibrarian(e.target.value)}
                        value={selectedLibrarian || ''}
                    >
                        <option value="">-- Выберите библиотекаря --</option>
                        {librarians.map((librarian) => (
                            <option key={librarian.id} value={librarian.id}>
                                {librarian.sur_name}
                            </option>
                        ))}
                    </select>

                    <button className="issue-button" onClick={handleIssueBook}>Запросить выдачу</button>
                </div>
            </div>
        </div>
    );
}

export default ReaderIssue;
