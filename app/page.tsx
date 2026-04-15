import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata = {
  title: 'Aroma Oven - Premium Cloud Kitchen',
  description: 'Fresh, delicious food delivered fast. Order now from our premium cloud kitchen.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Menu />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
      <CartDrawer />
    </main>
  );
}
