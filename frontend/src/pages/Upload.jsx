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

import toast from "react-hot-toast";


function UploadPage() {

  // =========================================================
  // STATE
  // =========================================================

  const [files, setFiles] = useState([]);

  const [jdFile, setJdFile] = useState(null);

  const [result, setResult] = useState(null);

  // Candidate currently being viewed
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Candidates selected for comparison
  const [candidate1, setCandidate1] = useState(null);

  const [candidate2, setCandidate2] = useState(null);

  const [loading, setLoading] = useState(false);


  // =========================================================
  // UPLOAD + ANALYZE RESUME
  // =========================================================

  const handleUpload = async () => {

    try {

      setLoading(true);

      const response = await uploadResume(files, jdFile);

      console.log("UPLOAD RESPONSE:", response);

      setResult(response);


      // Automatically select the first candidate
      if (
        response.candidates &&
        response.candidates.length > 0
      ) {

        setSelectedCandidate(response.candidates[0]);

      }

    } catch (error) {

      console.error("UPLOAD ERROR:", error);

      toast.error(
        "Something went wrong while analyzing the resume."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // COMPARE CANDIDATES
  // =========================================================

  const handleCompare = (candidate) => {


    console.log("COMPARE CLICKED:", candidate.name);


    // First candidate
    if (!candidate1) {

      setCandidate1(candidate);

      return;

    }


    // Second candidate
    if (!candidate2) {

      // Don't allow the exact same candidate twice
      if (candidate.name === candidate1.name) {
        toast.error("Please select a different candidate.");
        return;
      }

      setCandidate2(candidate);

      return;

    }


    // If both are already selected,
    // start a new comparison
    setCandidate1(candidate);

    setCandidate2(null);

  };


  // =========================================================
  // CLOSE VIEW MODAL
  // =========================================================

  const handleCloseView = () => {

    setSelectedCandidate(null);

  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">

      <div className="max-w-5xl mx-auto">


        {/* =====================================================
            UPLOAD CARD
        ===================================================== */}

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
                onChange={(e) =>
                  setFiles(Array.from(e.target.files))
                }
                className="text-white"
              />


              {files.length > 0 && (
                <div className="mt-3">

                  <p className="text-green-400 font-bold">
                    ✅ {files.length} resume(s) selected
                  </p>

                  <div className="mt-2 space-y-1">

                    {files.map((file, index) => (
                      <p
                        key={`${file.name}-${index}`}
                        className="text-gray-300 text-sm"
                      >
                        📄 {index + 1}. {file.name}
                      </p>
                    ))}

                  </div>

                </div>
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
                onChange={(e) =>
                  setJdFile(e.target.files[0])
                }
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

              {loading
                ? "⏳ Analyzing Resume..."
                : "🚀 Analyze Resume"}

            </button>

          </div>

        </div>


        {/* =====================================================
            ANALYSIS RESULT
        ===================================================== */}

        {result &&
          result.candidates &&
          result.candidates.length > 0 && (

          <>


            {/* =================================================
                TOP CANDIDATE
            ================================================= */}

            <TopCandidate
              candidate={result.candidates[0]}
            />


            {/* =================================================
                EXPORT BUTTONS
            ================================================= */}

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  downloadCSV(result.candidates)
                }
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition duration-300"
              >

                📥 Export CSV

              </button>


              <button
                onClick={() =>
                  downloadExcel(result.candidates)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition duration-300"
              >

                📊 Export Excel

              </button>

            </div>


            {/* =================================================
                ANALYTICS DASHBOARD
            ================================================= */}

            <AnalyticsDashboard
              data={result}
            />


            {/* =================================================
                TOP + MISSING SKILLS
            ================================================= */}

            <div className="mt-8">

              <TopSkills
                skills={result.top_skills}
              />


              <MissingSkillsAnalytics
                skills={result.top_missing_skills}
              />

            </div>


            {/* =================================================
                CHARTS
            ================================================= */}

            <div className="grid lg:grid-cols-2 gap-8 mt-8">

              <ATSChart
                candidates={result.candidates}
              />


              <JDMatchPieChart
                candidates={result.candidates}
              />

            </div>


            {/* =================================================
                RECRUITER DASHBOARD
            ================================================= */}

            <RecruiterDashboard

              data={result}

              onSelectCandidate={(candidate) => {

                console.log(
                  "VIEW CLICKED FROM UPLOAD:",
                  candidate
                );

                setSelectedCandidate(candidate);

              }}

              onCompare={handleCompare}

              candidate1={candidate1}
              candidate2={candidate2}

            />

          </>

        )}


        {/* =====================================================
            COMPARE RESULT
        ===================================================== */}

        {candidate1 && candidate2 && (

          <CandidateComparison

            candidate1={candidate1}

            candidate2={candidate2}

          />

        )}


      </div>


      {/* =======================================================
          VIEW CANDIDATE MODAL
      ======================================================= */}

      {selectedCandidate && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">


          {/* Modal */}

          <div className="bg-slate-950 border border-cyan-500 rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl">


            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="sticky top-0 z-50 bg-slate-950 border-b border-slate-700 px-8 py-5 flex justify-between items-center">


              <div>

                <h2 className="text-3xl font-bold text-cyan-400">

                  👁 Candidate Details

                </h2>


                <p className="text-gray-400 mt-1">

                  Complete AI Resume Analysis

                </p>

              </div>


              <button
                onClick={handleCloseView}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-bold transition"
              >

                ✕ Close

              </button>

            </div>


            {/* =================================================
                COMPLETE RESUME RESULT
            ================================================= */}

            <div className="p-6">

              <ResumeResult
                data={selectedCandidate}
              />

            </div>


          </div>

        </div>

      )}

    </div>

  );

}


export default UploadPage;