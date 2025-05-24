const data = [10, 20, 30, 40, 60, 80, 120, 160, 200, 250, 300, 350, 400, 420, 430, 440, 445, 448, 450];
const max = Math.max(...data);
const width = 320;
const height = 120;
const padding = 30;
const points = data
  .map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d / max) * (height - 2 * padding);
    return `${x},${y}`;
  })
  .join(" ");

const RewardChart = () => (
  <div style={{ margin: "2rem 0", textAlign: "center" }}>
    <svg width={width} height={height} style={{ background: "#f4f8fb", borderRadius: 12 }}>
      <polyline fill="none" stroke="#0070f3" strokeWidth="3" points={points} />
      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#bbb" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#bbb" />
      {/* Labels */}
      <text x={padding} y={height - 8} fontSize="0.9rem" fill="#888">
        0
      </text>
      <text x={padding} y={padding - 8} fontSize="0.9rem" fill="#888">
        Reward
      </text>
      <text x={width - padding} y={height - 8} fontSize="0.9rem" fill="#888">
        Episodes
      </text>
    </svg>
    <div style={{ color: "#0070f3", fontWeight: 500, marginTop: 8 }}>Reward increases as the agent learns!</div>
  </div>
);

export default RewardChart;
