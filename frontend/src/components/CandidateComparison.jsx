function CandidateComparison({ candidate1, candidate2 }) {
   
    if (!candidate1 || !candidate2) return null;

    const betterATS =
      candidate1.ats_score >= candidate2.ats_score
        ? 1
        : 2;

    const betterJD =
      candidate1.jd_match_score >= candidate2.jd_match_score
        ? 1
        : 2;

    const total1 =
       candidate1.ats_score +
       candidate1.jd_match_score;

    const total2 =
        candidate2.ats_score +
        candidate2.jd_match_score;

    const winner =
       total1 >= total2
         ? candidate1
         : candidate2;   

  return (
    <div className="mt-10 bg-slate-900 rounded-2xl p-8 shadow-xl">

      <h2 className="text-3xl font-bold text-cyan-400 mb-8">
        ⚖️ Candidate Comparison
      </h2>

      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 mb-8 text-center">

        <h2 className="text-3xl font-bold text-black">
            🏆 Best Candidate
        </h2>

        <h1 className="text-4xl font-extrabold mt-3 text-white">
          {winner.name}
        </h1>

        <p className="mt-4 text-black font-semibold">
            Overall Score: {Math.max(total1, total2)}
        </p>

        <p className="text-black font-bold mt-2">
          ⭐ {winner.hiring_recommendation}
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="p-4 text-left text-cyan-300">
                Category
              </th>

              <th className="p-4 text-left text-cyan-300">
                {candidate1.name}
              </th>

              <th className="p-4 text-left text-cyan-300">
                {candidate2.name}
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b border-slate-800">
              <td className="p-4 font-bold">ATS Score</td>
              <td
                className={
                  betterATS === 1
                    ? "text-green-400 font-bold"
                    : ""
                }
              >
                {candidate1.ats_score}
              </td>

              <td
                className={
                  betterATS === 2
                    ? "text-green-400 font-bold"
                    : ""
                }
              >
                {candidate2.ats_score}
              </td>

              <td
                className={
                  betterJD === 1
                    ? "text-green-400 font-bold"
                    : ""
                }
              >
                {candidate1.jd_match_score}%
              </td>

              <td
                className={
                  betterJD === 2
                    ? "text-green-400 font-bold"
                    : ""
                }
              >
                {candidate2.jd_match_score}%
              </td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="p-4 font-bold">JD Match</td>
              <td>{candidate1.jd_match_score}%</td>
              <td>{candidate2.jd_match_score}%</td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="p-4 font-bold">Recommendation</td>
              <td>{candidate1.hiring_recommendation}</td>
              <td>{candidate2.hiring_recommendation}</td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="p-4 font-bold">Experience</td>
              <td>{candidate1.experience}</td>
              <td>{candidate2.experience}</td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="p-4 font-bold">Skills</td>

              <td>
                {candidate1.skills.join(", ")}
              </td>

              <td>
                {candidate2.skills.join(", ")}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CandidateComparison;