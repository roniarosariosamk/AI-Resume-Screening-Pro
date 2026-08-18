import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className="w-full px-10 py-6 flex items-center justify-between transition-colors duration-300"
      style={{
        backgroundColor: "var(--theme-bg)",
        color: "var(--theme-text)",
      }}
    >

      {/* Logo */}
      <h1 className="text-2xl font-bold text-cyan-400">
        AI Resume Screening Pro
      </h1>

      {/* Navigation + Theme */}
      <div className="flex items-center gap-8">

        <div 
          className="flex gap-8"
          style={{ 
            color: "var(--theme-text-secondary)"
          }}
        >
          <a
            href="#"
            className="hover:text-cyan-400 transition"
          >
            Home
          </a>

          <a
            href="#"
            className="hover:text-cyan-400 transition"
          >
            Features
          </a>

          <a
            href="#"
            className="hover:text-cyan-400 transition"
          >
            How it Works
          </a>

          <button
            onClick={() => window.location.href = "/dashboard"}
            className="px-5 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition"
          >
            Get Started
          </button>

        </div>

        {/* Theme Selector */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">

          {/* Light */}
          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-2 rounded-md transition ${
              theme === "light"
                ? "bg-white text-black"
                : "text-gray-300 hover:bg-slate-700"
            }`}
            title="Light mode"
          >
            ☀️
          </button>

          {/* Dark */}
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-2 rounded-md transition ${
              theme === "dark"
                ? "bg-slate-600 text-white"
                : "text-gray-300 hover:bg-slate-700"
            }`}
            title="Dark mode"
          >
            🌙
          </button>

          {/* System */}
          <button
            onClick={() => setTheme("system")}
            className={`px-3 py-2 rounded-md transition ${
              theme === "system"
                ? "bg-cyan-500 text-white"
                : "text-gray-300 hover:bg-slate-700"
            }`}
            title="System theme"
          >
            🌓
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;