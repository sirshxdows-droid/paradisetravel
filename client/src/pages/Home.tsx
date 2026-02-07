import { motion } from "framer-motion";
import { ArrowDown, Star, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import { useDestinations } from "@/hooks/use-destinations";
import { Navigation } from "@/components/Navigation";
import { DestinationCard } from "@/components/DestinationCard";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Static imports for images
import dubaiImg from '@assets/stock_images/dubai_luxury_holiday_82757812.jpg';
import mexicoImg from '@assets/stock_images/mexico_cancun_beach__017f52ff.jpg';
import drImg from '@assets/stock_images/dominican_republic_p_1460e2a5.jpg';

export default function Home() {
  const { data: destinations, isLoading } = useDestinations();

  const scrollToDestinations = () => {
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Enhance API data with local images if they match (fallback logic)
  const enhancedDestinations = destinations?.map(dest => {
    let img = dest.imageUrl;
    // Override with imported high-quality assets if names match
    if (dest.slug.includes('dubai')) img = dubaiImg;
    if (dest.slug.includes('mexico') || dest.slug.includes('cancun')) img = mexicoImg;
    if (dest.slug.includes('dominican')) img = drImg;
    
    return { ...dest, imageUrl: img };
  });

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0">
          <img 
            src={dubaiImg} 
            alt="Luxury Travel" 
            className="w-full h-full object-cover scale-110 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 uppercase tracking-wider">
              Exclusive Travel Deals
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 text-shadow-lg leading-tight">
              Luxury Escapes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">
                Unbeatable Prices
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Experience the world's most breathtaking destinations without the premium price tag. 
              Dubai, Mexico, Dominican Republic and more.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={scrollToDestinations}
                size="lg"
                className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                View Destinations
              </Button>
              <Button 
                onClick={scrollToContact}
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 font-semibold text-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 cursor-pointer"
          onClick={scrollToDestinations}
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Features / Trust Section */}
      <section className="py-20 bg-background relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8 text-secondary" />,
                title: "Premium Experience",
                desc: "Hand-picked 5-star resorts and luxury accommodations strictly vetted for quality."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Best Price Guarantee",
                desc: "We negotiate directly with hotels to bring you exclusive rates you won't find online."
              },
              {
                icon: <CreditCard className="w-8 h-8 text-secondary" />,
                title: "Secure Booking",
                desc: "Your vacation is protected. 100% secure payment processing and travel insurance options."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl text-center hover:bg-white/80 transition-colors duration-300"
              >
                <div className="bg-background w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Trending Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our most popular packages. Contact us today to reveal our exclusive wholesale prices.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] rounded-[2rem] bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enhancedDestinations?.map((dest, index) => (
                <DestinationCard 
                  key={dest.id} 
                  destination={dest} 
                  index={index}
                  onContactClick={scrollToContact}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative bg-background">
        <div className="container mx-auto px-4">
          <ContactForm destinations={destinations} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
