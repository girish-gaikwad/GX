"use client";
import React, { useState } from 'react';
import { Search, HelpCircle, Info, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const IncentiveFinder = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/Incentives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      setResult(data.response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className={`backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl mb-8 ${
          isDark ? 'bg-gray-900/50' : 'bg-white'
        }`}>
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">
              Export Incentives Finder
            </h1>
            <p className="text-base sm:text-lg">
              Discover optimal government schemes and incentives for your export business
            </p>
          </div>

          <div className={`rounded-xl p-4 sm:p-6 mb-6 md:mb-8 ${
            isDark 
              ? 'bg-orange-500/20 border border-orange-500/30' 
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mt-1 flex-shrink-0" />
              <p className="text-sm sm:text-base">
                Our AI-powered tool analyzes various government export schemes and matches them with your products and business needs. Get personalized recommendations and answers to your questions about export incentives.
              </p>
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <p className="mb-3 text-base sm:text-lg">You can:</p>
            <ul className="list-none space-y-2">
              {[
                'Search for specific product-related incentives',
                'Ask about eligibility criteria and documentation',
                'Learn about application processes and deadlines',
                'Get clarification on scheme benefits and requirements'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="E.g., 'What incentives are available for textile exports?'"
                className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-xl ${
                  isDark 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-50 border border-gray-200'
                } placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Search className="w-5 h-5" />
                <span className="whitespace-nowrap">Find Incentives</span>
              </button>
            </div>
          </form>

          {loading && (
            <div className="flex justify-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-4 border-b-4 border-orange-500"></div>
            </div>
          )}

          {result && (
            <div className={`rounded-xl p-4 sm:p-6 md:p-8 ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-4 sm:mb-6">Results</h2>
              <ReactMarkdown
                className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}
                components={{
                  h2: ({node, ...props}) => (
                    <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mt-6 mb-3 sm:mt-8 sm:mb-4" {...props} />
                  ),
                  h3: ({node, ...props}) => (
                    <h3 className="text-lg sm:text-xl font-semibold text-orange-400 mt-4 mb-2 sm:mt-6 sm:mb-3" {...props} />
                  ),
                  p: ({node, ...props}) => (
                    <p className="mb-3 sm:mb-4 leading-relaxed text-base sm:text-lg" {...props} />
                  ),
                  ul: ({node, ...props}) => (
                    <ul className="space-y-2 sm:space-y-3 my-3 sm:my-4" {...props} />
                  ),
                  li: ({node, ...props}) => (
                    <li className="flex items-start gap-3 text-sm sm:text-base" {...props}>
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                      <span>{props.children}</span>
                    </li>
                  ),
                  strong: ({node, ...props}) => (
                    <strong className="font-bold text-orange-500" {...props} />
                  )
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          )}

          <div className={`mt-6 md:mt-8 rounded-xl p-4 sm:p-6 ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <HelpCircle className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-bold text-orange-500">Need Help?</h2>
            </div>
            <p className="text-sm sm:text-base">
              Try asking about specific schemes like MEIS, RODTEP, or RoSCTL, or ask about incentives for your industry sector. You can also inquire about documentation requirements, application procedures, or eligibility criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncentiveFinder;