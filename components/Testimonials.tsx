import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Regular Customer',
    content:
      'Best cloud kitchen in the city! The biryani is absolutely delicious and delivery is always on time.',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    name: 'Priya Singh',
    role: 'Food Blogger',
    content:
      'Fresh ingredients, authentic recipes, and amazing flavors. This is how cloud kitchen food should be.',
    rating: 5,
    avatar: '👩‍🦱',
  },
  {
    name: 'Vikram Patel',
    role: 'Regular Customer',
    content:
      'Fast delivery, hot food, and great taste. Aroma Oven has become my go-to for weekday meals.',
    rating: 5,
    avatar: '👨‍🔬',
  },
  {
    name: 'Ananya Desai',
    role: 'Corporate Client',
    content:
      'We order for office lunches regularly. Consistent quality and professional service every time.',
    rating: 5,
    avatar: '👩‍💼',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Join thousands of satisfied customers enjoying quality food
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="text-foreground italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
