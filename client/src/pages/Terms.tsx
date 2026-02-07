import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden pt-32">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-[2rem]"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Introduction</h2>
              <p>Welcome to Paradise Travel. By accessing our website and using our services, you agree to be bound by the following terms and conditions. Please read them carefully.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Services</h2>
              <p>Paradise Travel acts as an intermediary between customers and travel service providers. We specialize in luxury holiday packages to Dubai, Mexico, and the Dominican Republic. All bookings are subject to availability and the specific terms of the service providers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Pricing</h2>
              <p>Due to our exclusive wholesale contracts, we do not advertise prices publicly. All prices are provided via direct quote and are subject to change until a booking is confirmed with a deposit or full payment.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Bookings and Payments</h2>
              <p>A booking is only confirmed once we receive the required payment and issue a confirmation invoice. Payments must be made via our secure payment channels.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Cancellations</h2>
              <p>Cancellation policies vary by package and provider. These details will be clearly outlined in your personalized quote and booking documents.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Liability</h2>
              <p>Paradise Travel is not liable for changes, delays, or cancellations caused by third-party providers or force majeure events. We strongly recommend comprehensive travel insurance for all trips.</p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
