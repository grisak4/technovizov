import React, { useEffect, useState } from "react";
import LibrarianNav from "./LibrarianNav";
import '../styles/LibrarianIssues.css';

function LibrarianIssues() {
    const [issues, setIssues] = useState([]);
    const [readers, setReaders] = useState({});
    const [books, setBooks] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchIssues();
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
            await fetchRelatedData(data.issues || []);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const fetchRelatedData = async (issues) => {
        const token = localStorage.getItem('token');
        const readerMap = {};
        const bookMap = {};

        await Promise.all(
            issues.map(async (issue) => {
                if (!readerMap[issue.reader_id]) {
                    const readerResponse = await fetch(`http://localhost:8080/librarian/getreader/${issue.reader_id}`, {
                        headers: { 'Authorization': `${token}` },
                    });
                    if (readerResponse.ok) {
                        const readerData = await readerResponse.json();
                        readerMap[issue.reader_id] = readerData; // readerData содержит reader
                    }
                }
                if (!bookMap[issue.book_id]) {
                    const bookResponse = await fetch(`http://localhost:8080/librarian/getbook/${issue.book_id}`, {
                        headers: { 'Authorization': `${token}` },
                    });
                    if (bookResponse.ok) {
                        const bookData = await bookResponse.json();
                        bookMap[issue.book_id] = bookData; // bookData содержит book
                    }
                }
            })
        );

        setReaders(readerMap);
        setBooks(bookMap);
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
            fetchIssues();
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
                        issues.map((issue) => (
                            <div key={issue.id} className="issue-item">
                                <h2>Запрос на книгу: {books[issue.book_id]?.title || 'Загрузка...'}</h2>
                                <p>Читатель: {readers[issue.reader_id] ? `${readers[issue.reader_id].sur_name} ${readers[issue.reader_id].first_name} ${readers[issue.reader_id].patronymic}` : 'Загрузка...'}</p>
                                <p>Статус: {issue.status}</p>
                                <div className="buttons-container">
                                    <button onClick={() => handleResponse(issue.id, 'given')}>Выдана</button>
                                    <button onClick={() => handleResponse(issue.id, 'decline')}>Отклонить</button>
                                    <button onClick={() => handleResponse(issue.id, 'returned')}>Возвращена</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LibrarianIssues;
