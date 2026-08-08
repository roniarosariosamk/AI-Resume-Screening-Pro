import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function JDMatchPieChart({ candidates }) {
  if (!candidates || candidates.length === 0) return null;

  const excellent = candidates.filter(c => c.jd_match_score >= 90).length;
  const good = candidates.filter(c => c.jd_match_score >= 70 && c.jd_match_score < 90).length;
  const average = candidates.filter(c => c.jd_match_score >= 50 && c.jd_match_score < 70).length;
  const low = candidates.filter(c => c.jd_match_score < 50).length;

  const data = [
    { name: "Excellent", value: excellent },
    { name: "Good", value: good },
    { name: "Average", value: average },
    { name: "Low", value: low },
  ];

  const COLORS = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl mt-8">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🥧 JD Match Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default JDMatchPieChart;