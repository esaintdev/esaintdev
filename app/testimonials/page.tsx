"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    avatarUrl?: string;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch("/api/testimonials")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setTestimonials(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        Client <span className="gradient-text">Stories</span>
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        Don't just take my word for it. Here's what others have to say about working with me.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-8 rounded-2xl relative"
                        >
                            <Quote className="absolute top-6 right-6 text-primary/20 w-10 h-10" />
                            <p className="text-foreground/80 mb-6 relative z-10 italic">"{testimonial.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                                    {testimonial.avatarUrl ? (
                                        <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-full h-full object-cover" />
                                    ) : (
                                        testimonial.name[0]
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold">{testimonial.name}</h4>
                                    <p className="text-sm text-foreground/60">
                                        {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {testimonials.length === 0 && (
                        <div className="col-span-full text-center text-foreground/40 py-10">
                            No testimonials yet.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
