"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronDown } from 'lucide-react';

const Learner = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const decodedTitle = decodeURIComponent(params.title)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/learn/${params.title}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.title]);

  const renderContent = (content) => {
    if (!content) return null;

    // Split content into sections based on numbered headers
    const sections = content.split(/(?=\d+\.\s+[A-Z])/);

    return sections.map((section, index) => {
      if (!section.trim()) return null;

      // Extract section title and content
      const [title, ...contentParts] = section.split('\n');
      const sectionContent = contentParts.join('\n');

      // Process subsections
      const subsections = sectionContent.split(/(?=(?:Key Benefits|When|Validity Period|Required|Processing Timeline|List of|Format Specifications|Special Requirements|Industry Standards|Quality Checks|Professional Tips|Frequent Mistakes|How to Avoid|Solution Strategies|Regulatory Requirements|Important Regulations|Compliance Checklist|Fee Structure|Additional Charges|Payment Methods|Time-Saving Strategies|Efficiency Improvements|Professional Recommendations):)/);

      return (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {title.trim()}
          </h2>
          
          {subsections.map((subsection, subIndex) => {
            if (!subsection.trim()) return null;

            const [subTitle, ...subContent] = subsection.split('\n');
            const content = subContent.join('\n');

            return (
              <div key={subIndex} className="ml-4 mb-4">
                {subTitle.includes(':') ? (
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {subTitle.trim()}
                  </h3>
                ) : null}
                
                <div className="prose dark:prose-invert max-w-none">
                  {content.split('\n').map((paragraph, pIndex) => {
                    if (!paragraph.trim()) return null;

                    // Handle special formatting
                    if (paragraph.includes('✓')) {
                      return (
                        <div key={pIndex} className="flex items-start space-x-2 text-green-600 dark:text-green-400 my-1">
                          <span className="mt-1">✓</span>
                          <span>{paragraph.replace('✓', '').trim()}</span>
                        </div>
                      );
                    }
                    
                    if (paragraph.includes('⚠️')) {
                      return (
                        <div key={pIndex} className="flex items-start space-x-2 text-yellow-600 dark:text-yellow-400 my-1">
                          <span className="mt-1">⚠️</span>
                          <span>{paragraph.replace('⚠️', '').trim()}</span>
                        </div>
                      );
                    }
                    
                    if (paragraph.includes('💡')) {
                      return (
                        <div key={pIndex} className="flex items-start space-x-2 text-purple-600 dark:text-purple-400 my-1">
                          <span className="mt-1">💡</span>
                          <span>{paragraph.replace('💡', '').trim()}</span>
                        </div>
                      );
                    }

                    return (
                      <p key={pIndex} className="my-2 text-gray-700 dark:text-gray-300">
                        {paragraph.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  const renderValue = (value, path = '') => {
    if (value === null) return <span className="text-gray-400">null</span>;
    if (typeof value === 'boolean') return <span className="text-purple-500">{value.toString()}</span>;
    if (typeof value === 'number') return <span className="text-blue-500">{value}</span>;
    if (typeof value === 'string') return <span className="text-green-500">"{value}"</span>;
    
    if (Array.isArray(value)) {
      const isExpanded = expandedSections[path];
      return (
        <div className="ml-4">
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1"
            onClick={() => toggleSection(path)}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="text-gray-500">Array [{value.length}]</span>
          </div>
          {isExpanded && (
            <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-600 pl-2">
              {value.map((item, index) => (
                <div key={index} className="my-1">
                  {renderValue(item, `${path}.${index}`)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (typeof value === 'object') {
      const isExpanded = expandedSections[path];
      return (
        <div className="ml-4">
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1"
            onClick={() => toggleSection(path)}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="text-gray-500">Object</span>
          </div>
          {isExpanded && (
            <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-600 pl-2">
              {Object.entries(value).map(([key, val]) => (
                <div key={key} className="my-1">
                  <span className="text-yellow-500">{key}</span>: {renderValue(val, `${path}.${key}`)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card> 
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {decodedTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm">
              {data && renderContent(data)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Learner;