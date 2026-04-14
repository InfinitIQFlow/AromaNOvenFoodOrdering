import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Freshly Crafted, <span className="text-primary">Delivered Fast</span>
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Experience premium cloud kitchen food made with the finest ingredients. Order now and enjoy delicious meals at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#menu"
                className="inline-block bg-primary text-background px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
              >
                Order Now
              </Link>
              <Link
                href="#why-us"
                className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-primary">15min</div>
                <div className="text-sm text-muted-foreground">Avg Delivery</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">2.5K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative w-full h-96 bg-gradient-to-br from-primary to-accent rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">🍜</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
