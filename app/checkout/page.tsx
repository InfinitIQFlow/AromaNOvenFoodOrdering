'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Loader } from 'lucide-react';
import Link from 'next/link';

interface OrderFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  servingArea: string;
  instructions: string;
}

interface SuccessModalProps {
  orderId: string;
  isOpen: boolean;
}

function SuccessModal({ orderId, isOpen }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg p-8 max-w-md text-center space-y-6">
        <div className="text-5xl">✅</div>
        <h2 className="text-2xl font-bold text-foreground">Order Received!</h2>
        <p className="text-muted-foreground">
          Your order is confirmed. We&apos;re preparing your delicious meal now.
        </p>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
          <p className="font-mono font-bold text-foreground">{orderId}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          You&apos;ll receive delivery updates on your phone.
        </p>
        <Link
          href="/"
          className="w-full bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    servingArea: '',
    instructions: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.customerEmail ||
      !formData.deliveryAddress ||
      !formData.servingArea
    ) {
      alert('Please fill in all required fields');
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
          customerEmail: formData.customerEmail,
          deliveryAddress: formData.deliveryAddress,
          servingArea: formData.servingArea,
          instructions: formData.instructions,
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
        customerEmail: '',
        deliveryAddress: '',
        servingArea: '',
        instructions: '',
      });
    } catch (error) {
      console.error('Order error:', error);
      alert(
        error instanceof Error ? error.message : 'Failed to place order'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-6">
              Your cart is empty
            </p>
            <Link
              href="/#menu"
              className="inline-block bg-primary text-background px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                {/* Customer Info */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-bold text-foreground">
                    Delivery Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Your Name"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      name="customerEmail"
                      placeholder="Email Address"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <input
                    type="tel"
                    name="customerPhone"
                    placeholder="Phone Number"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />

                  <textarea
                    name="deliveryAddress"
                    placeholder="Delivery Address"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                  />

                  <select
                    name="servingArea"
                    value={formData.servingArea}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Serving Area</option>
                    <option value="downtown">Downtown Mumbai</option>
                    <option value="midtown">Midtown Mumbai</option>
                    <option value="uptown">Uptown Mumbai</option>
                    <option value="suburbs">Suburbs</option>
                  </select>
                </div>

                {/* Special Instructions */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-bold text-foreground">
                    Special Instructions (Optional)
                  </h2>

                  <textarea
                    name="instructions"
                    placeholder="Any special instructions for your order?"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader size={20} className="animate-spin" />}
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4 sticky top-24">
                <h2 className="text-xl font-bold text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start pb-3 border-b border-border"
                    >
                      <div>
                        <p className="font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          x{item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-semibold text-foreground">
                      ₹{getTotalPrice().toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Delivery Fee</p>
                    <p className="font-semibold text-foreground">Free</p>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-primary pt-2 border-t border-border">
                    <p>Total</p>
                    <p>₹{getTotalPrice().toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        orderId={successOrderId || ''}
        isOpen={successOrderId !== null}
      />
    </main>
  );
}
