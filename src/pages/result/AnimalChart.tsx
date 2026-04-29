import React from 'react';
import type { AnimalPrediction } from '../../types/result';

interface AnimalChartProps {
  animals: AnimalPrediction[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];

const AnimalChart: React.FC<AnimalChartProps> = ({ animals }) => {
  const sorted = [...animals].sort((a, b) => b.probability - a.probability);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sorted.map((animal, i) => (
        <div key={animal.label}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px',
            fontSize: '14px',
          }}>
            <span style={{ fontWeight: i === 0 ? 600 : 400 }}>{animal.label}</span>
            <span style={{ color: '#6b7280' }}>
              {(animal.probability * 100).toFixed(1)}%
            </span>
          </div>
          <div style={{
            height: '10px',
            background: '#f3f4f6',
            borderRadius: '999px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${animal.probability * 100}%`,
              background: COLORS[i] ?? '#e5e7eb',
              borderRadius: '999px',
              transition: 'width 0.8s ease',
            }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimalChart;
