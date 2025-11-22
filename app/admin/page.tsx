"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Mail, FileText, Briefcase } from "lucide-react";

interface DashboardStats {
    totalProjects: number;
    totalBlogPosts: number;
    unreadMessages: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalProjects: 0,
        totalBlogPosts: 0,
        unreadMessages: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const res = await fetch("/api/dashboard/stats");
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold font-heading mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-foreground/60 mb-2">Total Projects</h3>
                    {isLoading ? (
                        <div className="h-12 w-20 bg-white/10 rounded animate-pulse" />
                    ) : (
                        <p className="text-4xl font-bold text-primary">{stats.totalProjects}</p>
                    )}
                </div>
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-foreground/60 mb-2">Blog Posts</h3>
                    {isLoading ? (
                        <div className="h-12 w-20 bg-white/10 rounded animate-pulse" />
                    ) : (
                        <p className="text-4xl font-bold text-secondary">{stats.totalBlogPosts}</p>
                    )}
                </div>
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-foreground/60 mb-2">Unread Messages</h3>
                    {isLoading ? (
                        <div className="h-12 w-20 bg-white/10 rounded animate-pulse" />
                    ) : (
                        <p className="text-4xl font-bold text-accent">{stats.unreadMessages}</p>
                    )}
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/admin/projects/new"
                        className="glass-panel p-6 rounded-xl hover:border-primary/30 transition-colors group"
                    >
                        <Briefcase className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold mb-1">New Project</h3>
                        <p className="text-sm text-foreground/60">Add a new project</p>
                    </Link>
                    <Link
                        href="/admin/blog/new"
                        className="glass-panel p-6 rounded-xl hover:border-secondary/30 transition-colors group"
                    >
                        <FileText className="w-8 h-8 text-secondary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold mb-1">New Blog Post</h3>
                        <p className="text-sm text-foreground/60">Create a new post</p>
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="glass-panel p-6 rounded-xl hover:border-accent/30 transition-colors group relative"
                    >
                        {stats.unreadMessages > 0 && (
                            <span className="absolute top-2 right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {stats.unreadMessages > 9 ? "9+" : stats.unreadMessages}
                            </span>
                        )}
                        <Mail className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold mb-1">Messages</h3>
                        <p className="text-sm text-foreground/60">View all messages</p>
                    </Link>
                    <Link
                        href="/admin/skills/new"
                        className="glass-panel p-6 rounded-xl hover:border-primary/30 transition-colors group"
                    >
                        <Plus className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold mb-1">New Skill</h3>
                        <p className="text-sm text-foreground/60">Add a skill</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
