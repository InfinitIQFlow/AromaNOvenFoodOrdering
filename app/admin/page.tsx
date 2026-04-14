'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, CheckCircle, Loader, AlertCircle } from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  price_at_purchase: number;
  menu_item_id: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  serving_area: string;
  total_amount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED';
  special_instructions?: string;
  created_at: string;
  order_items: OrderItem[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple password authentication (use real auth in production)
  const ADMIN_PASSWORD = 'aroma123';

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAdminPassword('');
    } else {
      alert('Invalid password');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Refresh orders every 5 seconds for real-time updates
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus as any } : order
          )
        );
      }
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'PREPARING':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'READY':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock size={16} />;
      case 'CONFIRMED':
      case 'PREPARING':
      case 'READY':
        return <AlertCircle size={16} />;
      case 'COMPLETED':
        return <CheckCircle size={16} />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">
            Enter your password to access the admin dashboard
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-primary text-background px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <Link
              href="/"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredOrders =
    selectedStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', count: orders.length, color: 'bg-blue-100 text-blue-800' },
            {
              label: 'Pending',
              count: orders.filter((o) => o.status === 'PENDING').length,
              color: 'bg-yellow-100 text-yellow-800',
            },
            {
              label: 'In Progress',
              count: orders.filter((o) =>
                ['CONFIRMED', 'PREPARING', 'READY'].includes(o.status)
              ).length,
              color: 'bg-orange-100 text-orange-800',
            },
            {
              label: 'Completed',
              count: orders.filter((o) => o.status === 'COMPLETED').length,
              color: 'bg-green-100 text-green-800',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-lg p-6 text-center`}
            >
              <p className="text-sm font-semibold opacity-75">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                  selectedStatus === status
                    ? 'bg-primary text-background'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12">
            <Loader className="animate-spin mx-auto mb-4" size={32} />
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground text-lg">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {order.customer_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-semibold text-foreground">
                      {order.customer_phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">
                      {order.customer_email}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Serving Area</p>
                    <p className="font-semibold text-foreground capitalize">
                      {order.serving_area}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="font-semibold text-primary text-lg">
                      ₹{order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">
                    Delivery Address:
                  </p>
                  <p className="text-foreground">{order.delivery_address}</p>
                </div>

                {order.special_instructions && (
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-2 font-semibold">
                      Special Instructions:
                    </p>
                    <p className="text-foreground">{order.special_instructions}</p>
                  </div>
                )}

                {/* Status Update Buttons */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-3 font-semibold">
                    Update Status:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['CONFIRMED', 'PREPARING', 'READY', 'COMPLETED'].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(order.id, status)}
                          disabled={order.status === status}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            order.status === status
                              ? 'bg-muted text-muted-foreground cursor-not-allowed'
                              : 'bg-primary text-background hover:bg-primary/90'
                          }`}
                        >
                          {status}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
