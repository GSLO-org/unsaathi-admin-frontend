import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';

function PrivateRoute({ children }) {
  const isAuth = !!localStorage.getItem('token');
  return isAuth ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
