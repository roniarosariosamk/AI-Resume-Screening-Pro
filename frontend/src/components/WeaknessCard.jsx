function WeaknessCard({ weaknesses }) {
  if (!weaknesses || weaknesses.length === 0) return null;

  return (
    <div className="bg-red-900/30 border border-red-500 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-red-400 mb-4">
        ⚠ Resume Weaknesses
      </h2>

      <ul className="space-y-3">
        {weaknesses.map((item, index) => (
          <li
            key={index}
            className="bg-red-500/10 rounded-lg p-3 border border-red-600"
          >
            ❌ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeaknessCard;