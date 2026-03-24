'use client';

const Badge = ({ variant = "green", children }) => {
  const styles = {
    green: "bg-green-50 text-green-600 border border-green-100",
    yellow: "bg-amber-50 text-amber-600 border border-amber-100",
    red: "bg-red-50 text-red-500 border border-red-100",
    blue: "bg-blue-50 text-blue-500 border border-blue-100",
    purple: "bg-purple-50 text-purple-500 border border-purple-100",
    sage: "bg-sage/15 text-sage-dark border border-sage/30"
  };

  return (
    <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold inline-flex items-center gap-1 ${styles[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
