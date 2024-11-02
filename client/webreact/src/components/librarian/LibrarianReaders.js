import React, { useEffect, useState } from "react";
import LibrarianNav from "../librarian/LibrarianNav";
import '../styles/LibrarianReaders.css';

function LibrarianReaders() {
    const [readers, setReaders] = useState([]);
    const [newReader, setNewReader] = useState({
        library_card: '',
        sur_name: '',
        first_name: '',
        patronymic: '',
        address: '',
        phone: '',
        data_entry: new Date().toISOString().split('T')[0], // Устанавливаем текущее значение даты
    });
    const [editReader, setEditReader] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchReaders();
    }, []);

    const fetchReaders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/librarian/getreaders', {
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении читателей');
            }
            const data = await response.json();
            console.log("Fetched readers:", data);
            setReaders(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleAddReader = async (e) => {
        e.preventDefault();
        if (!newReader.sur_name || !newReader.first_name || !newReader.phone || !newReader.data_entry) {
            setErrorMessage('Пожалуйста, заполните все обязательные поля.');
            return;
        }
    
        // Преобразование data_entry в нужный формат
        const formattedDateEntry = new Date(newReader.data_entry).toISOString();
    
        try {
            const token = localStorage.getItem('token');
    
            const response = await fetch('http://localhost:8080/librarian/addreader', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    ...newReader,
                    data_entry: formattedDateEntry, // Используем преобразованную дату
                }),
            });
    
            if (!response.ok) {
                throw new Error('Ошибка при добавлении читателя');
            }
    
            fetchReaders();
            setNewReader({ library_card: '', sur_name: '', first_name: '', patronymic: '', address: '', phone: '', data_entry: '' });
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
        console.log('Sending data to server:', JSON.stringify({
            ...newReader,
            data_entry: formattedDateEntry,
        }));
        
    };
    

    const handleDeleteReader = async (id) => {
        console.log("Deleting reader with ID:", id);
        if (!id) {
            console.error("Cannot delete reader, ID is undefined.");
            setErrorMessage('Ошибка: ID читателя не определён.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/librarian/deletereader/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении читателя');
            }

            fetchReaders();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEditReader = (reader) => {
        setEditReader({ ...reader, data_entry: reader.data_entry || '' });
    };

    const handleSaveChanges = async () => {
        if (!editReader.sur_name || !editReader.first_name || !editReader.phone || !editReader.data_entry) {
            setErrorMessage('Пожалуйста, заполните все обязательные поля для редактирования.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/librarian/changereader/${editReader.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(editReader), // Отправляем обновленные данные читателя
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении читателя');
            }

            fetchReaders();
            setEditReader(null);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
        
    };

    return (
        <div>
            <LibrarianNav />
            <div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <section className="readers-section">
                    <h2 className="section-title">Список читателей</h2>
                    <table className="table-readers">
                        <thead>
                            <tr>
                                <th>Библиотечная карта</th>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>Отчество</th>
                                <th>Адрес</th>
                                <th>Телефон</th>
                                <th>Дата записи</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {readers.map((reader) => (
                                <tr key={reader.id}>
                                    {editReader && editReader.id === reader.id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editReader.library_card}
                                                    onChange={(e) => setEditReader({ ...editReader, library_card: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editReader.sur_name}
                                                    onChange={(e) => setEditReader({ ...editReader, sur_name: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editReader.first_name}
                                                    onChange={(e) => setEditReader({ ...editReader, first_name: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editReader.patronymic}
                                                    onChange={(e) => setEditReader({ ...editReader, patronymic: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editReader.address}
                                                    onChange={(e) => setEditReader({ ...editReader, address: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editReader.phone}
                                                    onChange={(e) => setEditReader({ ...editReader, phone: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={editReader.data_entry ? editReader.data_entry.split('T')[0] : ''}
                                                    onChange={(e) => setEditReader({ ...editReader, data_entry: e.target.value })} // Установите значение как дату в формате YYYY-MM-DD
                                                />
                                            </td>
                                            <td>
                                                <button onClick={handleSaveChanges}>Сохранить</button>
                                                <button onClick={() => setEditReader(null)}>Отмена</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{reader.library_card}</td>
                                            <td>{reader.sur_name}</td>
                                            <td>{reader.first_name}</td>
                                            <td>{reader.patronymic}</td>
                                            <td>{reader.address}</td>
                                            <td>{reader.phone}</td>
                                            <td>{new Date(reader.data_entry).toLocaleDateString('ru-RU')}</td>
                                            <td>
                                                <button onClick={() => handleEditReader(reader)}>Изменить</button>
                                                <button onClick={() => handleDeleteReader(reader.id)}>Удалить</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="new-reader-section">
                    <h2 className="new-reader-title">Добавить нового читателя</h2>
                    <form className="new-reader-form" onSubmit={handleAddReader}>
                        <label className="new-reader-label">Библиотечная карта:
                            <input
                                type="text"
                                required
                                value={newReader.library_card}
                                onChange={(e) => setNewReader({ ...newReader, library_card: e.target.value })}
                                className="new-reader-input"
                            />
                        </label>
                        <label className="new-reader-label">Фамилия:
                            <input
                                type="text"
                                required
                                value={newReader.sur_name}
                                onChange={(e) => setNewReader({ ...newReader, sur_name: e.target.value })}
                                className="new-reader-input"
                            />
                        </label>
                        <label className="new-reader-label">Имя:
                            <input
                                type="text"
                                required
                                value={newReader.first_name}
                                onChange={(e) => setNewReader({ ...newReader, first_name: e.target.value })}
                                className="new-reader-input"
                            />
                        </label>
                        <label className="new-reader-label">Отчество:
                            <input
                                type="text"
                                value={newReader.patronymic}
                                onChange={(e) => setNewReader({ ...newReader, patronymic: e.target.value })}
                                className="new-reader-input"
                            />
                        </label>
                        <label className="new-reader-label">Адрес:
                            <input
                                type="text"
                                value={newReader.address}
                                onChange={(e) => setNewReader({ ...newReader, address: e.target.value })}
                                className="new-reader-input"
                            />
                        </label>
                        <label className="new-reader-label">Телефон:
                            <input
                                type="text"
                                required
                                value={newReader.phone}
                                onChange={(e) => setNewReader({ ...newReader, phone: e.target.value })}
                                className="new-reader-input"
                            />
                        </label>
                        <label className="new-reader-label">Дата записи:
                        <input
    type="date"
    required
    value={newReader.data_entry ? newReader.data_entry.split('T')[0] : ''}
    onChange={(e) => setNewReader({ ...newReader, data_entry: e.target.value ? e.target.value + 'T00:00:00Z' : '' })}
    className="new-reader-input"
/>

</label>

                        <button type="submit" className="submit-button">Добавить читателя</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default LibrarianReaders;
