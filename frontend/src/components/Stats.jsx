function Stats() {
  const stats = [
    {
      value: "10K+",
      title: "Resumes Processed"
    },
    {
      value: "98%",
      title: "Screening Accuracy"
    },
    {
      value: "500+",
      title: "Companies"
    },
    {
      value: "24/7",
      title: "AI Availability"
    }
  ];

  return (
    <section className="bg-slate-900 py-24 text-white">

      <h2 className="text-center text-5xl font-bold text-cyan-400">
        Trusted by Recruiters
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16 max-w-6xl mx-auto px-8">

        {stats.map((item, index) => (

          <div
            key={index}
            className="text-center bg-slate-800 rounded-2xl py-10 shadow-lg hover:scale-105 transition"
          >

            <h3 className="text-5xl font-bold text-cyan-400">
              {item.value}
            </h3>

            <p className="mt-4 text-gray-300 text-lg">
              {item.title}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Stats;