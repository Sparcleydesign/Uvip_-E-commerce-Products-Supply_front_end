'use client';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  className = '' 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 transform cursor-pointer';
  
  const variants = {
    primary: 'bg-sage hover:bg-sage-dark text-white rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-sage text-sage-dark hover:bg-sage hover:text-white rounded-full',
    ghost: 'text-sage-dark underline-offset-4 hover:underline font-medium'
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-sm',
    lg: 'px-12 py-4 text-base'
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.md;

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${selectedVariant} ${selectedSize} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
