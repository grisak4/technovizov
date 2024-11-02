import React, { useEffect, useState } from "react";
import LibrarianNav from "./LibrarianNav";
import '../styles/LibrarianAuthors.css'; // Ensure this path matches your project structure

function LibrarianAuthors() {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({
        pseudonym: '',
    });
    const [editAuthor, setEditAuthor] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/librarian/getauthors', {
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

    const handleAddAuthor = async (e) => {
        e.preventDefault();
        if (!newAuthor.pseudonym) {
            setErrorMessage('Пожалуйста, введите псевдоним автора.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/librarian/addauthor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(newAuthor),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении автора');
            }

            fetchAuthors();
            setNewAuthor({ pseudonym: '' });
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleDeleteAuthor = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/librarian/deleteauthor/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении автора');
            }

            fetchAuthors();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEditAuthor = (author) => {
        setEditAuthor({ ...author });
    };

    const handleSaveChanges = async () => {
        if (!editAuthor.pseudonym) {
            setErrorMessage('Пожалуйста, введите псевдоним автора.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/librarian/changeauthor/${editAuthor.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(editAuthor),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении автора');
            }

            fetchAuthors();
            setEditAuthor(null);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="librarian-authors">
            <LibrarianNav />
            <div className="authors-container">
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <section className="authors-section">
                    <h2 className="section-title">Список авторов</h2>
                    <table className="table-authors">
                        <thead>
                            <tr>
                                <th>Псевдоним</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((author) => (
                                <tr key={author.id}>
                                    {editAuthor && editAuthor.id === author.id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editAuthor.pseudonym}
                                                    onChange={(e) => setEditAuthor({ ...editAuthor, pseudonym: e.target.value })}
                                                    className="edit-author-input"
                                                />
                                            </td>
                                            <td>
                                                <button onClick={handleSaveChanges} className="save-button">Сохранить</button>
                                                <button onClick={() => setEditAuthor(null)} className="cancel-button">Отмена</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{author.pseudonym}</td>
                                            <td>
                                                <button onClick={() => handleEditAuthor(author)} className="edit-button">Изменить</button>
                                                <button onClick={() => handleDeleteAuthor(author.id)} className="delete-button">Удалить</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="new-author-section">
                    <h2 className="new-author-title">Добавить нового автора</h2>
                    <form className="new-author-form" onSubmit={handleAddAuthor}>
                        <label className="new-author-label">Псевдоним:
                            <input
                                type="text"
                                required
                                value={newAuthor.pseudonym}
                                onChange={(e) => setNewAuthor({ ...newAuthor, pseudonym: e.target.value })}
                                className="new-author-input"
                            />
                        </label>
                        <button type="submit" className="add-author-button">Добавить автора</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default LibrarianAuthors;
