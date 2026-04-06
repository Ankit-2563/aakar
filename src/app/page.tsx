"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Basic GSAP animation block to test ScrollTrigger setup
    const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
    
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector(".content"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen">
      {/* Navigation Layer */}
      <nav className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center mix-blend-difference text-foreground">
        <div>
          <Image
            src="/assets/wordmark.svg"
            alt="Aakar Logo"
            width={120}
            height={40}
            className="invert"
            priority
          />
        </div>
        <div className="flex gap-6 text-sm uppercase tracking-widest font-secondary">
          <a href="#home" className="hover:text-brand-primary transition-colors">Home</a>
          <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
          <a href="#projects" className="hover:text-brand-primary transition-colors">Projects</a>
          <a href="#media" className="hover:text-brand-primary transition-colors">Media</a>
          <a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a>
        </div>
      </nav>

      {/* Sections */}
      <main className="flex-1">
        <section id="home" className="reveal-section min-h-screen flex items-center justify-center p-8 border-b border-brand-secondary/30">
          <div className="content max-w-4xl text-center">
            <h1 className="text-6xl md:text-8xl mb-6 text-brand-primary">Aakar</h1>
            <p className="text-xl md:text-2xl text-brand-secondary font-secondary">Premium Architecture & Design</p>
          </div>
        </section>

        <section id="about" className="reveal-section min-h-screen flex items-center justify-center p-8 bg-brand-primary text-foreground">
          <div className="content max-w-4xl text-center">
            <h2 className="text-5xl md:text-7xl mb-8">About Us</h2>
            <p className="text-lg md:text-xl font-secondary leading-relaxed">
              We shape the environment around us to inspire, innovate, and create sustainable spaces for the future.
            </p>
          </div>
        </section>

        <section id="projects" className="reveal-section min-h-screen flex items-center justify-center p-8 bg-background border-b border-brand-secondary/30">
          <div className="content max-w-4xl text-center">
            <h2 className="text-5xl md:text-7xl mb-8 text-brand-primary">Selected Projects</h2>
            <p className="text-lg md:text-xl font-secondary text-brand-secondary">
              A curated selection of our finest architectural marvels.
            </p>
          </div>
        </section>

        <section id="media" className="reveal-section min-h-screen flex items-center justify-center p-8 bg-brand-secondary text-background">
          <div className="content max-w-4xl text-center">
            <h2 className="text-5xl md:text-7xl mb-8">Media</h2>
            <p className="text-lg md:text-xl font-secondary">
              Press releases, publications, and our architectural journey.
            </p>
          </div>
        </section>

        <section id="contact" className="reveal-section min-h-screen flex items-center justify-center p-8 bg-background">
          <div className="content max-w-4xl text-center">
            <h2 className="text-5xl md:text-7xl mb-8 text-brand-primary">Get In Touch</h2>
            <p className="text-lg md:text-xl font-secondary text-brand-secondary">
              Let's build the future together.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
