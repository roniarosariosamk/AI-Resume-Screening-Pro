function StrengthCard({ strengths }) {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="bg-green-900/30 border border-green-500 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-green-400 mb-4">
        💪 Resume Strengths
      </h2>

      <ul className="space-y-3">
        {strengths.map((item, index) => (
          <li
            key={index}
            className="bg-green-500/10 rounded-lg p-3 border border-green-600"
          >
            ✅ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StrengthCard;