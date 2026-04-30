import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResultStore } from '../../store/useResultStore';
import AnimalChart from './AnimalChart';
import type { AnimalType, AnimalPrediction } from '../../types/result';

const ANIMAL_EMOJI: Record<AnimalType, string> = {
  CAT: '🐱',
  DOG: '🐶',
  FOX: '🦊',
  BEAR: '🐻',
};

const ANIMAL_NAME: Record<AnimalType, string> = {
  CAT: '고양이상',
  DOG: '강아지상',
  FOX: '여우상',
  BEAR: '곰상',
};

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { result, reset } = useResultStore();

  if (!result) {
    navigate('/');
    return null;
  }

  // allSimilarities를 AnimalPrediction[] 배열로 변환
  const animals: AnimalPrediction[] = Object.entries(result.allSimilarities ?? {}).map(
    ([label, probability]) => ({
      label: label as AnimalType,
      probability: probability as number, // / 100 제거!
    })
  );

  const emoji = ANIMAL_EMOJI[result.animalType] ?? '🐾';
  const animalName = ANIMAL_NAME[result.animalType] ?? result.animalType;

  const handleRetry = () => {
    reset();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 16px' }}>
      {/* 결과 카드 */}
      <div style={{
        background: '#f5f3ff',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        <div style={{ fontSize: '72px', marginBottom: '12px' }}>{emoji}</div>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>
          당신의 동물상은
        </p>
        <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#4f46e5' }}>
          {animalName}
        </h2>
      </div>

      {/* 업로드 이미지 */}
      <img
        src={result.imageUrl}
        alt="분석한 사진"
        style={{
          width: '100%',
          borderRadius: '12px',
          objectFit: 'cover',
          maxHeight: '280px',
          marginBottom: '32px',
        }}
      />

      {/* 확률 차트 */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
        동물상 분석 결과
      </h3>
      <AnimalChart animals={animals} />

      {/* 버튼 */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button
          onClick={handleRetry}
          style={{
            flex: 1,
            padding: '14px',
            background: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          다시 분석
        </button>
        <button
          onClick={() => navigate('/collection')}
          style={{
            flex: 1,
            padding: '14px',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          내 도감 보기
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
