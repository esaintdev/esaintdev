"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Cpu,
    MessageSquare,
    User,
    LogOut,
    Quote
} from "lucide-react";
import clsx from "clsx";
import SessionProvider from "@/components/SessionProvider";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "unauthenticated" && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [status, router, pathname]);

    // If on login page, render without authentication checks
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!session) {
        return null;
    }

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Projects", href: "/admin/projects", icon: Briefcase },
        { name: "Blog", href: "/admin/blog", icon: FileText },
        { name: "Skills", href: "/admin/skills", icon: Cpu },
        { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
        { name: "Profile", href: "/admin/profile", icon: User },
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-background/50 backdrop-blur-xl fixed h-full z-20 hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold font-heading gradient-text">Admin Panel</h1>
                </div>
                <nav className="px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}
