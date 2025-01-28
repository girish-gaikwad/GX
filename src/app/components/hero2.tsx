"use client";
import { Globe } from "@/components/globe";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SpotlightHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative justify-center items-center overflow-hidden">
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      <section className="max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >
          <span className="w-fit h-full text-sm bg-card px-2 py-1 border border-border rounded-full relative">
            version 0.1.5V
          </span>
          <h1 className="text-4xl font-medium tracking-tighter mx-auto md:text-6xl text-pretty bg-gradient-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">
            Reliable Solutions for Regulatory and Trade Compliance
          </h1>
          <p className="max-w-2xl text-lg mx-auto text-muted-foreground text-balance relative">
            Uniting compliance teams across export, supply chain, finance, IT, legal, sales, R&D, and more.
          </p>

          <div className="h-60  md:h-[450px]   flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
            <Globe className=" " />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="items-center top-48 absolute justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
          >
            <button className="px-6 py-3  rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors relative">
              Join Now
            </button>
          </motion.div>
          </div>
          
        </motion.div>
      </section>

      {/* Background gradient effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none"
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-blue-500/20 blur-[100px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg] [will-change:transform]" />
        </div>
      </motion.div>

      {/* Additional ambient light */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-950/30 pointer-events-none" />
    </div>
  );
}