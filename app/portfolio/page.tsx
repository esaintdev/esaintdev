"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    demoUrl?: string;
    repoUrl?: string;
    techStack: string;
}

export default function Portfolio() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setProjects(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section id="portfolio" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                        A collection of projects that demonstrate my skills and passion for development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="aspect-video bg-gray-800 relative overflow-hidden">
                                {/* Placeholder or Image */}
                                {project.imageUrl ? (
                                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-white/20">
                                        <span className="text-4xl font-bold">{project.title[0]}</span>
                                    </div>
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    {project.demoUrl && (
                                        <Link href={project.demoUrl} target="_blank" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                            <ExternalLink size={20} />
                                        </Link>
                                    )}
                                    {project.repoUrl && (
                                        <Link href={project.repoUrl} target="_blank" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                            <Github size={20} />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.split(',').map((tech) => (
                                        <span key={tech} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {projects.length === 0 && (
                        <div className="col-span-full text-center text-foreground/40 py-10">
                            Loading projects...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
