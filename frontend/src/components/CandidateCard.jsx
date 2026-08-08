import { User, Mail, Briefcase } from "lucide-react";

function CandidateCard() {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-800">

      <div className="flex items-center gap-5">

        <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center">

          <User size={40} className="text-black" />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">
            John Smith
          </h2>

          <div className="flex items-center gap-2 mt-2 text-slate-400">
            <Mail size={18} />
            johnsmith@gmail.com
          </div>

          <div className="flex items-center gap-2 mt-2 text-slate-400">
            <Briefcase size={18} />
            Full Stack Developer
          </div>

        </div>

      </div>

    </div>
  );
}

export default CandidateCard;