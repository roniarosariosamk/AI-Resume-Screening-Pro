function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Resumes",
      description: "Upload one or multiple candidate resumes securely."
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI extracts skills, education, projects and experience."
    },
    {
      number: "03",
      title: "Candidate Ranking",
      description: "Candidates are ranked automatically using ATS scoring."
    },
    {
      number: "04",
      title: "Interview Ready",
      description: "Generate interview questions and shortlist instantly."
    }
  ];

  return (
    <section className="bg-slate-950 py-24 px-8 text-white">

      <h2 className="text-5xl font-bold text-center text-cyan-400">
        How It Works
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-400 transition"
          >
            <div className="text-5xl font-bold text-cyan-400">
              {step.number}
            </div>

            <h3 className="mt-5 text-2xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-4 text-gray-300">
              {step.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default HowItWorks;