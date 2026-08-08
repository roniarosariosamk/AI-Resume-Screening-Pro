function AnalyticsCard({ title, value, icon, color }) {
  return (
    <div
      className={`
        rounded-2xl
        p-6 
        shadow-2xl
        text-white
        transform
        hover:scale-105
        hover:shadow-cyan-500/30
        transition-all
        duration-300
        ${color}
      `}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-white/80 text-sm font-semibold">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-white">
            {value}
          </h2>

        </div>

        <div className="text-5xl animate-pulse">
          {icon}
        </div>

      </div>
    </div>
  );
}

export default AnalyticsCard;