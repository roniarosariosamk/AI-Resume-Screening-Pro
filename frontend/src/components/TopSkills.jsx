function TopSkills({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🚀 Top Skills Across Candidates
      </h2>

      <div className="space-y-4">

        {skills.map((item, index) => (

          <div key={index}>

            <div className="flex justify-between mb-1">

              <span className="text-white font-semibold">
                {item.skill}
              </span>

              <span className="text-cyan-300">
                {item.count}
              </span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">

              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full"
                style={{
                  width: `${Math.min(item.count * 10, 100)}%`,
                }}
              ></div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopSkills;