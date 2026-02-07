import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInquiry } from "@/hooks/use-destinations";
import { insertInquirySchema, type InsertInquiry, type Destination } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ContactFormProps {
  destinations?: Destination[];
  preselectedDestinationId?: number;
}

export function ContactForm({ destinations, preselectedDestinationId }: ContactFormProps) {
  const { toast } = useToast();
  const { mutate, isPending } = useCreateInquiry();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      destinationId: preselectedDestinationId,
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Inquiry Sent!",
          description: "One of our travel experts will contact you shortly with the best prices.",
          duration: 5000,
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to submit inquiry. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div id="contact" className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold tracking-wider uppercase text-sm"
          >
            Get the Best Price
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4"
          >
            Start Your Dream Vacation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Fill out the form below and we'll get back to you with an exclusive offer within 24 hours.
          </motion.p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 font-medium ml-1">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="glass-input h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 font-medium ml-1">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} className="glass-input h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 font-medium ml-1">Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} value={field.value || ""} className="glass-input h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destinationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 font-medium ml-1">Destination</FormLabel>
                    <Select 
                      onValueChange={(val) => field.onChange(Number(val))} 
                      defaultValue={field.value?.toString()}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="glass-input h-12 rounded-xl">
                          <SelectValue placeholder="Where do you want to go?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {destinations?.map((dest) => (
                          <SelectItem key={dest.id} value={dest.id.toString()}>
                            {dest.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="0">Not sure yet / Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium ml-1">Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your preferences (dates, number of travelers, etc.)" 
                      className="glass-input min-h-[120px] rounded-xl resize-none" 
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Get My Quote
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              By submitting this form, you agree to be contacted regarding your travel inquiry.
              <br />We respect your privacy and will never share your details.
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
