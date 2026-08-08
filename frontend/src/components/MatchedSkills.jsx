function MatchedSkills({ skills }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-green-400 mb-5">
        ✅ Matched Skills
      </h2>

      <div className="flex flex-wrap gap-3">

        {skills?.map((skill, index) => (

          <span
            key={index}
            className="bg-green-600 px-4 py-2 rounded-full"
          >
            {skill}
          </span>

        ))}

      </div>

    </div>
  );
}

export default MatchedSkills;