"use client";

import React, { memo, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
  Brain,
  ShieldCheck,
  Workflow,
  GitBranch,
  Cloud,
  LineChart,
  Globe
} from 'lucide-react';

const SOLUTIONS = [
  {
    icon: Brain,
    title: 'AI Development',
    description: 'Build intelligent applications with our cutting-edge AI and machine learning solutions.',
    link: '#ai-development'
  },
  {
    icon: ShieldCheck,
    title: 'Security Solutions',
    description: 'Protect your applications with enterprise-grade security implementations.',
    link: '#security'
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Streamline your business processes with intelligent automation tools.',
    link: '#automation'
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Manage your code and assets with advanced version control systems.',
    link: '#version-control'
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Seamlessly integrate and deploy your applications in the cloud.',
    link: '#cloud'
  },
  {
    icon: LineChart,
    title: 'Analytics Platform',
    description: 'Gain insights from your data with powerful analytics tools.',
    link: '#analytics'
  },
  {
    icon: Globe,
    title: 'Global Infrastructure',
    description: 'Deploy your applications globally with our distributed infrastructure.',
    link: '#infrastructure'
  }
];

const Feature = memo(({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ComponentType;
  index: number;
}) => {
  const borderClasses = useMemo(() => cn(
    "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
    (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
    index < 4 && "lg:border-b dark:border-neutral-800"
  ), [index]);

  return (
    <div className={borderClasses}>
      {index < 4 ? (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      ) : (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        <Icon className="w-6 h-6" />
      </div>
      
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
});

Feature.displayName = 'Feature';

export function SolutionsGrid() {
  const { theme } = useTheme();

  const headerClasses = useMemo(() => cn(
    "text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium",
    theme === "dark" ? "text-white" : "text-blue-900"
  ), [theme]);

  return (
    <div className="py-14">
      <h2 className={headerClasses}>
        Solutions that power innovation
      </h2>
      
      <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
        Empower your business with our comprehensive suite of tools and services designed for the modern digital landscape.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
        {SOLUTIONS.map((solution, index) => (
          <Feature 
            key={solution.title}
            {...solution}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default SolutionsGrid;