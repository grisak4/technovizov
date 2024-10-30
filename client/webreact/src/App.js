import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Regin';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import AuthRedirect from './components/AuthRedirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthRedirect />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Home />} />
        </Route>

        <Route path="*" element={<h1>404 - Страница не найдена</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;