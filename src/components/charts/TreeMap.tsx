import React, { useState } from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

// Generazione di dati per 50 owner
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `Owner ${index + 1}`,
    value: Math.floor(Math.random() * 1000) + 100, // Valori tra 100 e 1100
  }));
};

const data = generateData(200);

// Scala di colori
const COLORS = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

// Funzione per ottenere un colore dalla scala
const getColor = (index: number) => {
  const color = COLORS[index % COLORS.length];
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`; // Aggiunta di opacità
};

// Tooltip dinamico e moderno
const TooltipComponent = ({ x, y, width, height, name, value }: any) => {
    const tooltipWidth = 200;
    const tooltipHeight = 100;
  
    // Posizionamento dinamico
    const isNearTop = y < tooltipHeight;
    const isNearBottom = y + tooltipHeight > height;
    const isNearLeft = x < tooltipWidth / 2;
    const isNearRight = x + tooltipWidth > width;
  
    const tooltipX = isNearLeft ? x + 10 : isNearRight ? x - tooltipWidth - 10 : x - tooltipWidth / 2;
    const tooltipY = isNearTop ? y + height + 15 : isNearBottom ? y - tooltipHeight - 15 : y - tooltipHeight - 15;
  
    return (
      <foreignObject x={tooltipX} y={tooltipY} width={tooltipWidth} height={tooltipHeight}>
        <div
          style={{
            background: 'linear-gradient(135deg, #1f2937, #4b5563)',
            color: '#fff',
            padding: '15px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease-in-out',
            position: 'relative',
          }}
        >
          {/* Testo del tooltip */}
          <div style={{ marginBottom: '5px' }}>📷 <strong>{name}</strong></div>
          <div>🔢 Valore: {value}</div>
  
          {/* Freccia del tooltip */}
          <div
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: isNearTop ? '10px solid #4b5563' : 'none',
              borderBottom: !isNearTop ? '10px solid #4b5563' : 'none',
              top: isNearTop ? '-10px' : 'auto',
              bottom: !isNearTop ? '-10px' : 'auto',
              left: 'calc(50% - 10px)',
            }}
          ></div>
        </div>
      </foreignObject>
    );
  };
  

// Componente personalizzato per i nodi
const CustomTreeNode = ({ x, y, width, height, name, value, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rettangolo principale */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: getColor(index),
          stroke: '#fff',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
        }}
      />
      {/* Strato nero semitrasparente su hover */}
      {isHovered && (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: 'rgba(0, 0, 0, 0.2)',
            pointerEvents: 'none',
          }}
        />
      )}
      {/* Tooltip su hover */}
      {isHovered && (
        <TooltipComponent
          x={x}
          y={y}
          width={width}
          height={height}
          name={name}
          value={value}
        />
      )}
    </g>
  );
};

export function TreeMap() {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <Treemap
          data={data}
          dataKey="value"
          stroke="#fff"
          isAnimationActive={true}
          animationDuration={800}
          content={<CustomTreeNode />} // Usa il componente personalizzato
        />
      </ResponsiveContainer>
    </div>
  );
}
