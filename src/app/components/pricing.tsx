import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingComponent = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '$9',
      period: '/month',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 5 projects',
        '2GB storage',
        'Basic support',
        'Access to core features'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Unlimited projects',
        '20GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom domains'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Unlimited everything',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'Advanced security'
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mb-10 p-4 bg-background">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 inline-block text-transparent bg-clip-text">
          Simple, transparent pricing
        </h2>
        <p className="text-muted-foreground text-lg">Choose the plan that works best for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col p-6 bg-card rounded-xl border border-border
              transition-all duration-200 hover:shadow-xl hover:scale-[1.02]
              ${plan.popular ? 'shadow-lg shadow-primary/20 border-primary' : ''}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-3">
                <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <p className="text-muted-foreground">{plan.description}</p>
            </div>

            <div className="flex-grow mb-6">
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-foreground">
                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 mr-3">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Button
                className={`w-full h-12 text-base font-medium transition-all
                  ${plan.popular ?
                    'bg-primary hover:bg-primary/90' :
                    'bg-secondary hover:bg-secondary/90'
                  }`}
                variant={plan.popular ? "default" : "secondary"}
              >
                Get Started
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;