function CandidateComparison({ candidate1, candidate2 }) {
  if (!candidate1 || !candidate2) return null;

  // Calculate overall score
  const score1 =
    Number(candidate1.ats_score || 0) +
    Number(candidate1.jd_match_score || 0);

  const score2 =
    Number(candidate2.ats_score || 0) +
    Number(candidate2.jd_match_score || 0);

  const bestCandidate = score1 >= score2 ? candidate1 : candidate2;
  const bestScore = Math.max(score1, score2);

  // Helper function for array values
  const formatArray = (value) => {
    if (!value) return "Not available";

    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : "Not available";
    }

    return value;
  };

  // Helper for long text
  const formatText = (value) => {
    if (!value) return "Not available";

    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : "Not available";
    }

    return value;
  };

  return (
    <div className="mt-12 bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <h2 className="text-4xl font-extrabold text-cyan-400 mb-8">
        ⚖️ Candidate Comparison
      </h2>

      {/* ===================================================== */}
      {/* BEST CANDIDATE */}
      {/* ===================================================== */}

      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 rounded-2xl p-8 mb-10 text-center shadow-xl">

        <h3 className="text-3xl font-extrabold text-black mb-4">
          🏆 Best Candidate
        </h3>

        <h4 className="text-4xl font-extrabold text-white mb-4">
          {bestCandidate.name}
        </h4>

        <p className="text-xl font-bold text-black">
          Overall Score: {bestScore}
        </p>

        <p className="text-xl font-bold text-yellow-100 mt-3">
          ⭐ {bestCandidate.hiring_recommendation || "Consider"}
        </p>

      </div>

      {/* ===================================================== */}
      {/* COMPARISON TABLE */}
      {/* ===================================================== */}

      <div className="overflow-x-auto rounded-2xl border border-slate-700">

        <table className="w-full text-white">

          {/* ================================================= */}
          {/* TABLE HEADER */}
          {/* ================================================= */}

          <thead>

            <tr className="border-b border-slate-600 bg-slate-800">

              <th className="p-5 text-left text-cyan-300 font-extrabold text-lg">
                Category
              </th>

              <th className="p-5 text-left text-cyan-300 font-extrabold text-lg">
                {candidate1.name}
              </th>

              <th className="p-5 text-left text-cyan-300 font-extrabold text-lg">
                {candidate2.name}
              </th>

            </tr>

          </thead>

          {/* ================================================= */}
          {/* TABLE BODY */}
          {/* ================================================= */}

          <tbody>

            {/* ATS SCORE */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300">
                ATS Score
              </td>

              <td
                className={`p-5 font-extrabold text-lg ${
                  Number(candidate1.ats_score || 0) >=
                  Number(candidate2.ats_score || 0)
                    ? "text-green-400"
                    : "text-white"
                }`}
              >
                {candidate1.ats_score ?? "N/A"}
              </td>

              <td
                className={`p-5 font-extrabold text-lg ${
                  Number(candidate2.ats_score || 0) >=
                  Number(candidate1.ats_score || 0)
                    ? "text-green-400"
                    : "text-white"
                }`}
              >
                {candidate2.ats_score ?? "N/A"}
              </td>

            </tr>

            {/* JD MATCH */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300">
                JD Match
              </td>

              <td
                className={`p-5 font-extrabold text-lg ${
                  Number(candidate1.jd_match_score || 0) >=
                  Number(candidate2.jd_match_score || 0)
                    ? "text-green-400"
                    : "text-white"
                }`}
              >
                {candidate1.jd_match_score ?? "N/A"}%
              </td>

              <td
                className={`p-5 font-extrabold text-lg ${
                  Number(candidate2.jd_match_score || 0) >=
                  Number(candidate1.jd_match_score || 0)
                    ? "text-green-400"
                    : "text-white"
                }`}
              >
                {candidate2.jd_match_score ?? "N/A"}%
              </td>

            </tr>

            {/* RECOMMENDATION */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300">
                Recommendation
              </td>

              <td className="p-5 text-yellow-400 font-bold text-lg">
                ⭐ {candidate1.hiring_recommendation || "Consider"}
              </td>

              <td className="p-5 text-yellow-400 font-bold text-lg">
                ⭐ {candidate2.hiring_recommendation || "Consider"}
              </td>

            </tr>

            {/* CONFIDENCE */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300">
                Confidence
              </td>

              <td className="p-5 text-white font-semibold">
                {candidate1.confidence ?? "Not available"}
              </td>

              <td className="p-5 text-white font-semibold">
                {candidate2.confidence ?? "Not available"}
              </td>

            </tr>

            {/* EXPERIENCE */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Experience
              </td>

              <td className="p-5 text-white leading-7 whitespace-pre-line">
                {formatText(candidate1.experience)}
              </td>

              <td className="p-5 text-white leading-7 whitespace-pre-line">
                {formatText(candidate2.experience)}
              </td>

            </tr>

            {/* EDUCATION */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Education
              </td>

              <td className="p-5 text-white leading-7">
                {formatText(candidate1.education)}
              </td>

              <td className="p-5 text-white leading-7">
                {formatText(candidate2.education)}
              </td>

            </tr>

            {/* SKILLS */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Skills
              </td>

              <td className="p-5 text-white leading-7">
                {formatArray(candidate1.skills)}
              </td>

              <td className="p-5 text-white leading-7">
                {formatArray(candidate2.skills)}
              </td>

            </tr>

            {/* MATCHED SKILLS */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Matched Skills
              </td>

              <td className="p-5 text-green-300 leading-7">
                {formatArray(candidate1.matched_skills)}
              </td>

              <td className="p-5 text-green-300 leading-7">
                {formatArray(candidate2.matched_skills)}
              </td>

            </tr>

            {/* MISSING SKILLS */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Missing Skills
              </td>

              <td className="p-5 text-red-300 leading-7">
                {formatArray(candidate1.missing_skills)}
              </td>

              <td className="p-5 text-red-300 leading-7">
                {formatArray(candidate2.missing_skills)}
              </td>

            </tr>

            {/* STRENGTHS */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Strengths
              </td>

              <td className="p-5 text-green-300 leading-7">
                {formatArray(candidate1.strengths)}
              </td>

              <td className="p-5 text-green-300 leading-7">
                {formatArray(candidate2.strengths)}
              </td>

            </tr>

            {/* WEAKNESSES */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Weaknesses
              </td>

              <td className="p-5 text-orange-300 leading-7">
                {formatArray(candidate1.weaknesses)}
              </td>

              <td className="p-5 text-orange-300 leading-7">
                {formatArray(candidate2.weaknesses)}
              </td>

            </tr>

            {/* SUMMARY */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Professional Summary
              </td>

              <td className="p-5 text-white leading-7">
                {formatText(candidate1.summary)}
              </td>

              <td className="p-5 text-white leading-7">
                {formatText(candidate2.summary)}
              </td>

            </tr>

            {/* PROJECTS */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Projects
              </td>

              <td className="p-5 text-white leading-7 whitespace-pre-line">
                {formatText(candidate1.projects)}
              </td>

              <td className="p-5 text-white leading-7 whitespace-pre-line">
                {formatText(candidate2.projects)}
              </td>

            </tr>

            {/* SUGGESTIONS */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                AI Suggestions
              </td>

              <td className="p-5 text-purple-300 leading-7">
                {formatArray(candidate1.suggestions)}
              </td>

              <td className="p-5 text-purple-300 leading-7">
                {formatArray(candidate2.suggestions)}
              </td>

            </tr>

            {/* RECOMMENDATION REASON */}

            <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

              <td className="p-5 font-extrabold text-cyan-300 align-top">
                Recommendation Reason
              </td>

              <td className="p-5 text-white leading-7">
                {formatText(candidate1.recommendation_reason)}
              </td>

              <td className="p-5 text-white leading-7">
                {formatText(candidate2.recommendation_reason)}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* ===================================================== */}
      {/* SCORE SUMMARY */}
      {/* ===================================================== */}

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* Candidate 1 */}

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-xl font-bold text-cyan-300 mb-4">
            📊 {candidate1.name}
          </h3>

          <p className="text-white mb-2">
            ATS Score:
            <span className="text-green-400 font-bold ml-2">
              {candidate1.ats_score}
            </span>
          </p>

          <p className="text-white mb-2">
            JD Match:
            <span className="text-green-400 font-bold ml-2">
              {candidate1.jd_match_score}%
            </span>
          </p>

          <p className="text-white">
            Overall Score:
            <span className="text-cyan-400 font-bold ml-2">
              {score1}
            </span>
          </p>

        </div>

        {/* Candidate 2 */}

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-xl font-bold text-cyan-300 mb-4">
            📊 {candidate2.name}
          </h3>

          <p className="text-white mb-2">
            ATS Score:
            <span className="text-green-400 font-bold ml-2">
              {candidate2.ats_score}
            </span>
          </p>

          <p className="text-white mb-2">
            JD Match:
            <span className="text-green-400 font-bold ml-2">
              {candidate2.jd_match_score}%
            </span>
          </p>

          <p className="text-white">
            Overall Score:
            <span className="text-cyan-400 font-bold ml-2">
              {score2}
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default CandidateComparison;