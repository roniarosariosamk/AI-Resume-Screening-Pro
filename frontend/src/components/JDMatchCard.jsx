function JDMatchCard({ score }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-cyan-500">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        📋 Job Description Match
      </h2>

      <div className="text-center">

        <div className="text-6xl font-extrabold text-green-400">
          {score}%
        </div>

        <p className="text-gray-400 mt-4">
          Resume Compatibility Score
        </p>

      </div>

    </div>
  );
}

export default JDMatchCard;