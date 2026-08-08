import AnalyticsCard from "./AnalyticsCard";

function AnalyticsDashboard({ data }) {
  if (!data) return null;

  const totalCandidates = data.total_candidates || 0;

  const averageATS =
    totalCandidates > 0
      ? (
          data.candidates.reduce(
            (sum, candidate) => sum + (candidate.ats_score || 0),
            0
          ) / totalCandidates
        ).toFixed(1)
      : 0;

  const averageJD =
    totalCandidates > 0
      ? (
          data.candidates.reduce(
            (sum, candidate) => sum + (candidate.jd_match_score || 0),
            0
          ) / totalCandidates
        ).toFixed(1)
      : 0;

  const bestCandidate =
    totalCandidates > 0
      ? Math.max(...data.candidates.map((c) => c.jd_match_score || 0))
      : 0;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

      <AnalyticsCard
        title="Total Candidates"
        value={totalCandidates}
        icon="👥"
        color="bg-gradient-to-r from-blue-600 to-cyan-500"
      />

      <AnalyticsCard
        title="Average ATS"
        value={`${averageATS}%`}
        icon="⭐"
        color="bg-gradient-to-r from-emerald-600 to-green-500"
      />

      <AnalyticsCard
        title="Average JD Match"
        value={`${averageJD}%`}
        icon="🎯"
        color="bg-gradient-to-r from-purple-600 to-pink-500"
      />

      <AnalyticsCard
        title="Best Match"
        value={`${bestCandidate}%`}
        icon="🥇"
        color="bg-gradient-to-r from-orange-500 to-yellow-400"
      />

    </div>
  );
}

export default AnalyticsDashboard;