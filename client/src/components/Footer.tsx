import { Link } from "wouter";
import { Palmtree, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <Palmtree className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl text-foreground">
                Paradise<span className="text-primary">Travel</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Crafting unforgettable luxury experiences at unbeatable prices. Your dream vacation is just one click away.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Destinations</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Dubai</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Mexico</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Dominican Republic</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">View All</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span>+44 77754 98999</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span>contact@paradisetravel.com</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span>Birmingham, United Kingdom</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
