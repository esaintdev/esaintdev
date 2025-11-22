"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-lg md:text-xl font-medium text-primary mb-4 tracking-wide uppercase">
                        Fullstack Developer
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight">
                        Building the <span className="gradient-text">Future</span> <br />
                        One Line at a Time.
                    </h1>
                    <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-10">
                        I craft sleek, modern, and performant web applications with a focus on user experience and clean code.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/portfolio"
                            className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2 group"
                        >
                            View My Work
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full font-medium hover:bg-white/10 transition-all"
                        >
                            Contact Me
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
