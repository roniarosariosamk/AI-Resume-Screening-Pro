import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero-section relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white px-6 overflow-hidden">

       <div className="absolute inset-0 overflow-hidden -z-10">

  <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-[140px] opacity-20 animate-pulse"></div>

  <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-20 animate-pulse"></div>

</div>

      <div className="text-center max-w-5xl animate-fade-in">

        <h1 className="text-7xl md:text-8xl font-extrabold leading-tight tracking-tight">
          Screen Resumes
          <br />
          <span className="text-cyan-400 drop-shadow-[0_0_25px_#22d3ee]">
            Smarter With AI
          </span>
        </h1>

        <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold mb-6">
          AI Powered Recruitment Platform
        </p>


        <p className="mt-8 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">

            AI Resume Screening Pro helps recruiters upload,
            analyze, rank and shortlist candidates in seconds
            using powerful Artificial Intelligence.

        </p>


        <div className="mt-14 flex justify-center gap-5">

          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 bg-cyan-500 rounded-xl font-bold text-black hover:bg-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-500/40 hover:scale-105"
          >
            🚀 Get Started
          </button>


          <button
            onClick={() =>
              document.getElementById("features")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="px-8 py-4 border border-cyan-400 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105"
          >
            ▶ Watch Demo
          </button>

        </div>


      </div>

    </section>
  );
}

export default Hero;