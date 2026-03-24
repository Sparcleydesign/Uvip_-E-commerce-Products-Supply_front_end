'use client';

const StatCard = ({ num, label, change, color }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
      <div className={`text-3xl font-bold ${color}`}>
        {num}
      </div>
      <div className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mt-1">
        {label}
      </div>
      <div className="text-xs text-gray-400 mt-2">
        {change}
      </div>
    </div>
  );
};

export default StatCard;
