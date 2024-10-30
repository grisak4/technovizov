const API_BASE_URL = 'http://localhost:8080';  // Замените на ваш реальный адрес сервера

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userElement = document.getElementById('user');
    const emailElement = document.getElementById('email');
    const logoutButton = document.getElementById('logout');
    const getHelloButton = document.getElementById('getHello');
    const helloMessage = document.getElementById('helloMessage');

    // Обработка логина
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error('Ошибка при входе');
                }

                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                window.location.href = 'profile.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Обработка регистрации
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                if (!response.ok) {
                    throw new Error('Ошибка при регистрации');
                }

                alert('Регистрация успешна! Теперь войдите.');
                window.location.href = 'login.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Загрузка данных профиля
    if (userElement && emailElement) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (!token) {
            window.location.href = 'login.html';
        } else {
            userElement.textContent = username;
            // Дополнительные данные (например, email) можно получить с сервера
        }
    }

    // Обработка выхода из системы
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        });
    }

    // Запрос на защищенный endpoint /auth/hello
    if (getHelloButton) {
        getHelloButton.addEventListener('click', async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${API_BASE_URL}/auth/hello`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка доступа');
                }

                const data = await response.json();
                helloMessage.textContent = data.message;
            } catch (error) {
                helloMessage.textContent = error.message;
            }
        });
    }
});
