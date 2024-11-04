import React, { useEffect, useState } from "react";
import ReaderNav from "./ReaderNav";
import '../styles/ReaderBooks.css';

function ReaderBooks() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(""); // Состояние для выбранного жанра

    const genres = [
        "",
        "боевая фантастика",
        "зарубежные приключения",
        "исторические детективы",
        "научная фантастика",
        "программирование",
        "русское фэнтези",
        "технические науки"
    ];

    useEffect(() => {
        fetchBooks();
        fetchAuthors();
    }, [selectedGenre]); // Повторный вызов при изменении selectedGenre

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            let url = 'http://localhost:8080/reader/getbooks';
            if (selectedGenre) {
                url = `http://localhost:8080/reader/getbooksgenre/${selectedGenre}`;
            }
            const response = await fetch(url, {
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

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    return (
        <div>
            <ReaderNav />
            <h1>Список книг</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="genre-filter">
                <label htmlFor="genre">Выберите жанр:</label>
                <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>
                            {genre || "Все жанры"}
                        </option>
                    ))}
                </select>
            </div>

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
