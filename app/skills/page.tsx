"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Skill {
    id: string;
    name: string;
    proficiency: number;
    category?: string;
}

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        fetch("/api/skills")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setSkills(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section id="skills" className="py-24 bg-background/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        A showcase of my technical expertise and the tools I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-6 rounded-xl hover:border-primary/30 transition-colors"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">{skill.name}</h3>
                                <span className="text-sm font-medium text-primary">{skill.proficiency}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.proficiency}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </motion.div>
                    ))}

                    {skills.length === 0 && (
                        <div className="col-span-full text-center text-foreground/40 py-10">
                            Loading skills...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
