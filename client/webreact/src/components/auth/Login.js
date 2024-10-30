import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);

                navigate('/main');
            } else {
                console.log('Ошибка входа:', data.message || 'Произошла ошибка');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className='gradient'>
            <div className='container'>
                <div className='form-header'>
                    Sign In
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='username'>
                        <input
                            type='text'
                            placeholder='username or email'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='password'>
                        <input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type='submit' value='Sign In' />
                    </div>
                </form>
                <div className='anotherlogin'>
                    <div className='anotherlogin-text'>
                        Or login with
                    </div>
                    <div className='anotherlogin-icons'>
                        <div className='anotherlogin-icon'>
                            <div className='icon-github'></div>
                        </div>
                        <div className='anotherlogin-icon'>
                            <div className='icon-google'></div>
                        </div>
                    </div>
                </div>
                <div className='accounthave'>
                    <div className='accounthave-text'>
                        <Link to="/register" className='accounthave-link'>Don't have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
