import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden pt-32">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-[2rem]"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Cookie Policy</h1>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">What Are Cookies?</h2>
              <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide a better experience and understand how you interact with our site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">How We Use Cookies</h2>
              <p>We use essential cookies to maintain your session and analytical cookies to understand how visitors use our website. This information helps us improve our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Types of Cookies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Strictly Necessary:</strong> Required for the website to function correctly.</li>
                <li><strong>Performance:</strong> Help us monitor site performance and fix issues.</li>
                <li><strong>Functionality:</strong> Remember your preferences for a better experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Managing Cookies</h2>
              <p>You can choose to disable cookies through your browser settings. However, please note that some parts of our website may not function correctly if you do so.</p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
