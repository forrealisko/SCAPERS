"use client";

import { useState, useLayoutEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceCard from "./components/ServiceCard";
import Image from "next/image";
import Gallery from "./components/Gallery";
import Reveal from "./components/Reveal";
import Marquee from "react-fast-marquee";
import { Scissors, Leaf, Flower2, Sparkles, Hammer, Instagram, Facebook, Linkedin } from "lucide-react";
import BookingModal from "./components/BookingModal";
import FloatingCTA from "./components/FloatingCTA";
import SVGDivider from "./components/SVGDivider";
// Animated divider component
function AnimatedDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className="h-px bg-stone/20 mx-auto mt-8"
      initial={{ width: 0 }}
      animate={isInView ? { width: 96 } : { width: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
    />
  );
}
import DotGrid from "./components/DotGrid";


const services = [
  {
    title: "Lawn Care & Maintenance",
    description: "Specialized care for St. Augustine and Zoysia. We keep your turf emerald green and pest-free year-round.",
    icon: <Scissors className="w-full h-full" strokeWidth={1.5} />,
    pricing: "From $150/mo",
    details: ["Weekly mowing", "Weed control", "Fertilization", "Pest management"]
  },
  {
    title: "Tropical Design & Planting",
    description: "Custom layouts that handle the heat. We create resort-style spaces that feel lush and private.",
    icon: <Flower2 className="w-full h-full" strokeWidth={1.5} />,
    pricing: "Custom Quote",
    details: ["3D rendering included", "Native & Salt-tolerant selection", "Soil preparation", "Installation"]
  },
  {
    title: "Palm & Hedge Sculpting",
    description: "Precise canopy thinning and shaping. We keep palms safe for storm season and hedges clean.",
    icon: <Scissors className="w-full h-full" strokeWidth={1.5} />,
    pricing: "From $200",
    details: ["Diamond cutting", "Health pruning", "Storm safety", "Debris removal"]
  },
  {
    title: "Storm Prep & Seasonal Cleanup",
    description: "Hurricane season prep and spring revitalization. We handle heavy debris, coconut removal, and mulching.",
    icon: <Leaf className="w-full h-full" strokeWidth={1.5} />,
    pricing: "From $400",
    details: ["Frond removal", "Mulch application", "Coconut removal", "Debris hauling"]
  },
  {
    title: "Outdoor Upgrades",
    description: "Pool decks, travertine, and lighting. We enhance your outdoor living space with lasting improvements.",
    icon: <Hammer className="w-full h-full" strokeWidth={1.5} />,
    pricing: "Custom Quote",
    details: ["Travertine pavers", "Low-voltage lighting", "Retaining walls", "Walkways"]
  },
  {
    title: "Irrigation & Drainage",
    description: "Smart watering and flood prevention. We fix broken heads and install drainage to keep your foundation dry.",
    icon: <Sparkles className="w-full h-full" strokeWidth={1.5} />,
    pricing: "From $350",
    details: ["Sprinkler repair", "French drains", "System audit", "Flood prevention"]
  },
];

const testimonials = [
  {
    text: "They transformed our yard and it didn't even feel like work was being done. Super chill, super professional.",
    author: "- Sarah, Coral Gables"
  },
  {
    text: "Our backyard was basically a sandspur patch with some weeds. Now? It's where we spend every weekend. They killed it.",
    author: "- Mike, Boca Raton"
  },
  {
    text: "Clean, professional, and always on time. Our palms have never looked better.",
    author: "- David, Fort Lauderdale"
  },
  {
    text: "Best landscaping decision we made. Finally, someone who understands drainage.",
    author: "- Jen, Naples"
  },
  {
    text: "I was skeptical at first but wow... the difference is night and day. They really know what they're doing. Highly recommend.",
    author: "- Alex, Wynwood"
  },
  {
    text: "Finally, a landscaping company that actually listens. No upselling, no BS. Just great work.",
    author: "- Rachel, Winter Park"
  },
  {
    text: "Our neighbors keep asking who did our yard. That's all you need to know.",
    author: "- Tom, Palm Beach"
  },
  {
    text: "Been using them for 2 years now. Consistent quality, fair pricing, zero drama. Can't ask for more than that.",
    author: "- James, Delray Beach"
  },
  {
    text: "They made our backyard feel like a sanctuary. We actually use our pool deck now!",
    author: "- Amanda, Sarasota"
  }
];

const steps = [
  {
    title: "You reach out",
    description: "Send us a message or call. Tell us about your property and what you need.",
  },
  {
    title: "We visit & assess",
    description: "We come to you, walk your property, and check your soil and drainage.",
  },
  {
    title: "We take care of the rest",
    description: "From design to weekly maintenance, we handle it all. You just enjoy the view.",
  },
];

import FAQ from "./components/FAQ";


export default function Home() {
  // Scroll Fix
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="w-full relative bg-off-white">
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} service={null} />
      <FloatingCTA onBookClick={() => setIsBookingOpen(true)} />
      <DotGrid />
      {/* Hero Section */}
      <section id="hero" className="relative h-screen min-h-[800px] flex flex-col justify-center items-center overflow-hidden select-none">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/heronovy.webp"
              alt="Peaceful garden ecosystem"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
          {/* Animated vignette overlay to match ITALIA style */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 55% at 50% 52%, rgba(14, 28, 19, 0.55) 0%, transparent 100%),
                linear-gradient(to bottom,
                  rgba(14, 28, 19, 0.4) 0%,
                  rgba(14, 28, 19, 0.2) 40%,
                  rgba(14, 28, 19, 0.2) 60%,
                  rgba(14, 28, 19, 0.75) 100%)
              `
            }}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 2.7, ease: [0.19, 1, 0.22, 1] }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-warm-white px-4 max-w-5xl w-full">
          {/* Main heading with fade-in and scale */}
          <motion.div
            className="mx-auto"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.7, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <h1
              className="text-[2.5rem] md:text-[5.2rem] lg:text-[7rem] font-display font-normal tracking-[0.02em] mb-6 md:mb-8 leading-[1.1] md:leading-[1.1]"
              style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.5), 0 3px 14px rgba(0, 0, 0, 0.3)" }}
            >
              From overgrown <br className="hidden md:block" />
              to extraordinary.
            </h1>
          </motion.div>

          {/* Subheading with fade-in and scale */}
          <motion.div
            className="mx-auto"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.7, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <p
              className="text-[1.1rem] md:text-[1.75rem] mb-8 md:mb-12 max-w-3xl mx-auto font-normal opacity-95 text-balance leading-relaxed"
              style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.4)" }}
            >
              We design, remove and give life to outdoor spaces that feel
              clean, and cared for.
            </p>
          </motion.div>

          {/* Button with fade-in and scale */}
          <motion.div
            className="mx-auto flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.7, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <button
              onClick={() => {
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gold text-[#0E1C13] px-9 py-4 rounded-full font-semibold text-sm md:text-sm uppercase tracking-[0.15em] hover:scale-[1.02] hover:opacity-90 transition-all duration-300 shadow-sm active:scale-95"
            >
              TAKE A LOOK
            </button>
          </motion.div>
        </div>
      </section >

      {/* Divider: Hero (bg-#0E1C13) → Gallery (bg-[#F8F9F5]) */}
      <SVGDivider color="#F8F9F5" />

      {/* Gallery Section */}
      <section id="gallery" className="pt-12 md:pt-16 pb-20 md:pb-32 bg-off-white" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center mb-16">
          <Reveal className="mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 font-display">
              <span className="font-medium text-[#0E1C13]">Same spaces,</span>{' '}
              <span className="italic font-normal text-forest">
                different feeling.
              </span>
            </h2>
            <AnimatedDivider />
          </Reveal>
        </div>
        <Gallery />
      </section >

      {/* Services Section */}
      <section id="services" className="pt-10 md:pt-16 pb-20 md:pb-32 bg-off-white relative" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
          <Reveal className="mx-auto text-center" width="100%">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-display tracking-tight text-deep-green mb-24 uppercase tracking-widest text-center">
              Our services
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                pricing={service.pricing}
                details={service.details}
              />
            ))}
          </div>
        </div>
      </section >

      {/* Divider: Services (bg-[#F8F9F5] off-white) → Process (bg-[#0E1C13] deep-green) */}
      <SVGDivider color="#0E1C13" />

      {/* Process Section */}
      < section className="py-20 md:py-32 bg-deep-green text-white" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium font-display mb-24">
            No hassle. Just results.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="text-6xl font-display text-meadow/40 mb-8">{index + 1}</div>
                <h3 className="text-2xl mb-4 font-bold">{step.title}</h3>
                <p className="opacity-70 leading-relaxed text-balance">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Divider: Process (bg-[#0E1C13] deep-green) → Testimonials (bg-[#EEF2EB] light-grey) */}
      <SVGDivider color="#EEF2EB" flip />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-light-grey overflow-hidden" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-display text-center text-deep-green">
              What people say
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2} width="100%">
          <Marquee gradient={false} speed={40} autoFill pauseOnHover>
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-[#0E1C13]/10 w-[350px] md:w-[400px] shadow-sm mx-4 h-full hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:border-gold/30 transition-all duration-300" style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}>
                <p className="text-lg leading-relaxed mb-6 text-[#0E1C13]">"{t.text}"</p>
                <p className="text-forest font-bold uppercase tracking-widest text-xs">{t.author}</p>
              </div>
            ))}
          </Marquee>
        </Reveal>
      </section >

      {/* Divider: Testimonials (bg-[#EEF2EB] light-grey) → Contact (bg-[#0E1C13] deep-green) */}
      <SVGDivider color="#0E1C13" />

      {/* Contact Section */}
      < section id="contact" className="py-20 md:py-32 bg-deep-green text-white" >
        <div className="container mx-auto px-6 md:px-12 max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-medium font-display mb-8">Tell us about your space.</h2>
          <p className="text-xl mb-12 opacity-80">Talk to our AI assistant or send us a message.</p>

          {/* AI Booking CTA */}
          <button
            onClick={() => {
              if (window.RetellWidget) {
                window.RetellWidget.open();
              }
            }}
            className="w-full py-4 bg-gold text-[#0E1C13] font-semibold text-sm uppercase tracking-widest rounded-full hover:opacity-90 transition-all duration-300 mb-8 flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            Talk to Our AI — Book Instantly
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-sm uppercase tracking-widest text-white/40 font-medium">or send a message</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <form className="space-y-4 text-left">
            <input type="text" placeholder="Name" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold/50 text-white" />
            <input type="email" placeholder="Email" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold/50 text-white" />
            <textarea rows={4} placeholder="Your message" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-gold/50 text-white"></textarea>
            <button className="w-full py-4 bg-gold text-[#0E1C13] font-semibold text-sm uppercase tracking-widest rounded-full hover:opacity-90 transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section >

      {/* Divider: Contact (bg-[#0E1C13] deep-green) → FAQ (bg-[#F8F9F5] off-white) */}
      <SVGDivider color="#F8F9F5" flip />

      {/* FAQ Section */}
      < section className="py-20 md:py-32 bg-off-white" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="mx-auto">
            <h2 className="text-4xl md:text-5xl font-display text-center text-deep-green mb-24">Everything you need to know.</h2>
          </Reveal>
          <FAQ />
        </div>
      </section >

      {/* Divider: FAQ (bg-[#F8F9F5] off-white) → Footer (bg-[#0E1C13] deep-green) */}
      <SVGDivider color="#0E1C13" />

      {/* Footer */}
      < footer className="py-24 bg-[#0E1C13] text-center" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-display font-medium tracking-[0.2em] text-white mb-2 inline-block">
              SCAPERS
            </h2>
            <p className="text-base mb-8 font-sans text-white/50">Landscaping & Outdoor Care</p>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-white/40 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>© 2026 SCAPERS.</p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 ml-auto">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                Current mood: Sunny skies, busy planting.
              </span>
            </div>
          </div>
        </div>
      </footer >
    </main >
  );
}
