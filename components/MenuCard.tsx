'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

interface MenuCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url?: string;
    is_popular: boolean;
  };
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image_url,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Placeholder */}
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden group">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-4xl">🍲</span>
        )}
        {item.is_popular && (
          <div className="absolute top-3 right-3 bg-accent text-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star size={14} fill="currentColor" />
            Popular
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground line-clamp-2">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="text-2xl font-bold text-primary">
            ₹{item.price}
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              isAdded
                ? 'bg-green-600 text-white'
                : 'bg-primary text-background hover:bg-primary/90'
            }`}
          >
            <ShoppingCart size={16} />
            {isAdded ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
