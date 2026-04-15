'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Loader,
  AlertCircle,
  ChefHat,
  Clock,
} from 'lucide-react';
import Image from 'next/image';

interface OrderFormData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  servingArea: string;
}

const RECOMMENDED_ITEMS = [
  {
    id: 'addon-1',
    name: 'Garlic Naan',
    price: 80,
    image: 'https://images.unsplash.com/photo-1585619916944-a3fb3f5db9c9?w=200&h=200&fit=crop',
    popular: true,
  },
  {
    id: 'addon-2',
    name: 'Mango Lassi',
    price: 120,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd3e2b2?w=200&h=200&fit=crop',
    popular: true,
  },
  {
    id: 'addon-3',
    name: 'Gulab Jamun',
    price: 100,
    image: 'https://images.unsplash.com/photo-1585470881379-bdefb3c0d24f?w=200&h=200&fit=crop',
    popular: false,
  },
];

const SERVING_AREAS = [
  { value: 'habsiguda', label: 'Habsiguda & nearby' },
  { value: 'downtown', label: 'Downtown' },
  { value: 'midtown', label: 'Midtown' },
  { value: 'suburbs', label: 'Suburbs' },
];

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeFromCart,
    updateQuantity,
    specialInstructions,
    setSpecialInstructions,
    customerDetails,
    setCustomerDetails,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    servingArea: SERVING_AREAS[0].value,
  });

  const handleAddItem = (item: (typeof RECOMMENDED_ITEMS)[0]) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    };
    // This would normally call addToCart but we need access to it
    // For now, just show a toast-like behavior
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      alert('Please enter your name');
      return false;
    }
    if (!formData.customerPhone.trim() || formData.customerPhone.length < 10) {
      alert('Please enter a valid phone number');
      return false;
    }
    if (!formData.deliveryAddress.trim()) {
      alert('Please enter your delivery address');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          customerEmail: `${formData.customerPhone}@aroma-oven.local`,
          deliveryAddress: formData.deliveryAddress,
          servingArea: formData.servingArea,
          instructions: specialInstructions,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: getTotalPrice(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      setSuccessOrderId(data.orderId);
      clearCart();
      setFormData({
        customerName: '',
        customerPhone: '',
        deliveryAddress: '',
        servingArea: SERVING_AREAS[0].value,
      });

      // Close drawer and show success after a brief delay
      setTimeout(() => {
        closeDrawer();
        alert(`Order confirmed! Order ID: ${data.orderId}`);
      }, 500);
    } catch (error) {
      console.error('Order error:', error);
      alert(error instanceof Error ? error.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 animate-in fade-in"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-background border-l border-border shadow-2xl z-40 flex flex-col transition-all duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
          <h2 className="text-2xl font-bold text-foreground">Your Order</h2>
          <button
            onClick={closeDrawer}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X size={24} className="text-foreground" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-4">
              <div className="text-5xl text-muted-foreground opacity-50">🛒</div>
              <p className="text-muted-foreground text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add items from the menu to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handlePlaceOrder} className="flex flex-col h-full">
              {/* Cart Items */}
              <div className="space-y-3 p-6 border-b border-border">
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                  Order Items
                </h3>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-3 border-b border-border/50 last:border-b-0 last:pb-0 animate-in fade-in slide-in-from-bottom-2"
                  >
                    {/* Item Image */}
                    {item.image && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-primary font-bold text-sm">
                        ₹{item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2 bg-muted rounded-lg p-1 w-fit">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-background rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} className="text-foreground" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-background rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} className="text-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="px-6 py-4 border-b border-border space-y-3 bg-accent/5">
                <div className="flex items-start gap-3">
                  <ChefHat size={16} className="text-primary mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      Premium Fresh Delivery
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Serving: Habsiguda & nearby areas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-primary mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      Tomorrow 1 PM – 3 PM
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Fast, reliable delivery
                    </p>
                  </div>
                </div>
              </div>

              {/* Today's Special */}
              <div className="px-6 py-3 border-b border-border bg-gradient-to-r from-accent/20 to-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⭐</span>
                  <p className="font-bold text-foreground text-sm">
                    Today&apos;s Special
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Free dessert above ₹500 order value
                </p>
              </div>

              {/* Recommended Add-ons */}
              <div className="px-6 py-4 border-b border-border space-y-3">
                <p className="font-semibold text-foreground text-sm uppercase tracking-wide">
                  Add More Items?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {RECOMMENDED_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAddItem(item)}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-foreground line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-primary font-bold">
                          ₹{item.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="px-6 py-4 border-b border-border space-y-2">
                <label className="font-semibold text-foreground text-sm uppercase tracking-wide block">
                  Special Requests
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g., Less spicy, no onions, extra sauce..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
                  rows={2}
                />
              </div>

              {/* Customer Details */}
              <div className="px-6 py-4 border-b border-border space-y-3">
                <p className="font-semibold text-foreground text-sm uppercase tracking-wide">
                  Your Details
                </p>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Full Name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
                />
                <input
                  type="tel"
                  name="customerPhone"
                  placeholder="Phone Number"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
                />
                <textarea
                  name="deliveryAddress"
                  placeholder="Delivery Address"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
                  rows={2}
                />
                <select
                  name="servingArea"
                  value={formData.servingArea}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary text-sm"
                >
                  {SERVING_AREAS.map((area) => (
                    <option key={area.value} value={area.value}>
                      {area.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Urgency Message */}
              <div className="px-6 py-3 bg-amber-50 border-b border-amber-100 flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800">
                  <span className="font-semibold">Limited slots available!</span>{' '}
                  Slots filling fast for tomorrow. Order now to secure your time slot.
                </p>
              </div>

              {/* Price Summary */}
              <div className="px-6 py-4 space-y-2 border-b border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    ₹{getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-semibold text-primary">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg border-t border-border pt-2">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-primary text-xl">
                    ₹{getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-6 bg-gradient-to-t from-primary/10 to-transparent">
                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="w-full bg-primary text-background font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Confirm Order for Tomorrow</span>
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
