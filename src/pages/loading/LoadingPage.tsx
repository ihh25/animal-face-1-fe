import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResultStore } from '../../store/useResultStore';
import Loader from '../../components/Loader';

const MESSAGES = [
  '얼굴을 분석하고 있어요 🔍',
  '동물상을 찾고 있어요 🐾',
  '거의 다 됐어요! 🎉',
];

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const { result, error } = useResultStore();
  const [msgIndex, setMsgIndex] = React.useState(0);

  // 메시지 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // 결과 오면 자동 이동
  useEffect(() => {
    if (result) navigate('/result');
    if (error) navigate('/');
  }, [result, error, navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <Loader message={MESSAGES[msgIndex]} />
    </div>
  );
};

export default LoadingPage;
