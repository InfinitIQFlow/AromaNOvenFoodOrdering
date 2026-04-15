# 🍗 Aroma Oven - Premium Cloud Kitchen Ordering App

A modern, sophisticated food ordering application built with Next.js 16, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

- **Premium Homepage**: Hero section with call-to-action, testimonials, and why-us section
- **Dynamic Menu**: Browse food items filtered by category with descriptions and pricing
- **Shopping Cart**: Add items with real-time cart updates and quantity management
- **Checkout**: Complete order form with delivery address and special instructions
- **Order Confirmation**: Instant order confirmation with tracking ID

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **State Management**: React Context API
- **UI Components**: shadcn/ui inspired design system
- **Icons**: Lucide React

## 📋 Project Structure

```
aroma-oven/
├── app/
│   ├── api/
│   │   ├── menu/
│   │   └── orders/
│   ├── checkout/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Menu.tsx
│   ├── MenuCard.tsx
│   ├── WhyChooseUs.tsx
│   ├── Testimonials.tsx
│   └── Footer.tsx
├── context/
│   └── CartContext.tsx
├── utils/
│   └── supabase.ts
├── scripts/
│   ├── create_tables.sql
│   └── seed_data.sql
└── DATABASE_SETUP.md
```

## 🔧 Installation & Setup

### 1. Prerequisites
- Node.js 18+
- A Supabase account (free tier available at supabase.com)

### 2. Clone the Repository
```bash
git clone <repository-url>
cd aroma-oven
npm install
```

### 3. Setup Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project credentials:
   - Project URL
   - Anon API Key
3. Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Create Database Tables

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the queries from `scripts/create_tables.sql`
3. Run the queries from `scripts/seed_data.sql` to add sample data

**Detailed instructions**: See `DATABASE_SETUP.md`

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📱 Usage

1. Navigate to the menu section
2. Filter by category
3. Add items to cart
4. Click cart icon in header
5. Fill delivery details
6. Place order and receive confirmation

## 🎨 Color Scheme

The app uses a premium brown, gold, and beige color palette:
- **Primary**: #8B4513 (Saddle Brown)
- **Accent**: #DAA520 (Goldenrod)
- **Background**: #FAF7F2 (Light Beige)
- **Foreground**: #1A1A1A (Near Black)

## 🔐 Security Notes

**Before Production:**
1. Implement proper customer authentication (optional)
2. Add Row Level Security (RLS) policies in Supabase
3. Use environment variables for sensitive data
4. Enable HTTPS
5. Validate all user inputs

## 📦 API Endpoints

### Menu
- `GET /api/menu` - Get all available menu items

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders?phone=<phone>` - Get orders for a customer

## 🚢 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
vercel
```

### Deploy to Other Platforms
1. Ensure Node.js 18+ is supported
2. Set environment variables
3. Run `npm run build` then `npm start`

## 📈 Future Enhancements

- [ ] User authentication and profiles
- [ ] Order history and tracking
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] SMS/Email notifications
- [ ] Rating and review system
- [ ] Loyalty rewards program
- [ ] Menu management dashboard
- [ ] Analytics and reporting
- [ ] Multi-location support

## 🐛 Troubleshooting

### Menu items not loading
- Check Supabase connection and credentials
- Verify database tables exist
- Check browser console for errors

### Orders not saving
- Ensure Supabase tables are created
- Check API response in Network tab
- Verify customer details are complete

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💼 Support

For issues or questions:
1. Check `DATABASE_SETUP.md` for database help
2. Review Supabase docs: https://supabase.com/docs
3. Check Next.js docs: https://nextjs.org/docs

---

**Made with ❤️ for food lovers**

**Version**: 1.0 | **Last Updated**: 2024
