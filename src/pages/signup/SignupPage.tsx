import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!form.username || !form.password || !form.email) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await api.post(
        '/api/v1/auth/signup',
        { username: form.username, password: form.password, email: form.email },
        { skipAuth: true } as any
      );
      alert('회원가입 완료! 로그인해주세요.');
      navigate('/login');
    } catch {
      setError('회원가입에 실패했습니다. 이미 사용 중인 아이디일 수 있어요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSignup();
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px 16px',
    border: '1.5px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none',
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
            회원가입
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
            나의 동물상을 찾으러 가볼까요?
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />

          {error && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: '0' }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSignup}
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
            {isLoading ? '가입 중...' : '회원가입'}
          </button>

          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '14px',
              background: 'transparent',
              color: '#6b7280',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            이미 계정이 있나요? 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
