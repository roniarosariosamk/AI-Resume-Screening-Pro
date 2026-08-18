import {
  Brain,
  FileText,
  Trophy,
  MessageSquareText,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <Brain size={40} className="text-cyan-400" />,
      title: "AI Resume Analysis",
      description:
        "Automatically analyze resumes and extract skills, education, experience, and projects.",
    },
    {
      icon: <Trophy size={40} className="text-cyan-400" />,
      title: "Candidate Ranking",
      description:
        "Rank candidates using AI-powered ATS scoring and smart filtering.",
    },
    {
      icon: <MessageSquareText size={40} className="text-cyan-400" />,
      title: "Resume Chatbot",
      description:
        "Ask questions about uploaded resumes using natural language.",
    },
    {
      icon: <FileText size={40} className="text-cyan-400" />,
      title: "Interview Generator",
      description:
        "Generate personalized interview questions based on candidate profiles.",
    },
  ];

  return (
    <section id="features" className="bg-slate-950 text-white py-24 px-6">

      <h2 className="text-5xl font-bold text-center mb-16">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300 shadow-lg"
          >
            <div className="mb-6">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-bold mb-4">
              {feature.title}
            </h3>

            <p className="text-slate-300 leading-7">
              {feature.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;