import { Link } from "wouter";
import { Palmtree, Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? "w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 py-2 px-6 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            : "w-full bg-transparent border-transparent py-4 px-4 rounded-none shadow-none mt-4"
        }`}
      >
        <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
            <Palmtree className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className={`font-display font-bold text-xl md:text-2xl tracking-tight transition-colors text-white`}>
            Luxe<span className="text-primary font-extrabold italic">Stays</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Button 
            onClick={scrollToContact}
            className={`
              rounded-full px-6 py-2.5 font-medium transition-all duration-300
              ${scrolled 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20' 
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30'}
            `}
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact For Prices
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-card border-l border-white/20 w-[300px] bg-black/40 backdrop-blur-xl text-white">
              <div className="flex flex-col gap-6 mt-10">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-display font-bold text-white">
                  Home
                </Link>
                <div onClick={scrollToContact} className="text-lg font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                  Destinations
                </div>
                <div onClick={scrollToContact} className="text-lg font-medium text-white/70 hover:text-primary transition-colors cursor-pointer">
                  Special Offers
                </div>
                <Button onClick={scrollToContact} className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl font-bold">
                  <Phone className="w-4 h-4 mr-2" />
                  Get a Quote
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
    </div>
  );
}
