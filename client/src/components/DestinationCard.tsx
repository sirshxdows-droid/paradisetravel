import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { type Destination } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface DestinationCardProps {
  destination: Destination;
  index: number;
  onContactClick: () => void;
}

export function DestinationCard({ destination, index, onContactClick }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20 uppercase tracking-wider">
              Best Seller
            </span>
            <span className="flex items-center text-white/80 text-sm font-medium">
              <MapPin className="w-4 h-4 mr-1 text-secondary" />
              {destination.slug === 'dubai' ? 'Middle East' : 'Caribbean'}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 leading-tight">
            {destination.name}
          </h3>
          
          <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-6 max-w-[90%] font-light">
            {destination.description}
          </p>

          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onContactClick();
            }}
            className="w-full md:w-auto bg-white text-foreground hover:bg-secondary hover:text-white transition-all duration-300 font-semibold rounded-xl"
          >
            Inquire Price
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
