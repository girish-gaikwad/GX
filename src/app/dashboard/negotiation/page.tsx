'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { useTheme } from 'next-themes';
import Chatbot from './chatbot';
import Markdown from 'react-markdown';

const Negotiation = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    currentOffer: '',
    targetPrice: '',
    role: 'buyer',
    context: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.currentOffer || !formData.targetPrice) {
      setError('Current offer and target price are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/negotiation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data.suggestion);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-20'>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 md:mb-8 text-center">
          Negotiation Strategy Advisor
        </h1>

        <form onSubmit={handleSubmit} className="mb-6 md:mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              value={formData.currentOffer}
              onChange={(e) => setFormData({ ...formData, currentOffer: e.target.value })}
              placeholder="Current Offer Amount ($)"
              className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                       focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                       dark:focus:ring-blue-800 w-full transition-colors duration-200"
              required
            />
            <input
              type="number"
              value={formData.targetPrice}
              onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
              placeholder="Target Price/Budget ($)"
              className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                       focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                       dark:focus:ring-blue-800 w-full transition-colors duration-200"
              required
            />
          </div>

          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 
                     focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors duration-200"
          >
            <option value="buyer">I am a Buyer</option>
            <option value="seller">I am a Seller</option>
          </select>

          <textarea
            value={formData.context}
            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
            placeholder="Describe the negotiation context..."
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                     focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
                     dark:focus:ring-blue-800 h-32 resize-y transition-colors duration-200"
          />

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 
                         text-red-700 dark:text-red-400 px-4 py-3 rounded-lg transition-colors duration-200" 
                 role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold 
                     hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 
                     dark:focus:ring-blue-800 transition-all duration-200 flex items-center justify-center 
                     gap-2 disabled:opacity-50"
          >
            <DollarSign className="w-5 h-5" />
            Get Negotiation Strategy
          </button>
        </form>

        {loading && (
          <div className="flex justify-center py-8 md:py-12">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-4 
                         border-gray-200 dark:border-gray-700 border-t-blue-600 
                         dark:border-t-blue-400 transition-colors duration-200">
            </div>
          </div>
        )}

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 mt-6 
                       border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-gray-900 dark:text-gray-100 text-xl sm:text-2xl font-bold mb-4 md:mb-6 
                          border-b border-gray-200 dark:border-gray-700 pb-4 transition-colors duration-200">
                Suggested Strategy
              </h2>
              <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed 
                        whitespace-pre-line transition-colors duration-200">
                {result}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Negotiation;