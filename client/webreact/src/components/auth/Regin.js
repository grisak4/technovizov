import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Regin.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Ошибка регистрации');
            }

            alert("Register completed!");
            navigate('/login');
        } catch (error) {
            console.error('Ошибка:', error);
            alert("Произошла ошибка при регистрации. Попробуйте еще раз.");
        }
    };

    return (
        <div className='gradient'>
            <div className='regin-container'>
                <div className='regin-form-header'>
                    Sign Up
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='regin-username'>
                        <input
                            type='text'
                            placeholder='username or email'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='regin-password'>
                        <input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='regin-password'>
                        <input
                            type='password'
                            placeholder='repeat password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input type='submit' value='Register' />
                    </div>
                </form>
                <div className='regin-anotherlogin'>
                    <div className='anotherlogin-text'>
                        Or login with
                    </div>
                    <div className='regin-anotherlogin-icons'>
                        <div className='anotherlogin-icon'>
                            <div className='icon-github'></div>
                        </div>
                        <div className='regin-anotherlogin-icon'>
                            <div className='icon-google'></div>
                        </div>
                    </div>
                </div>
                <div className='regin-accounthave'>
                    <div className='regin-accounthave-text'>
                        <Link to="/login" className='regin-accounthave-link'>Already have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
