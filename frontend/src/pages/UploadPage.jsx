import { useState } from "react";
import { uploadResume } from "../services/resumeService";
import ResumeResult from "../components/ResumeResult";
import RecruiterDashboard from "../components/RecruiterDashboard";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import ATSChart from "../components/ATSChart";
import JDMatchPieChart from "../components/JDMatchPieChart";
import TopCandidate from "../components/TopCandidate";
import CandidateComparison from "../components/CandidateComparison";
import TopSkills from "../components/TopSkills";
import MissingSkillsAnalytics from "../components/MissingSkillsAnalytics";
import { downloadCSV } from "../services/csvService";
import { downloadExcel } from "../services/excelService";
import UploadPage from "./pages/UploadPage";
import toast from "react-hot-toast";

function UploadPage() {
  const [files, setFiles] = useState([]);
  const [jdFile, setJdFile] = useState(null);

  const [result, setResult] = useState(null);

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [candidate1, setCandidate1] = useState(null);
  const [candidate2, setCandidate2] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setLoading(true);

      const response = await uploadResume(files, jdFile);

      console.log(response);

      setResult(response);

      if (response.candidates && response.candidates.length > 0) {
        setSelectedCandidate(response.candidates[0]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

    const handleCompare = (candidate) => {

      if (!candidate1) {
        setCandidate1(candidate);
        return;
      }

      if (!candidate2) {
        setCandidate2(candidate);
        return;
      }

      setCandidate1(candidate);
      setCandidate2(null);

    };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">

      <div className="max-w-5xl mx-auto">

        {/* Upload Card */}

        <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 p-10 rounded-2xl shadow-xl">

          <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
            🤖 AI Resume Screening
          </h1>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Resume Upload */}

            <div className="bg-slate-800 rounded-xl p-6">

              <h3 className="text-cyan-300 font-bold text-lg mb-4">
                📄 Upload Resume
              </h3>

              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="text-white"
              />

              {files.length > 0 && (
                <p className="text-green-400 mt-2">
                  ✅ {files.length} resume(s) selected
                </p>
              )}

            </div>

            {/* Job Description Upload */}

            <div className="bg-slate-800 rounded-xl p-6">

              <h3 className="text-cyan-300 font-bold text-lg mb-4">
                📋 Upload Job Description
              </h3>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setJdFile(e.target.files[0])}
                className="text-white"
              />

              {jdFile && (
                <p className="text-green-400 mt-3 text-sm break-all">
                  ✅ {jdFile.name}
                </p>
              )}

            </div>

          </div>

          {/* Analyze Button */}

          <div className="mt-8">

            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "⏳ Analyzing Resume..." : "🚀 Analyze Resume"}
            </button>

          </div>

        </div>

        {/* Analysis Result */}

        {result && result.candidates && (
        
        <>

          <TopCandidate candidate={result.candidates[0]} />

          <div className="flex justify-end mt-6">

            <button
              onClick={() => downloadCSV(result.candidates)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition duration-300"
            >
              📥 Export CSV
            </button>

             <button
                onClick={() => downloadExcel(result.candidates)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition duration-300"
              >
                📊 Export Excel
              </button>

          </div>

          <AnalyticsDashboard data={result} />

          <div className= "mt-8">
             
            <TopSkills 
              skills={result.top_skills} 
            />

            <MissingSkillsAnalytics
              skills={result.top_missing_skills}
           />

          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">

            
            <ATSChart candidates={result.candidates} />

            <JDMatchPieChart candidates={result.candidates} />

          </div>
  
          <RecruiterDashboard
            data={result}
            onSelectCandidate={setSelectedCandidate}
            oncompare={handleCompare}
          />
        </>

        )}

        {selectedCandidate && (

          <div className="mt-10">

              <ResumeResult
                  data={selectedCandidate}
              />

          </div>
          
        )}

        {candidate1 && candidate2 && (

          <CandidateComparison
            candidate1={candidate1}
            candidate2={candidate2}

            
        />

       )}

      </div>

    </div>
  );
}

export default UploadPage;