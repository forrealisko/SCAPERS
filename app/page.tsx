"use client";

import { useState, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from "./components/ServiceCard";
import Image from "next/image";
import Gallery from "./components/Gallery";
import Reveal from "./components/Reveal";
import Marquee from "react-fast-marquee";
import { Scissors, Leaf, Flower2, Sparkles, Hammer, Instagram, Facebook, Linkedin } from "lucide-react";
import BookingModal from "./components/BookingModal";
import FloatingCTA from "./components/FloatingCTA";
import SideNav from "./components/SideNav";

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
      <SideNav />
      {/* Hero Section */}
      <section id="hero" className="relative h-screen min-h-[800px] flex flex-col justify-center items-center overflow-hidden select-none">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero.jpg"
              alt="Peaceful garden ecosystem"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
          {/* Animated black overlay - fades from 70% to 30% until effortless animation ends */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2.7, ease: [0.19, 1, 0.22, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
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
            <h1 className="text-[2.5rem] md:text-[5.2rem] lg:text-[7rem] font-display font-medium tracking-tight mb-6 md:mb-8 leading-[1.1] md:leading-[1.1]">
              From not the best <br className="hidden md:block" />
              to <span className="inline-block overflow-hidden relative translate-y-[0.2em] md:translate-y-[0.22em] align-baseline pb-1 px-1">
                <motion.span
                  className="font-bold inline-block"
                  initial={{ opacity: 0, letterSpacing: "-0.15em", filter: "blur(3.4px)" }}
                  animate={{ opacity: 1, letterSpacing: "0.1em", filter: "blur(0px)" }}
                  transition={{
                    duration: 2,
                    delay: 1.2,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                >
                  effortless.
                </motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Subheading with fade-in and scale */}
          <motion.div
            className="mx-auto"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.7, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-[1.1rem] md:text-[1.75rem] mb-8 md:mb-12 max-w-3xl mx-auto font-medium opacity-95 text-balance leading-relaxed">
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
                const gallerySection = document.querySelector('section.py-32.bg-off-white');
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-[#1a1617] text-white px-8 py-4 md:px-[2.6rem] md:py-[1.15rem] rounded-lg font-bold text-base md:text-[1.15rem] uppercase tracking-wider hover:scale-[1.05] hover:bg-[#2a2627] hover:shadow-[0_0_20px_rgba(26,22,23,0.5)] transition-all duration-300 shadow-[0_10px_30px_rgba(26,22,23,0.3)] active:scale-95"
            >
              TAKE A LOOK
            </button>
          </motion.div>
        </div>
      </section >

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-off-white border-b border-stone/10" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center mb-16">
          <Reveal className="mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 font-display">
              <span className="font-medium">Same spaces,</span>{' '}
              <span className="italic font-normal text-forest">
                different feeling.
              </span>
            </h2>
            <div className="w-24 h-px bg-stone/20 mx-auto mt-8" />
          </Reveal>
        </div>
        <Gallery />
      </section >

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-off-white relative" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
          <Reveal className="mx-auto text-center" width="100%">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-display tracking-tight text-forest mb-24 uppercase tracking-widest text-center">
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

      {/* Process Section */}
      < section className="py-20 md:py-32 bg-forest text-warm-white" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium font-display mb-24">
            No hassle. Just results.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="text-6xl font-display opacity-40 mb-8">{index + 1}</div>
                <h3 className="text-2xl mb-4 font-bold">{step.title}</h3>
                <p className="opacity-70 leading-relaxed text-balance">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-light-grey overflow-hidden" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-display text-center text-forest">
              What people say
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2} width="100%">
          <Marquee gradient={false} speed={40} autoFill pauseOnHover>
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-stone/20 w-[350px] md:w-[400px] shadow-sm mx-4 h-full">
                <p className="text-lg leading-relaxed mb-6">"{t.text}"</p>
                <p className="text-stone font-bold uppercase tracking-widest text-xs">{t.author}</p>
              </div>
            ))}
          </Marquee>
        </Reveal>
      </section >

      {/* Contact Section */}
      < section id="contact" className="py-20 md:py-32 bg-forest text-warm-white" >
        <div className="container mx-auto px-6 md:px-12 max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-medium font-display mb-8">Tell us about your space.</h2>
          <p className="text-xl mb-12 opacity-80">Send us a message and we'll take it from there.</p>

          <form className="space-y-4 text-left">
            <input type="text" placeholder="Name" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50" />
            <input type="email" placeholder="Email" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50" />
            <textarea rows={4} placeholder="Your message" className="w-full p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50"></textarea>
            <button className="w-full py-4 bg-white text-forest font-bold rounded-lg hover:bg-beige transition-colors duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section >

      {/* FAQ Section */}
      < section className="py-20 md:py-32 bg-off-white" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-display text-center text-forest mb-24">Everything you need to know.</h2>
          <FAQ />
        </div>
      </section >

      {/* Footer */}
      < footer className="py-24 bg-black border-t border-white/10 text-center" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-display font-medium tracking-[0.2em] text-warm-white mb-2 inline-block">
              SCAPERS
            </h2>
            <p className="text-base mb-8 font-sans text-warm-white/60">Landscaping & Outdoor Care</p>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-stone hover:text-forest transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-stone hover:text-forest transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-stone hover:text-forest transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="border-t border-stone/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-grey">
            <p>© 2026 SCAPERS.</p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 ml-auto">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone/10 border border-stone/20">
                <span className="w-2 h-2 rounded-full bg-sage animate-pulse"></span>
                Current mood: Sunny skies, busy planting.
              </span>
            </div>
          </div>
        </div>
      </footer >
    </main >
  );
}
