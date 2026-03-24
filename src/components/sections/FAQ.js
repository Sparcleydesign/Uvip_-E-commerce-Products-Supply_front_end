'use client';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { faqData } from '@/data/content';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 relative overflow-hidden scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-dark mb-3">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
            Got Questions? We've Got Answers.
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`glass rounded-[1.5rem] overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-l-4 border-sage shadow-md translate-x-1' : 'border-l-4 border-transparent'
                }`}
              >
                <div 
                  className="flex justify-between items-center p-6 cursor-pointer select-none group"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className={`font-semibold text-base transition-colors duration-300 ${isOpen ? 'text-sage-dark' : 'text-gray-800'}`}>
                    {item.q}
                  </h3>
                  <FiChevronDown 
                    className={`w-5 h-5 text-sage-dark transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed font-light border-t border-white/20 pt-4">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
