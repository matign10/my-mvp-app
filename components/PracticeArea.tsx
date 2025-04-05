'use client';

import { useState } from 'react';

interface PracticeAreaProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  expandedContent: {
    description: string;
    services: string[];
  };
}

export default function PracticeArea({ title, description, icon, expandedContent }: PracticeAreaProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`p-6 border border-[#b2bec3] hover:border-[#2d3436] transition-all duration-300 cursor-pointer ${
        isExpanded ? 'bg-white shadow-lg' : 'bg-white'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="mb-4 transform group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <button 
          className="text-[#2d3436] hover:text-[#636e72] transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <svg 
            className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <h3 className="text-xl font-bold text-[#2d3436] mb-2 tracking-tight">{title}</h3>
      <p className="text-[#636e72]">{description}</p>

      {isExpanded && (
        <div className="mt-6 space-y-4 animate-fadeIn">
          <p className="text-[#636e72]">{expandedContent.description}</p>
          <div>
            <h4 className="font-semibold text-[#2d3436] mb-2">Servicios Incluidos:</h4>
            <ul className="list-disc list-inside text-[#636e72] space-y-1">
              {expandedContent.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 