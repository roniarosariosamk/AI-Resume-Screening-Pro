function TopCandidate({ candidate }) {
  if (!candidate) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl mb-10">

      <h2 className="text-3xl font-bold text-white mb-6">
        🏆 Top Candidate
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <h1 className="text-4xl font-bold text-white">
            {candidate.name}
          </h1>

          <p className="text-white/90 mt-2">
            {candidate.email}
          </p>

          <p className="text-white/90">
            {candidate.phone}
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white/20 rounded-xl p-4 text-center">

            <h3 className="text-white text-sm">
              ATS Score
            </h3>

            <p className="text-3xl font-bold text-white">
              {candidate.ats_score}%
            </p>

          </div>

          <div className="bg-white/20 rounded-xl p-4 text-center">

            <h3 className="text-white text-sm">
              JD Match
            </h3>

            <p className="text-3xl font-bold text-white">
              {candidate.jd_match_score}%
            </p>

          </div>

          <div className="bg-white/20 rounded-xl p-4 text-center col-span-2">

            <h3 className="text-white text-sm">
              Rank
            </h3>

            <p className="text-3xl font-bold text-white">
              🥇 #{candidate.rank}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TopCandidate;