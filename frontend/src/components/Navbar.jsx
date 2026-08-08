function Navbar() {
  return (
    <nav className="w-full px-10 py-6 flex items-center justify-between bg-slate-950 text-white">

      <h1 className="text-2xl font-bold text-cyan-400">
        AI Resume Screening Pro
      </h1>


      <div className="flex gap-8 text-gray-300">

        <a href="#" className="hover:text-cyan-400">
          Home
        </a>

        <a href="#" className="hover:text-cyan-400">
          Features
        </a>

        <a href="#" className="hover:text-cyan-400">
          How it Works
        </a>

        <button className="px-5 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400">
          Get Started
        </button>

      </div>

    </nav>
  );
}

export default Navbar;