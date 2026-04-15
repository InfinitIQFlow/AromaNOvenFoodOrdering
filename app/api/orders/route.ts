import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderRequest {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  servingArea: string;
  items: OrderItem[];
  totalAmount: number;
  instructions?: string;
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Handle error
            }
          },
        },
      }
    );

    const body: OrderRequest = await request.json();

    // Insert order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: body.customerName,
        customer_phone: body.customerPhone,
        customer_email: body.customerEmail,
        delivery_address: body.deliveryAddress,
        serving_area: body.servingArea,
        total_amount: body.totalAmount,
        special_instructions: body.instructions,
        status: 'PENDING',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Insert order items
    const orderItems = body.items.map((item) => ({
      order_id: orderData.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items insert error:', itemsError);
      return NextResponse.json(
        { error: 'Failed to save order items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Handle error
            }
          },
        },
      }
    );

    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items (
          id,
          quantity,
          price_at_purchase,
          menu_item_id
        )
      `
      )
      .eq('customer_phone', phone)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
