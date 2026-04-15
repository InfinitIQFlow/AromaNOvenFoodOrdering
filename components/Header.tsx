'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  const { getTotalItems, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Aroma Oven Logo"
              width={48}
              height={48}
              className="rounded-lg object-cover"
              priority
            />
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:inline">Aroma Oven</span>
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

        <button
          onClick={openDrawer}
          className="relative flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-95"
        >
          <ShoppingCart size={20} />
          <span>Cart</span>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
