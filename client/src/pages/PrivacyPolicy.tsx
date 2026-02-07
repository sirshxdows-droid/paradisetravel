import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden pt-32">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-[2rem]"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Data Collection</h2>
              <p>We collect information that you provide directly to us through our contact forms, including your name, email address, phone number, and destination preferences.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Use of Information</h2>
              <p>The information we collect is used solely to provide you with personalized travel quotes and to communicate with you regarding your inquiries.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Data Sharing</h2>
              <p>We do not sell or share your personal information with third parties for marketing purposes. We only share necessary details with travel providers to facilitate your booking requests.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or disclosure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Your Rights</h2>
              <p>You have the right to access, correct, or request the deletion of your personal information. Please contact us to exercise these rights.</p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
