'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
      className={`p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
        isExpanded
          ? 'bg-white shadow-xl border-amber-500 -translate-y-1'
          : 'bg-white shadow-md border-gray-100 hover:border-amber-300 hover:shadow-lg hover:-translate-y-1'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`p-3 rounded-xl transition-all duration-300 ${
          isExpanded ? 'bg-amber-100' : 'bg-gray-50 group-hover:bg-amber-50'
        }`}>
          {icon}
        </div>
        <button
          className={`p-2 rounded-full transition-all duration-300 ${
            isExpanded
              ? 'bg-amber-100 text-amber-600'
              : 'bg-gray-100 text-gray-400 hover:bg-amber-50 hover:text-amber-500'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <ChevronDown
            className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <h3 className="text-xl font-bold text-[#2d3436] mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>

      <div className={`overflow-hidden transition-all duration-500 ${
        isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
      }`}>
        <div className="pt-6 border-t border-amber-200 space-y-4">
          <p className="text-gray-600 leading-relaxed">{expandedContent.description}</p>
          <div>
            <h4 className="font-semibold text-[#2d3436] mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-amber-500 rounded-full" />
              Servicios Incluidos
            </h4>
            <ul className="space-y-2">
              {expandedContent.services.map((service, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
