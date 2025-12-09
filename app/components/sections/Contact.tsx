'use client';

import { useState } from "react";
import { Send, Mail, Linkedin, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section id="contact" className="py-7 md:py-10 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-widest">Contact</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
                Let's Connect
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Interested in collaborating or have a project in mind? I'd love to hear from you. Let's discuss how we can create something impactful together.
              </p>

              <div className="space-y-6">
                <a
                  href="https://www.linkedin.com/in/swatisahu0190/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Linkedin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">LinkedIn</div>
                    <div className="text-muted-foreground text-sm">Connect professionally</div>
                  </div>
                </a>

                <a
                  href="mailto:swati.sahu0190@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground text-sm">swati.sahu0190@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-muted-foreground text-sm">India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-2xl bg-card border border-border shadow-soft">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      required
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
