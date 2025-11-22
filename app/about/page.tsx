"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image/Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-secondary rounded-2xl rotate-6 opacity-20 blur-lg" />
                            <div className="relative h-full w-full bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
                                {/* Placeholder for profile image - using a gradient div for now if no image */}
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white/20">
                                    <span className="text-6xl font-bold">Me</span>
                                </div>
                                {/* <Image src="/profile.jpg" alt="Profile" fill className="object-cover" /> */}
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                            I'm a passionate Fullstack Developer with a knack for creating seamless digital experiences. With expertise in modern web technologies like Next.js, React, and Node.js, I bridge the gap between design and engineering.
                        </p>
                        <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                            When I'm not coding, you can find me exploring new tech trends, contributing to open source, or enjoying a good cup of coffee. I believe in continuous learning and pushing the boundaries of what's possible on the web.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="glass-panel p-4 rounded-xl">
                                <h3 className="text-2xl font-bold text-primary mb-1">5+</h3>
                                <p className="text-sm text-foreground/60">Years Experience</p>
                            </div>
                            <div className="glass-panel p-4 rounded-xl">
                                <h3 className="text-2xl font-bold text-secondary mb-1">50+</h3>
                                <p className="text-sm text-foreground/60">Projects Completed</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
