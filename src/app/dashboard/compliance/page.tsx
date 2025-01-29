'use client';

import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, BarChart2, Shield, FileSearch } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import { useTheme } from 'next-themes';

const DocumentAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, DOC, DOCX, or TXT file');
        return;
      }

      setFile(selectedFile);
      setError(null);
      setAnalysis(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/compliance', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Raw response:', responseText);
        throw new Error('Invalid server response');
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze document');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the document');
      console.error('Error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute h-64 w-64 rounded-full"
            style={{
              background: isDark 
                ? `radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)`
                : `radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 2 + 1})`,
              animation: `float ${Math.random() * 10 + 20}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-1">
            <Shield className={`w-12 h-12 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Document Risk Analyzer
            </h1>
          </div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Advanced AI-powered document analysis for identifying potential risks and compliance issues
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className={`overflow-hidden p-6 backdrop-blur-md shadow-lg rounded-xl border
              ${isDark 
                ? "bg-gray-800/50 border-gray-700" 
                : "bg-white/50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <FileSearch className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={24} />
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Document Upload
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative cursor-pointer group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`border-2 border-dashed rounded-xl p-7 text-center transition-all duration-300
                    ${isDark 
                      ? 'border-gray-600 group-hover:border-indigo-400 group-hover:bg-gray-800/30'
                      : 'border-gray-300 group-hover:border-indigo-600 group-hover:bg-gray-50'}`}
                  >
                    <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300
                      ${isDark 
                        ? 'text-gray-400 group-hover:text-indigo-400'
                        : 'text-gray-500 group-hover:text-indigo-600'}`}
                    />
                    <p className={`text-lg mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      Drag and drop your document here
                    </p>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Supported: PDF, DOC, DOCX, TXT (Max: 10MB)
                    </p>
                    {file && (
                      <div className={`mt-4 text-sm font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                        Selected: {file.name}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!file || isAnalyzing}
                  className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 
                    ${!file || isAnalyzing 
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-1'} 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing Document...</span>
                    </div>
                  ) : (
                    'Begin Analysis'
                  )}
                </button>
              </form>

              {error && (
                <div className={`mt-6 p-4 rounded-xl flex items-center gap-3
                  ${isDark 
                    ? 'bg-red-900/20 border-l-4 border-red-500 text-red-300'
                    : 'bg-red-50 border-l-4 border-red-500 text-red-700'}`}
                >
                  <AlertCircle className={isDark ? 'text-red-400' : 'text-red-500'} size={20} />
                  <p>{error}</p>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`backdrop-blur-sm rounded-xl border p-4
                ${isDark 
                  ? 'bg-gray-800/40 border-gray-700/50'
                  : 'bg-white/40 border-gray-200/50'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <BarChart2 className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={20} />
                  <h3 className={isDark ? 'text-gray-200' : 'text-gray-700'}>Processing Speed</h3>
                </div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>2.5s</p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Average analysis time</p>
              </div>
              <div className={`backdrop-blur-sm rounded-xl border p-4
                ${isDark 
                  ? 'bg-gray-800/40 border-gray-700/50'
                  : 'bg-white/40 border-gray-200/50'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={20} />
                  <h3 className={isDark ? 'text-gray-200' : 'text-gray-700'}>Accuracy Rate</h3>
                </div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>99.9%</p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Detection accuracy</p>
              </div>
            </div>
          </div>

          {/* Analysis Results Section */}
          <div className={`backdrop-blur-sm rounded-2xl shadow-xl border p-6
            ${isDark 
              ? 'bg-gray-800/40 border-gray-700/50'
              : 'bg-white/40 border-gray-200/50'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={24} />
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Analysis Results
              </h2>
            </div>
            
            {analysis ? (
              <div className={`rounded-xl p-6 max-h-[600px] overflow-y-auto
                ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}
              >
                <div className={isDark ? 'prose-invert' : 'prose'}>
                  <Markdown
                    options={{
                      overrides: {
                        h1: { 
                          component: props => <h1 {...props} className={`text-2xl font-bold mb-4 ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                          }`} />
                        },
                        h2: { 
                          component: props => <h2 {...props} className={`text-xl font-bold mb-3 ${
                            isDark ? 'text-indigo-300' : 'text-indigo-500'
                          }`} />
                        },
                        h3: { 
                          component: props => <h3 {...props} className={`text-lg font-bold mb-2 ${
                            isDark ? 'text-indigo-200' : 'text-indigo-400'
                          }`} />
                        },
                        p: { 
                          component: props => <p {...props} className={
                            isDark ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4'
                          } />
                        },
                        ul: { 
                          component: props => <ul {...props} className="space-y-2 mb-4" />
                        },
                        li: { 
                          component: props => <li {...props} className={`flex gap-2 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            <span className={isDark ? 'text-indigo-400' : 'text-indigo-600'}>•</span>
                            {props.children}
                          </li>
                        },
                      }
                    }}
                  >
                    {analysis}
                  </Markdown>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <FileText className={isDark ? 'text-gray-600' : 'text-gray-400'} size={64} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  Upload a document to see the analysis results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;