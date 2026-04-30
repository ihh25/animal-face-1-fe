import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAndAnalyze } from '../../api/upload';
import { useResultStore } from '../../store/useResultStore';

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { setResult, setLoading, setError } = useResultStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setLoading(true);
    navigate('/loading');
    try {
      const result = await uploadAndAnalyze(selectedFile);
      setResult(result);
      navigate('/result');
    } catch (err) {
      setError('분석에 실패했습니다. 다시 시도해주세요.');
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 16px' }}>
      {/* 로그아웃 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            color: '#6b7280',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          로그아웃
        </button>
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
        나의 동물상 찾기 🐾
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>
        얼굴 사진을 업로드하면 닮은 동물상을 알려드려요
      </p>

      {/* 드래그앤드롭 영역 */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => document.getElementById('file-input')?.click()}
        style={{
          border: `2px dashed ${isDragging ? '#6366f1' : '#d1d5db'}`,
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? '#eef2ff' : '#f9fafb',
          transition: 'all 0.2s',
          marginBottom: '24px',
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="미리보기"
            style={{ maxHeight: '240px', borderRadius: '8px', objectFit: 'cover' }}
          />
        ) : (
          <>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📷</div>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              사진을 드래그하거나 클릭해서 업로드
            </p>
          </>
        )}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedFile}
        style={{
          width: '100%',
          padding: '14px',
          background: selectedFile ? '#6366f1' : '#e5e7eb',
          color: selectedFile ? '#fff' : '#9ca3af',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: selectedFile ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s',
        }}
      >
        분석 시작
      </button>
    </div>
  );
};

export default UploadPage;
