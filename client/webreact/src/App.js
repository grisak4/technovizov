import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
import Login from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import AuthRedirect from './components/AuthRedirect';
//
import LibrarianBooks from './components/librarian/LibrarianBooks';
import LibrarianReaders from './components/librarian/LibrarianReaders';
import LibrarianAuthors from './components/librarian/LibrarianAuthors';
import LibrarianIssues from './components/librarian/LibrarianIssues';
//
import ReaderBooks from './components/reader/ReaderBooks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthRedirect />}/>
        <Route path="/login" element={<Login />} />

        <Route path="/librarian" element={<PrivateRoute allowedRoles={['librarian']} />}>
          <Route path="books" element={<LibrarianBooks />} />
          <Route path="readers" element={<LibrarianReaders />} />
          <Route path="authors" element={<LibrarianAuthors />} />
          <Route path="issues" element={<LibrarianIssues />} />
        </Route>

        <Route path="/reader" element={<PrivateRoute allowedRoles={['reader']} />}>
          <Route path="books" element={<ReaderBooks />} />
        </Route>

        <Route path="*" element={<h1>404 - Страница не найдена</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;