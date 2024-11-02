import React, { useEffect, useState } from "react";
import ReaderNav from "./ReaderNav";
import '../styles/ReaderBooks.css'

function ReaderBooks() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]); // Состояние для авторов
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchBooks();
        fetchAuthors(); // Получаем авторов при монтировании компонента
    }, []);

    // Функция для получения книг
    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/reader/getbooks', {
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении книг');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Функция для получения авторов
    const fetchAuthors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/reader/getauthors', {
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении авторов');
            }
            const data = await response.json();
            setAuthors(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <ReaderNav />
            <h1>Список книг</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="books-list">
                {books.map((book) => {
                    const author = authors.find(author => author.id === book.author_id);
                    return (
                        <div key={book.id} className="book-item">
                            <h2>{book.title}</h2>
                            <p>Автор: {author ? author.pseudonym : "Неизвестен"}</p>
                            <p>Жанр: {book.genre}</p>
                            <p>Количество: {book.count}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ReaderBooks;
