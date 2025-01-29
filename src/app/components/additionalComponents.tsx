"use client";

import React, { memo, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
    Scale,
    FileCheck,
    Building,
    Globe,
    Shield,
    Clock,
    AlertTriangle,
    FileSearch,
    Ship,
    Plane,
    Truck,
    ScrollText,
    ChartBar,
    Users,
    BadgeCheck,
    LucideIcon
} from 'lucide-react';
import { FAQ, Footer } from './faqFooter';

// Compliance Status Component
export const ComplianceStats = () => {
    const { theme } = useTheme();
    const stats = [
        { label: 'Screened Parties', value: '50,000+', icon: Users },
        { label: 'Countries Covered', value: '180+', icon: Globe },
        { label: 'Compliance Rate', value: '99.9%', icon: BadgeCheck },
        { label: 'Average Response', value: '< 2min', icon: Clock },
    ];

    return (
        <div className="py-12 bg-gradient-to-b from-transparent to-neutral-50 dark:to-neutral-900/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="flex items-center space-x-4 p-6 rounded-lg bg-white dark:bg-neutral-800 shadow-sm">
                            <Icon className="w-8 h-8 text-blue-500" />
                            <div>
                                <div className="text-2xl font-bold text-neutral-900 dark:text-white">{value}</div>
                                <div className="text-sm text-neutral-500 dark:text-neutral-400">{label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Compliance Process Steps
export const ComplianceProcess = () => {
    const steps = [
        { title: 'Initial Screening', description: 'Automated screening against global watchlists', icon: FileSearch },
        { title: 'Risk Assessment', description: 'Detailed analysis of potential matches', icon: AlertTriangle },
        { title: 'Documentation', description: 'Complete export documentation preparation', icon: ScrollText },
        { title: 'Verification', description: 'Final compliance check and approval', icon: BadgeCheck },
    ];

    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
                    Our Compliance Process
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.title} className="relative">
                            {index !== steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-blue-200 dark:bg-blue-800" />
                            )}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                                    <step.icon className="w-8 h-8 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{step.title}</h3>
                                <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Export Services Grid
export const ExportServices = () => {
    const services = [
        {
            icon: Scale,
            title: 'Trade Compliance',
            description: 'Ensure compliance with international trade regulations and sanctions.',
        },
        {
            icon: FileCheck,
            title: 'Export Documentation',
            description: 'Streamlined preparation and management of export documentation.',
        },
        {
            icon: Ship,
            title: 'Shipping Solutions',
            description: 'Integrated shipping and logistics management for global trade.',
        },
        {
            icon: ChartBar,
            title: 'Risk Analytics',
            description: 'Advanced analytics for trade compliance risk assessment.',
        },
    ];

    return (
        <div className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
                    Export Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <service.icon className="w-8 h-8 text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{service.title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Shipping Modes Section
export const ShippingModes = () => {
    const modes = [
        { mode: 'Ocean Freight', icon: Ship, description: 'International sea freight services' },
        { mode: 'Air Freight', icon: Plane, description: 'Express air cargo solutions' },
        { mode: 'Ground Transport', icon: Truck, description: 'Domestic and cross-border trucking' },
    ];

    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
                    Global Shipping Solutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {modes.map((mode) => (
                        <div
                            key={mode.mode}
                            className="group p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-200">
                                <mode.icon className="w-12 h-12 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{mode.mode}</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">{mode.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function AdditionalComponents() {
    return (
        <div>
            <ComplianceStats />
            <ComplianceProcess />
            <ExportServices />
            <ShippingModes />
            <FAQ />
            <Footer />
        </div>
    );
}

