import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center font-bold">
                🍗
              </div>
              <span className="font-bold text-lg">Aroma Oven</span>
            </div>
            <p className="text-background/80">
              Premium cloud kitchen delivering fresh, delicious meals to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#menu" className="text-background/80 hover:text-background transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#why-us" className="text-background/80 hover:text-background transition-colors">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-background/80 hover:text-background transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/80">
                <Phone size={16} />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Mail size={16} />
                <span>hello@aromaoven.com</span>
              </li>
              <li className="flex items-start gap-2 text-background/80">
                <MapPin size={16} className="flex-shrink-0 mt-1" />
                <span>Premium Cloud Kitchen, Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-background/80 text-sm">
            © 2024 Aroma Oven. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-background/80 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-background/80 hover:text-background transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
