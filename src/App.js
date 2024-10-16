// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./Providers/AuthProvider/AuthProvider";
import { ThemeProvider } from './components/Layout/ThemeContext/ThemeContext';
import AdminLayout from '../src/components/Layout/Admin/Layout/AdminLayout';
import DefaultLayout from './components/Layout/DefaultLayout';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
  );
}

const MainRoutes = () => {
  
  return (
    <div >
      <Routes>
        <Route path={`/${process.env.REACT_APP_BASE_URL}`} element={<DefaultLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to={process.env.REACT_APP_BASE_URL} replace />} />
      </Routes>
    </div>
  );
}

export default App;
