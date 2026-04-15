# Aroma Oven - Database Setup Guide

This guide will help you set up the Supabase database for the Aroma Oven food ordering system.

## Step 1: Run Database Migrations

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** section
3. Create a new query and paste the contents of `scripts/create_tables.sql`
4. Execute the query to create all required tables

### Tables Created:
- **menu_items**: Stores all food items with descriptions, prices, and availability
- **orders**: Stores customer orders with delivery details and status
- **order_items**: Links orders to menu items with quantities and prices
- **serving_areas**: Defines delivery zones

## Step 2: Seed Initial Data

1. In the SQL Editor, create another new query
2. Paste the contents of `scripts/seed_data.sql`
3. Execute the query to populate the menu with sample items

This will add sample menu items across different categories:
- Biryani
- Curry
- Appetizers
- Desserts

## Step 3: Environment Variables

The following environment variables should already be set in your Vercel project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If not, add them to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Test the Setup

1. Run the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Check if the menu items load correctly
4. Test adding items to cart and proceeding to checkout
5. Test placing an order and verify it appears in the database

## Database Schema Overview

### menu_items
```sql
- id (UUID, primary key)
- name (string)
- description (text)
- price (decimal)
- category (string)
- image_url (string, optional)
- is_popular (boolean)
- is_available (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

### orders
```sql
- id (UUID, primary key)
- customer_name (string)
- customer_phone (string)
- customer_email (string)
- delivery_address (text)
- serving_area (string)
- total_amount (decimal)
- status (enum: PENDING, CONFIRMED, PREPARING, READY, COMPLETED)
- special_instructions (text, optional)
- created_at (timestamp)
- updated_at (timestamp)
```

### order_items
```sql
- id (UUID, primary key)
- order_id (UUID, foreign key)
- menu_item_id (UUID, foreign key)
- quantity (integer)
- price_at_purchase (decimal)
- created_at (timestamp)
```

### serving_areas
```sql
- id (UUID, primary key)
- name (string)
- city (string)
- description (text, optional)
- created_at (timestamp)
```

## Features

### Customer Features
- Browse menu with filters by category
- Add items to cart with quantity selection
- View cart summary
- Checkout with delivery details
- Receive order confirmation with order ID

## Future Enhancements

1. Add authentication for customers
2. Order history tracking
3. Payment gateway integration
4. SMS/Email notifications for orders
5. Rating and reviews system
6. Loyalty program
7. Custom menu management UI
8. Analytics dashboard

## Support

For issues with database setup or the application, please check:
1. Supabase dashboard status
2. Environment variables are correctly set
3. Database tables exist and contain data
4. Network connectivity

---

**Version**: 1.0
**Last Updated**: 2024
