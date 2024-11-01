import React, { useEffect, useState } from "react";
import '../styles/LibrarianBooks.css';
import LibrarianNav from "./LibrarianNav";

function LibrarianBooks() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        year: '',
        count: 0,
    });
    const [editBook, setEditBook] = useState(null); // Состояние для редактирования
    const [errorMessage, setErrorMessage] = useState('');

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
    }, []);

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/librarian/getbooks', {
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

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/librarian/addbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    ...newBook,
                    count: parseInt(newBook.count, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении книги');
            }

            fetchBooks();
            setNewBook({ title: '', author: '', genre: '', year: '', count: 0 });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/librarian/deletebook/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении книги');
            }

            fetchBooks();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEditBook = (book) => {
        setEditBook(book); // Заполняем данные редактируемой книги
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/librarian/changebook/${editBook.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    ...editBook,
                    count: parseInt(editBook.count, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении книги');
            }

            fetchBooks();
            setEditBook(null); // Закрываем форму редактирования
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="librarianbooks-body">
            <LibrarianNav />
            <section id="catalog" className="catalog-section">
                <h2 className="section-title">Каталог книг</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <table className="table-catalog">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Автор</th>
                            <th>Жанр</th>
                            <th>Количество</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                {editBook && editBook.id === book.id ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                value={editBook.title}
                                                onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editBook.author}
                                                onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={editBook.genre}
                                                onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
                                            >
                                                {genres.map((genre) => (
                                                    <option key={genre} value={genre}>{genre}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editBook.count}
                                                onChange={(e) => setEditBook({ ...editBook, count: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={handleSaveChanges}>Сохранить</button>
                                            <button onClick={() => setEditBook(null)}>Отмена</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td>{book.count}</td>
                                        <td>
                                            <button className="button-edit" onClick={() => handleEditBook(book)}>Изменить</button>
                                            <button className="button-delete" onClick={() => handleDeleteBook(book.id)}>Удалить</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section id="add-book" className="add-book-container">
                <h2 className="add-book-title">Добавить новую книгу</h2>
                <form className="add-book-form" onSubmit={handleAddBook}>
                    <label className="add-book-label">Название книги:
                        <input
                            type="text"
                            required
                            value={newBook.title}
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            className="add-book-input"
                        />
                    </label>
                    <label className="add-book-label">Автор:
                        <input
                            type="text"
                            required
                            value={newBook.author}
                            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                            className="add-book-input"
                        />
                    </label>
                    <label className="add-book-label">Жанр:
                        <select
                            required
                            value={newBook.genre}
                            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                            className="add-book-select"
                        >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                        </select>
                    </label>
                    <label className="add-book-label">Количество:
                        <input
                            type="number"
                            required
                            value={newBook.count}
                            onChange={(e) => setNewBook({ ...newBook, count: e.target.value })}
                            className="add-book-input"
                        />
                    </label>
                    <button type="submit" className="add-book-button">Добавить книгу</button>
                </form>
            </section>
        </div>
    );
}

export default LibrarianBooks;
