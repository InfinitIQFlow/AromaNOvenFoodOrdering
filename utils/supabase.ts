import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  is_popular: boolean;
  is_available: boolean;
  created_at?: string;
};

export type ServingArea = {
  id: string;
  area_name: string;
  delivery_charge: number;
  delivery_time_minutes: number;
  is_available: boolean;
  created_at?: string;
};

export type Order = {
  id: string;
  customer_phone: string;
  customer_name: string;
  customer_email?: string;
  serving_area_id: string;
  total_amount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  delivery_address?: string;
  special_instructions?: string;
  created_at?: string;
  updated_at?: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price_at_order: number;
  special_requests?: string;
  created_at?: string;
};
