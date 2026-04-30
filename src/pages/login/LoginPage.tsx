import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post(
        '/api/v1/auth/login',
        { username, password },
        { skipAuth: true } as any
      );
      localStorage.setItem('accessToken', data.data.accessToken);
      navigate('/');
    } catch {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '16px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '40px 32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🐾</div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>
            동물상 찾기
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
            로그인하고 나의 동물상을 찾아보세요
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: '12px 16px',
              border: '1.5px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
            }}
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: '12px 16px',
              border: '1.5px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
            }}
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />

          {error && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '0' }}>
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              padding: '14px',
              background: isLoading ? '#a5b4fc' : '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
            }}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
