function RecommendationCard({
  recommendation,
  confidence,
  reason,
}) {
  let color = "bg-yellow-500";
  let icon = "🟡";

  if (recommendation === "Hire") {
    color = "bg-green-500";
    icon = "🟢";
  }

  if (recommendation === "Reject") {
    color = "bg-red-500";
    icon = "🔴";
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🤖 AI Hiring Recommendation
      </h2>

      <div
        className={`${color} rounded-xl p-5 text-center text-white`}
      >
        <h1 className="text-4xl font-bold">
          {icon} {recommendation}
        </h1>
      </div>

      <div className="mt-6">

        <h3 className="text-cyan-300 font-semibold">
          Confidence
        </h3>

        <p className="text-3xl font-bold text-white">
          {confidence}%
        </p>

      </div>

      <div className="mt-6">

        <h3 className="text-cyan-300 font-semibold mb-2">
          Reason
        </h3>

        <p className="text-gray-300">
          {reason}
        </p>

      </div>

    </div>
  );
}

export default RecommendationCard;