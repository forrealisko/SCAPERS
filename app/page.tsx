"use client";

import { useState, useLayoutEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ServiceCard from "./components/ServiceCard";
import Image from "next/image";
import Gallery from "./components/Gallery";
import Reveal from "./components/Reveal";
import Marquee from "react-fast-marquee";
import { Scissors, Leaf, Flower2, Sparkles, Hammer, Instagram, Facebook, Linkedin } from "lucide-react";
import BookingModal from "./components/BookingModal";
import FloatingCTA from "./components/FloatingCTA";

const services = [
  {
    title: "Lawn care & maintenance",
    description: "Regular mowing, edging, and care that keeps your lawn healthy and green all season.",
    icon: <Scissors className="w-full h-full" strokeWidth={1.5} />,
    pricing: "From $150/mo",
    details: ["Weekly mowing & edging", "Fertilization program", "Weed control", "Aeration once/year"]
  },
  {
    title: "Garden design & planting",
    description: "Custom layouts with plants that thrive. We create spaces that feel balanced and natural.",
    icon: <Flower2 className="w-full h-full" strokeWidth={1.5} />,
    pricing: "Custom Quote",
    details: ["3D rendering included", "Native plant selection", "Soil preparation", "Maintenance plan"]
  },
  {
    title: "Hedge trimming & shaping",
    description: "Precise cutting and shaping for clean lines and healthy growth.",
    icon: <Scissors className="w-full h-full" strokeWidth={1.5} />,
    pricing: "From $200",
    details: ["Geometric shaping", "Health pruning", "Debris removal", "Height reduction"]
  },
  {
    title: "Seasonal cleanup",
    description: "Spring prep and fall cleanup. We handle debris, mulching, and seasonal transitions.",
    icon: <Leaf className="w-full h-full" strokeWidth={1.5} />,
    pricing: "From $400",
    details: ["Leaf removal", "Mulch application", "Plant splitting", "Winter protection"]
  },
  {
    title: "Outdoor upgrades",
    description: "Pathways, stone features, lighting. We enhance your space with lasting improvements.",
    icon: <Hammer className="w-full h-full" strokeWidth={1.5} />,
    pricing: "Custom Quote",
    details: ["Stone pathways", "Low-voltage lighting", "Retaining walls", "Fire pits"]
  },
  {
    title: "Irrigation & drainage",
    description: "Smart watering systems and proper drainage solutions. Keep your landscape healthy year-round.",
    icon: <Sparkles className="w-full h-full" strokeWidth={1.5} />,
    pricing: "From $350",
    details: ["Drip irrigation", "Smart controllers", "French drains", "System audit"]
  },
];

const testimonials = [
  {
    text: "They transformed our yard and it didn't even feel like work was being done. Super chill, super professional.",
    author: "- Sarah, Pacific Heights"
  },
  {
    text: "Our backyard was basically a dirt patch with some weeds. Now? It's where we spend every weekend. They killed it.",
    author: "- Mike, Noe Valley"
  },
  {
    text: "Clean, professional, and always on time. Our yard has never looked better.",
    author: "- David, Marina District"
  },
  {
    text: "Best landscaping decision we made.",
    author: "- Jen, Richmond"
  },
  {
    text: "i was skeptical at first but wow... the difference is night and day. they really know what they're doing. highly recommend",
    author: "- Alex, Mission District"
  },
  {
    text: "Finally, a landscaping company that actually listens. No upselling, no BS. Just great work.",
    author: "- Rachel, Sunset"
  },
  {
    text: "Our neighbors keep asking who did our yard. That's all you need to know.",
    author: "- Tom, Presidio Heights"
  },
  {
    text: "Been using them for 2 years now. Consistent quality, fair pricing, zero drama. Can't ask for more than that.",
    author: "- James, Castro"
  },
  {
    text: "They made our backyard feel like a sanctuary. We actually use our outdoor space now!",
    author: "- Amanda, Cole Valley"
  }
];

const steps = [
  {
    title: "You reach out",
    description: "Send us a message or call. Tell us about your space and what you need.",
  },
  {
    title: "We visit & assess",
    description: "We come to you, look at your outdoor space, and discuss your vision.",
  },
  {
    title: "We take care of the rest",
    description: "From design to maintenance, we handle it all. You just enjoy the results.",
  },
];

import FAQ from "./components/FAQ";

export default function Home() {
  // Scroll Fix
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroTextX = useTransform(scrollY, [0, 500], [0, -200]); // Moves left as you scroll down
  const galleryTextX = useTransform(scrollY, [600, 1100], [200, 0]); // Moves from right to center

  return (
    <main className="w-full relative bg-warm-white">
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} service={null} />
      <FloatingCTA onBookClick={() => setIsBookingOpen(true)} />
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex flex-col justify-center items-center overflow-hidden select-none">
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
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-warm-white px-4 max-w-5xl w-full">
          {/* Scroll Animated Header */}
          <motion.div style={{ x: heroTextX }} className="mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-8 leading-[1.1]">
              From not the best <br />
              to <span className="font-bold">effortless.</span>
            </h1>
          </motion.div>

          <Reveal delay={0.4} className="mx-auto">
            <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium opacity-95 text-balance">
              We design, remove and give life to outdoor spaces that feel
              clean, and cared for.
            </p>
          </Reveal>

          <Reveal delay={0.6} className="mx-auto">
            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-beige text-forest px-9 py-4 rounded-lg font-bold text-base hover:scale-[1.02] hover:bg-white transition-all duration-300 shadow-lg"
              >
                BOOK NOW
              </button>
            </div>
          </Reveal>
        </div>
      </section >

      {/* Gallery Section */}
      < section className="py-32 bg-beige border-b border-stone/10" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center mb-16">
          <Reveal className="mx-auto">
            <motion.h2 style={{ x: galleryTextX }} className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 font-display">
              <span className="font-medium">Same spaces,</span>{' '}
              <span className="italic font-normal text-forest">
                different feeling.
              </span>
            </motion.h2>
            <div className="w-24 h-px bg-stone/20 mx-auto mt-8" />
          </Reveal>
        </div>
        <Gallery />
      </section >

      {/* Services Section */}
      < section id="services" className="py-32 bg-white relative" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-display tracking-tight text-forest mb-24 uppercase tracking-widest">
            Our services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      < section className="py-32 bg-forest text-warm-white" >
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
      < section className="py-32 bg-beige overflow-hidden" >
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
      < section id="contact" className="py-32 bg-forest text-warm-white" >
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
      < section className="py-32 bg-warm-white" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-display text-center text-forest mb-24">Everything you need to know.</h2>
          <FAQ />
        </div>
      </section >

      {/* Footer */}
      < footer className="py-24 bg-beige border-t border-stone/10 text-center" >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-display font-medium tracking-[0.2em] text-forest mb-2 inline-block">
              SCAPERS
            </h2>
            <p className="text-base mb-8 font-sans text-forest/60">Landscaping & Outdoor Care</p>

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
                Current mood: Foggy mornings, busy planting.
              </span>
            </div>
          </div>
        </div>
      </footer >
    </main >
  );
}
