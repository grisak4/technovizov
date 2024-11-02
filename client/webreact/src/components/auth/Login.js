import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Login.css';

const Login = () => {
    const [login, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Новое состояние для сообщения об ошибке
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });
        
            const data = await response.json();
        
            if (response.ok) {
                localStorage.setItem('token', data.token);
        
                // Декодируем токен для извлечения роли пользователя
                const decoded = jwtDecode(data.token);
                const userRole = decoded.role;
        
                // Определяем маршрут в зависимости от роли
                let redirectPath = '/';
                if (userRole === 'librarian') {
                    redirectPath = '/librarian/books';
                } else if (userRole === 'reader') {
                    redirectPath = '/reader/books';
                }
        
                navigate(redirectPath);
            } else {
                setErrorMessage(data.message || 'Неверный логин или пароль');
            }
        } catch (error) {
            setErrorMessage('Ошибка подключения к серверу');
        }        
    };

    return (
        <div className='login-body'>
            <div className='login-container'>
                <div className='login-form-header'>
                    Вход в аккаунт
                </div>
                {/* Блок для отображения сообщения об ошибке */}
                {errorMessage && <div className='login-error'>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='login-form-input'>
                        <div className='login-form-input-login'>
                            <input
                                type='text'
                                placeholder='Логин'
                                value={login}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='login-form-input'>
                        <div className='login-form-input-password'>
                            <input
                                type='password'
                                placeholder='Пароль'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='login-form-input-submit'>
                        <input type='submit' value='Войти' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
