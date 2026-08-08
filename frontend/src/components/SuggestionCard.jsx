function SuggestionCard({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="bg-blue-900/30 border border-blue-500 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">
        💡 Improvement Suggestions
      </h2>

      <ul className="space-y-3">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="bg-blue-500/10 rounded-lg p-3 border border-blue-600"
          >
            🚀 {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionCard;