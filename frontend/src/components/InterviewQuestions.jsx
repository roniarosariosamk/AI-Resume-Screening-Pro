function InterviewQuestions({ questions }) {
  if (!questions || questions.length === 0) return null;

  const difficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-cyan-500";
    }
  };

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold text-cyan-300 mb-6">
        🎤 AI Interview Questions
      </h2>

      <div className="space-y-5">

        {questions.map((q, index) => (

          <div
            key={index}
            className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/30 transition duration-300"
          >

            <div className="flex justify-between items-center mb-4">

              <span className="font-bold text-cyan-300">
                Question {index + 1}
              </span>

              <div className="flex gap-2">

                <span
                  className={`${difficultyColor(
                    q.difficulty
                  )} px-3 py-1 rounded-full text-sm font-bold text-white`}
                >
                  {q.difficulty}
                </span>

                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-bold text-white">
                  {q.category}
                </span>

              </div>

            </div>

            <p className="text-gray-300 leading-7">
              {q.question}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default InterviewQuestions;