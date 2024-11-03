import React, { useEffect, useState } from "react";
import LibrarianNav from "./LibrarianNav";
import '../styles/LibrarianIssues.css';

function LibrarianIssues() {
    const [issues, setIssues] = useState([]);
    const [readers, setReaders] = useState([]);
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetchIssues();
            await fetchReaders();
            await fetchBooks();
        };
        fetchData();
    }, []);

    const fetchIssues = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/librarian/getissues', {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (!response.ok) throw new Error('Ошибка при получении запросов на выдачу книг');
            const data = await response.json();
            console.log("Полученные запросы:", data);
            setIssues(data.issues || []);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const fetchReaders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/librarian/getreaders', {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (!response.ok) throw new Error('Ошибка при получении читателей');
            const data = await response.json();
            console.log("Полученные читатели:", data);
            setReaders(data.readers || []);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/librarian/getbooks', {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (!response.ok) throw new Error('Ошибка при получении книг');
            const data = await response.json();
            console.log("Полученные книги:", data);
            setBooks(data.books || []);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleResponse = async (issueId, answer) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/librarian/issuebooks/${answer}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({ ID: issueId }),
            });
            if (!response.ok) throw new Error('Ошибка при отправке ответа на запрос');
            setMessage(`Ответ на запрос успешно отправлен: ${answer}`);
            fetchIssues(); // Обновляем список запросов после изменения
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <LibrarianNav />
            <div>
                <div className="issues-container">
                {issues.length === 0 ? (
    <p>Нет доступных запросов на выдачу книг.</p>
) : (
    issues.map((issue) => {
        const readerId = issue.reader_id;
        const bookId = issue.book_id;

        const reader = readers.find(reader => reader.id === readerId);
        const book = books.find(book => book.id === bookId);

        return (
            <div key={issue.id} className="issue-item">
                <h2>Запрос на книгу: {book ? book.title : 'Неизвестно'}</h2>
                <p>Читатель: {reader ? `${reader.sur_name} ${reader.first_name}` : 'Неизвестно'}</p>
                <p>Статус: {issue.status}</p>
                <div className="buttons-container">
                    <button onClick={() => handleResponse(issue.id, 'given')}>Выдана</button>
                    <button onClick={() => handleResponse(issue.id, 'decline')}>Отклонить</button>
                    <button onClick={() => handleResponse(issue.id, 'returned')}>Возвращена</button>
                </div>
            </div>
        );
    })
)}

                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LibrarianIssues;
 