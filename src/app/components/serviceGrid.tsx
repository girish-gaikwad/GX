import React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code, Laptop, BarChart, Rocket } from 'lucide-react';

export function BentoServicesGrid() {
  const { theme } = useTheme();

  const features = [
    {
      title: "Advanced Analytics",
      description: "Track and analyze your project metrics with our intuitive dashboard interface.",
      content: <AnalyticsSkeleton />,
      className: cn(
        "col-span-1 lg:col-span-4 border-b lg:border-r",
        theme === "dark" 
          ? "border-neutral-800 bg-neutral-900/50" 
          : "border-blue-100 bg-blue-50/50"
      ),
    },
    {
      title: "Smart Development",
      description: "Leverage our AI-powered development tools for faster deployment.",
      content: <DevelopmentSkeleton />,
      className: cn(
        "border-b col-span-1 lg:col-span-2",
        theme === "dark" 
          ? "border-neutral-800 bg-neutral-900/50" 
          : "border-blue-100 bg-blue-50/50"
      ),
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor your applications with live updates and instant alerts.",
      content: <MonitoringSkeleton />,
      className: cn(
        "col-span-1 lg:col-span-3 lg:border-r",
        theme === "dark" 
          ? "border-neutral-800 bg-neutral-900/50" 
          : "border-blue-100 bg-blue-50/50"
      ),
    },
    {
      title: "Rapid Deployment",
      description: "Deploy your applications instantly with our cloud infrastructure.",
      content: <DeploymentSkeleton />,
      className: cn(
        "col-span-1 lg:col-span-3 border-b lg:border-none",
        theme === "dark" 
          ? "border-neutral-800 bg-neutral-900/50" 
          : "border-blue-100 bg-blue-50/50"
      ),
    },
  ];
  
  return (
    <div className="relative z-20 py-10 mt-24 lg:py-20 max-w-7xl mx-auto">
      <div className="px-8">
        <h2 className={cn(
          "text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium",
          theme === "dark" ? "text-white" : "text-blue-900"
        )}>
          Transform Your Business with Our Services
        </h2>
        
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From development to deployment, we provide comprehensive solutions to help your business grow in the digital age.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-lg dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.content}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden group`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-xl md:text-2xl font-medium tracking-tight text-black dark:text-white">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-300 my-2">
      {children}
    </p>
  );
};

const AnalyticsSkeleton = () => {
  return (
    <div className="relative flex py-4 px-2 h-full">
      <div className="w-full p-3 mx-auto border shadow-lg group h-full rounded-lg overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <BarChart className="w-8 h-8 text-blue-500" />
            <div className="flex-1 space-y-2">
              <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded w-3/4"></div>
              <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded w-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-blue-100 dark:bg-blue-800/50 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DevelopmentSkeleton = () => {
  return (
    <div className="relative flex py-4 px-2 h-full">
      <div className="w-full p-4 border shadow-lg rounded-lg">
        <Code className="w-8 h-8 mb-4 text-blue-500" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-2 bg-blue-200 dark:bg-blue-700 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MonitoringSkeleton = () => {
  return (
    <div className="relative flex py-4 px-2 h-full">
      <div className="w-full p-4 border shadow-lg rounded-lg">
        <Laptop className="w-8 h-8 mb-4 text-blue-500" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-blue-100 dark:bg-blue-800/50 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DeploymentSkeleton = () => {
  return (
    <div className="relative flex py-4 px-2 h-full">
      <div className="w-full p-4 border shadow-lg rounded-lg">
        <Rocket className="w-8 h-8 mb-4 text-blue-500" />
        <div className="flex flex-col gap-3">
          <div className="h-3 bg-blue-200 dark:bg-blue-700 rounded w-3/4"></div>
          <div className="h-3 bg-blue-200 dark:bg-blue-700 rounded w-1/2"></div>
          <div className="h-16 bg-blue-100 dark:bg-blue-800/50 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default BentoServicesGrid;