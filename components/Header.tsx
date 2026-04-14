'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-background font-bold text-lg">
            🍗
          </div>
          <span className="font-bold text-xl text-foreground">Aroma Oven</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#menu" className="text-foreground hover:text-primary transition-colors">
            Menu
          </Link>
          <Link href="#why-us" className="text-foreground hover:text-primary transition-colors">
            Why Us
          </Link>
          <Link href="#testimonials" className="text-foreground hover:text-primary transition-colors">
            Reviews
          </Link>
        </nav>

        <Link
          href="/checkout"
          className="relative flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <ShoppingCart size={20} />
          <span>Cart</span>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
