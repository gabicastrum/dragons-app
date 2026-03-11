import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './page/login/LoginPage';
import ListPage from './page/list/ListPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dragoes" element={<ListPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;