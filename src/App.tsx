import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UploadPage from './pages/upload/UploadPage';
import LoadingPage from './pages/loading/LoadingPage';
import ResultPage from './pages/result/ResultPage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';

const CollectionPage = React.lazy(() => import('./pages/collection/CollectionPage'));
const CollectionDetailPage = React.lazy(() => import('./pages/collection/CollectionDetailPage'));

// 로그인 여부 확인
const isLoggedIn = () => !!localStorage.getItem('accessToken');

// 인증 가드
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
          <Route path="/loading" element={<PrivateRoute><LoadingPage /></PrivateRoute>} />
          <Route path="/result" element={<PrivateRoute><ResultPage /></PrivateRoute>} />
          <Route path="/collection" element={<PrivateRoute><CollectionPage /></PrivateRoute>} />
          <Route path="/collection/:id" element={<PrivateRoute><CollectionDetailPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
