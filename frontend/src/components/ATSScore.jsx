import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ATSScore({ score }) {
  const atsScore = score || 0;

  let color = "#ef4444";
  let message = "Needs Improvement";

  if (atsScore >= 80) {
    color = "#22c55e";
    message = "Excellent ATS Score";
  } else if (atsScore >= 60) {
    color = "#facc15";
    message = "Good ATS Score";
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-center">

      <h2 className="text-3xl font-bold text-cyan-400 mb-8">
        🎯 ATS Score
      </h2>

      <div className="w-56 h-56 mx-auto">

        <CircularProgressbar
          value={atsScore}
          text={`${atsScore}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#ffffff",
            trailColor: "#334155",
            textSize: "16px"
          })}
        />

      </div>

      <h3
        className="text-xl font-bold mt-6"
        style={{ color }}
      >
        {message}
      </h3>

    </div>
  );
}

export default ATSScore;