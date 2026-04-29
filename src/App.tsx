import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UploadPage from './pages/upload/UploadPage';
import LoadingPage from './pages/loading/LoadingPage';
import ResultPage from './pages/result/ResultPage';

// const CollectionPage = React.lazy(() => import('./pages/collection/CollectionPage'));
// const CollectionDetailPage = React.lazy(() => import('./pages/collection/CollectionDetailPage'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/result" element={<ResultPage />} />
          {/* <Route path="/collection" element={<CollectionPage />} /> */}
          {/* <Route path="/collection/:id" element={<CollectionDetailPage />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;