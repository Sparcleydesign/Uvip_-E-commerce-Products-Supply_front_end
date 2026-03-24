'use client';

const Toggle = ({ on = false, onToggle }) => {
  return (
    <div 
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${on ? 'bg-sage' : 'bg-gray-200'}`}
    >
      <div 
        className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all duration-300 ${on ? 'left-5' : 'left-0.5'}`}
      />
    </div>
  );
};

export default Toggle;
