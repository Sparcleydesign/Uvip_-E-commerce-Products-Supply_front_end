'use client';
import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-sage text-white shadow-2xl transition-all duration-300 hover:bg-sage-dark hover:-translate-y-2 focus:outline-none animate-bounce-subtle"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="w-6 h-6" strokeWidth={2.5} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
