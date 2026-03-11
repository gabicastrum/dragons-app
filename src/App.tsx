import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './page/login/LoginPage';
import ListPage from './page/list/ListPage';
import { AuthProvider } from './contexts/AuthProvider';
import { PrivateRoute } from './routes/PrivateRoutes';


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dragoes" element={ <PrivateRoute><ListPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;