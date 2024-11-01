import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import AuthRedirect from './components/AuthRedirect';
import LibrarianBooks from './components/librarian/LibrarianBooks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthRedirect />}/>
        <Route path="/login" element={<Login />} />

        <Route path="/librarian" element={<PrivateRoute allowedRoles={['librarian']} />}>
          <Route path="/librarian/books" element={<LibrarianBooks />} />
        </Route>

        <Route path="/user" element={<PrivateRoute allowedRoles={['reader', 'librarian']} />}>
          <Route path="/user/profile" element={<Home />} />
        </Route>

        <Route path="*" element={<h1>404 - Страница не найдена</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;