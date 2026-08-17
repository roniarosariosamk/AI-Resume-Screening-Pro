import { useState } from "react";
import { updateCandidateStatus } from "../services/CandidateService";
import toast from "react-hot-toast";

function RecruiterDashboard({ 
  data,
  onSelectCandidate,
  onCompare,
  candidate1,
  candidate2,

}) {

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("jd");

  const [atsFilter, setAtsFilter] = useState(0);

  const [jdFilter, setJdFilter] = useState(0);

  const [recommendationFilter, setRecommendationFilter] = useState("All");

  const handleStatusUpdate = async (candidate, status) => {

    
    console.log("CANDIDATE OBJECT:", candidate);
    console.log("CANDIDATE KEYS:", Object.keys(candidate));

    try {

        await updateCandidateStatus(candidate.id, status);

        toast.success(`Candidate marked as ${status}`);

    

    } catch (error) {

        console.error("STATUS ERROR:", error);


    }

}; 

  if (!data || !data.candidates) return null;

  let candidates = [...data.candidates];

  candidates = candidates.filter((candidate) => {

  const nameMatch =
    candidate.name
      .toLowerCase()
      .includes(search.toLowerCase());

  const atsMatch =
    candidate.ats_score >= atsFilter;

  const jdMatch =
    candidate.jd_match_score >= jdFilter;

  const recommendationMatch =
    recommendationFilter === "All" ||
    candidate.hiring_recommendation === recommendationFilter;

  return (
    nameMatch &&
    atsMatch &&
    jdMatch &&
    recommendationMatch
  );

});

  if (sortBy === "jd") {
    candidates.sort((a, b) => b.jd_match_score - a.jd_match_score);
  }

  if (sortBy === "ats") {
    candidates.sort((a, b) => b.ats_score - a.ats_score);
  }

  if (sortBy === "name") {
    candidates.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="mt-10 bg-slate-900 rounded-2xl p-8 shadow-xl">

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        📋 Recruiter Dashboard
      </h2>

      <p className="text-gray-300 mb-6">
        Total Candidates:
        <span className="text-cyan-400 font-bold ml-2">
          {data.total_candidates}
        </span>
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search Candidate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
      />

      {/* Sort */}

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
      >
        <option value="jd">Sort by JD Match</option>
        <option value="ats">Sort by ATS Score</option>
        <option value="name">Sort by Name</option>
      </select>

      {/* ATS Filter */}

      <input
        type="number"
        min="0"
        max="100"
        placeholder="Min ATS"
        value={atsFilter}
        onChange={(e) => setAtsFilter(Number(e.target.value))}
        className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
     />

      {/* JD Filter */}

      <input
        type="number"
        min="0"
        max="100"
        placeholder="Min JD Match"
        value={jdFilter}
        onChange={(e) => setJdFilter(Number(e.target.value))}
        className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
     />

      {/* Recommendation Filter */}

      <select
        value={recommendationFilter}
        onChange={(e) => setRecommendationFilter(e.target.value)}
        className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700"
      >
        <option value="All">All</option>
        <option value="Hire">Hire</option>
        <option value="Consider">Consider</option>
        <option value="Reject">Reject</option>
      </select>

    </div> 



    {/* Comparison Selection */}

    <div className="mb-6 bg-slate-800 border border-purple-500/40 rounded-xl p-5">

      <h3 className="text-xl font-bold text-purple-400 mb-3">
        ⚖️ Comparison Selection
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-slate-900 rounded-lg p-4">
          <p className="text-gray-400 text-sm">
            Candidate 1
          </p>

          <p className="text-white font-bold mt-1">
            {candidate1
              ? candidate1.name
              : "Not selected"}
          </p>
        </div>

        <div className="bg-slate-900 rounded-lg p-4">
          <p className="text-gray-400 text-sm">
            Candidate 2
          </p>

          <p className="text-white font-bold mt-1">
            {candidate2
              ? candidate2.name
              : "Not selected"}
          </p>
        </div>

      </div>

      {!candidate2 && candidate1 && (
        <p className="text-yellow-400 mt-4">
          👉 Now click Compare on another candidate.
        </p>
      )}

      {candidate1 && candidate2 && (
        <p className="text-green-400 mt-4 font-bold">
          ✅ Two candidates selected. Comparison is ready!
        </p>
      )}

    </div>


    <div className="overflow-x-auto">

      <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-cyan-300">

              <th className="p-3">Rank</th>
              <th className="p-3">Candidate</th>
              <th className="p-3">ATS</th>
              <th className="p-3">JD Match</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {candidates.map((candidate) => (

              <tr
                key={candidate.email}
                className="border-b border-slate-800 hover:bg-slate-800"
              >

                <td className="p-3 text-center">

                  {candidate.rank === 1
                    ? "🥇"
                    : candidate.rank === 2
                    ? "🥈"
                    : candidate.rank === 3
                    ? "🥉"
                    : candidate.rank}

                </td>

                <td className="p-3 font-semibold text-white">
                  {candidate.name}
                </td>

                <td className="p-3 text-center">
                  {candidate.ats_score}
                </td>

                <td className="p-3 text-center">

                  <span className="text-green-400 font-bold">
                    {candidate.jd_match_score}%
                  </span>

                </td>

                <td className="p-3 text-center">

                  <span
                    className={
                      candidate.status === "Shortlisted"
                        ? "text-green-400 font-bold"
                        : candidate.status === "Interview"
                        ? "text-blue-400 font-bold"
                        : candidate.status === "Rejected"
                        ? "text-red-400 font-bold"
                        : candidate.status === "Hired"
                        ? "text-emerald-400 font-bold"
                        : "text-yellow-400 font-bold"
                    }
                >
                    {candidate.status || "Pending"}
                </span>

              </td>

                <td className="p-3 text-center">

                  <div className="flex gap-2 justify-center">

                    <button
                        onClick={() => {
                            console.log("VIEW CLICKED:", candidate);
                            onSelectCandidate(candidate);
                        }}
                        className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg font-bold"
                    >
                        View
                    </button>

                    <button
                        onClick={() => {
                          
                            console.log("COMPARE CLICKED:", candidate);
                            onCompare(candidate);
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold"
                    >
                        Compare
                    </button>

                    <button
                        onClick={() => handleStatusUpdate(candidate, "Shortlisted")}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                    >
                        Shortlist
                    </button>

                    <button
                        onClick={() => handleStatusUpdate(candidate, "Interview")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                    >
                        Interview
                    </button>

                    <button
                        onClick={() => handleStatusUpdate(candidate, "Rejected")}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                    >
                        Reject
                    </button>

                    <button
                        onClick={() => handleStatusUpdate(candidate, "Hired")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg"
                    >
                        Hire
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecruiterDashboard;