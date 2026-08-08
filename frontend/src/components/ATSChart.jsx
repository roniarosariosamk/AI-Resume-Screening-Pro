import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ATSChart({ candidates }) {
  if (!candidates || candidates.length === 0) return null;

  const chartData = candidates.map((candidate) => ({
    name: candidate.name,
    ATS: candidate.ats_score,
  }));

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl mt-8">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        📊 ATS Score Comparison
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="ATS"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ATSChart;