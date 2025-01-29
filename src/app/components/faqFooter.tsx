"use client";
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Ship,
} from 'lucide-react';

// FAQ Component
export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  const faqs = [
    {
      question: "How does the export compliance screening work?",
      answer: "Our export compliance screening utilizes advanced algorithms to check against multiple global trade databases and sanctions lists. The process is automated and provides real-time results while maintaining accuracy and compliance with international regulations."
    },
    {
      question: "What documentation is required for international shipping?",
      answer: "Required documentation typically includes: Commercial Invoice, Bill of Lading/Airway Bill, Certificate of Origin, Packing List, and Export Declaration. Specific requirements may vary based on destination country and type of goods."
    },
    {
      question: "How long does the compliance check process take?",
      answer: "Most compliance checks are completed within minutes through our automated system. Complex cases requiring manual review are typically resolved within 24-48 hours, ensuring thorough verification while maintaining efficiency."
    },
    {
      question: "Which countries are covered by your compliance screening?",
      answer: "Our compliance screening covers over 180 countries and territories worldwide, including all major trading nations. We regularly update our database to reflect the latest international trade regulations and sanctions lists."
    },
    {
      question: "How do you handle restricted goods and dual-use items?",
      answer: "We provide specialized screening and documentation for restricted goods and dual-use items, ensuring compliance with EAR, ITAR, and other international trade regulations. Our experts guide you through the necessary permits and licenses."
    }
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4">
      <h2 className={cn(
        "text-3xl font-bold text-center mb-12",
        theme === "dark" ? "text-white" : "text-blue-900"
      )}>
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn(
              "border rounded-lg overflow-hidden",
              theme === "dark" ? "border-neutral-800" : "border-neutral-200"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={cn(
                "w-full px-6 py-4 text-left flex justify-between items-center",
                theme === "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-50"
              )}
            >
              <span className="font-medium text-lg">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 transition-transform",
                  openIndex === index ? "transform rotate-180" : ""
                )}
              />
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-4 text-neutral-600 dark:text-neutral-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Footer Component
export const Footer = () => {
  const { theme } = useTheme();
  
  const navigation = {
    solutions: [
      { name: 'Export Compliance', href: '#' },
      { name: 'Trade Documentation', href: '#' },
      { name: 'Risk Management', href: '#' },
      { name: 'Global Shipping', href: '#' },
    ],
    support: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'API Status', href: '#' },
      { name: 'Support Center', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'License', href: '#' },
    ],
  };

  return (
    <footer className={cn(
      "border-t",
      theme === "dark" ? "border-neutral-800 bg-neutral-900" : "border-neutral-200 bg-white"
    )}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Ship className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">ExportPro</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-sm">
              Simplifying global trade compliance and logistics for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-600 hover:text-blue-500 dark:text-neutral-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-600 hover:text-blue-500 dark:text-neutral-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-600 hover:text-blue-500 dark:text-neutral-400">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-neutral-600 hover:text-blue-500 dark:text-neutral-400">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-neutral-600 hover:text-blue-500 dark:text-neutral-400">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-neutral-600 hover:text-blue-500 dark:text-neutral-400">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              © 2025 ExportPro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {navigation.legal.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-600 hover:text-blue-500 dark:text-neutral-400"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default {
  FAQ,
  Footer,
};