import ATSScore from "./ATSScore";
import StrengthCard from "./StrengthCard";
import WeaknessCard from "./WeaknessCard";
import SuggestionCard from "./SuggestionCard";
import { downloadReport } from "../services/downloadReport";
import JDMatchCard from "./JDMatchCard";
import MatchedSkills from "./MatchedSkills";
import MissingSkills from "./MissingSkills";
import InterviewQuestions from "./InterviewQuestions";
import RecommendationCard from "./RecommendationCard";


function ResumeResult({ data }) {
  
  if (!data) return null;

  return (
    <div className="mt-10">

      <div className="mb-10">

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

          🤖 AI Resume Screening Dashboard

        </h1>

         <p className="text-gray-400 mt-4 text-lg">

            Intelligent Resume Analysis • ATS Evaluation • AI Recommendations

          </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}

        <div className="space-y-6">

          <ATSScore score={data.ats_score} />

          <JDMatchCard score={data.jd_match_score} />

            <RecommendationCard
              recommendation={data.hiring_recommendation}
              confidence={data.confidence}
              reason={data.recommendation_reason}
           />

        </div>

        {/* Right Column */}

        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8 shadow-xl space-y-6">

          <div className="flex flex-col items-center mb-8">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-5xl shadow-lg">

              👤

            </div>

             <h2 className="text-3xl font-bold mt-5 text-white">
              {data.name}
             </h2>

          </div>

          <div className="flex justify-center mb-8">

            <button
               onClick={() => downloadReport(data)}
               className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition duration-300"
            >
               📄 Download AI Report
            </button>
        
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-slate-800 rounded-2xl p-5 shadow-lg hover:shadow-cyan-500/20 transition duration-300">

              <h3 className="text-cyan-300 font-bold text-lg mb-2">
                📧 Email
              </h3>

              <p className="text-gray-300 break-all">
                {data.email}
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-5 shadow-lg hover:shadow-cyan-500/20 transition duration-300">


              <h3 className="text-cyan-300 font-bold text-lg mb-2">
                📱 Phone
              </h3>

              <p className="text-gray-300">
                {data.phone}
              </p>

            </div>

          </div>

          <div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-5"> 💻 Skills</h3>

            <div className="flex flex-wrap gap-2 mt-2">
              {data.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-110 hover:shadow-cyan-500/50 transition duration-300 cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

          <div className="border-t border-slate-700 pt-6">
            <h3 className="font-bold text-cyan-300 text-xl mb-3">
              🎓 Education
            </h3>
            <p className="text-gray-300">
               {data.education}
            </p>
          </div>

          {/* Experience */}

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">
              💼 Experience
            </h3>

            <div className="bg-slate-800 rounded-xl p-5 shadow-lg">
              <p className="text-gray-300 leading-8 whitespace-pre-line">
                {data.experience}
              </p>
            </div>
          </div>

          {/* Projects */}

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">
              📂 Projects
            </h3>

            <div className="bg-slate-800 rounded-xl p-5 shadow-lg">
              <p className="text-gray-300 leading-8 whitespace-pre-line">
                {data.projects}
              </p>
            </div>
          </div>

          {/* Summary */}

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">
              📝 Professional Summary
            </h3>

            <div className="bg-slate-800 rounded-xl p-5 shadow-lg">
              <p className="text-gray-300 leading-8">
                {data.summary}
              </p>
            </div>
          </div>


          <div className="grid lg:grid-cols-2 gap-6 mt-8">

              <MatchedSkills skills={data.matched_skills} />

              <MissingSkills skills={data.missing_skills} />

          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            <StrengthCard strengths={data.strengths} />

            <WeaknessCard weaknesses={data.weaknesses} />

          </div>

          <div className="mt-8">

            <SuggestionCard suggestions={data.suggestions} />

          </div>

          <div className="mt-10">
              <InterviewQuestions
                  questions={data.interview_questions}
              />
          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeResult;