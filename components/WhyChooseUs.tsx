import { Zap, Leaf, Handshake, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Freshly prepared and delivered in under 15 minutes',
  },
  {
    icon: Leaf,
    title: 'Premium Quality',
    description: 'Sourced from the finest suppliers and prepared daily',
  },
  {
    icon: Handshake,
    title: 'Trusted Since 2020',
    description: 'Serving over 2500+ happy customers every month',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for excellence in taste and quality',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Why Choose Aroma Oven?
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            We're committed to delivering the best food experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
