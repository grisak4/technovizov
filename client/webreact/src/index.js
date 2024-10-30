import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App'; // Импорт вашего основного компонента приложения

// Получаем корневой элемент для рендеринга
const rootElement = document.getElementById('root');

// Создаем корневой рендер
const root = ReactDOM.createRoot(rootElement);

// Рендерим приложение с использованием BrowserRouter
root.render(
  <App />
);