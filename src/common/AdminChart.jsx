import React from 'react';

export default function AdminChart({ products = [], width = 700, rowHeight = 34 }) {
  // Agrupar stock por categoría
  const counts = products.reduce((acc, p) => {
    const cat = p.categoria || p.category || p.tipo || 'Sin categoría';
    const stock = Number(p.stock ?? p.cantidad ?? p.qty ?? 1) || 0;
    acc[cat] = (acc[cat] || 0) + stock;
    return acc;
  }, {});

  const entries = Object.entries(counts).map(([category, value]) => ({ category, value }));
  if (entries.length === 0) return <div className="text-light">No hay datos para mostrar.</div>;

  const max = Math.max(...entries.map(e => e.value), 1);
  const height = entries.length * rowHeight + 40;

  const palette = ['#00ffea', '#ffb86b', '#8be9fd', '#ff6b6b', '#c792ea', '#7efc5f'];

  return (
    <div className="admin-chart" style={{ color: '#fff' }}>
      <svg width={width} height={height} role="img" aria-label="Stock de productos por categoría">
        {entries.map((e, idx) => {
          const barMaxWidth = width - 220; // espacio para etiqueta y valor
          const barWidth = Math.round((e.value / max) * barMaxWidth);
          const y = 20 + idx * rowHeight;
          const color = palette[idx % palette.length];

          return (
            <g key={e.category} transform={`translate(0, ${y})`}>
              <text x={8} y={18} fontSize={13} fill="#cde8e3">{e.category}</text>

              <rect x={180} y={4} rx={6} ry={6} width={barWidth} height={22} fill={color} />

              <text x={180 + barWidth + 8} y={18} fontSize={13} fill="#e6fff9">{e.value}</text>
            </g>
          );
        })}
      </svg>

      <div style={{ marginTop: 8 }} className="small text-muted">
        <span style={{ color: '#cde8e3' }}>Representa el stock total por categoría.</span>
      </div>
    </div>
  );
}
