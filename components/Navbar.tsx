"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/portfolio" },
    { name: "Skills", href: "/skills" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/testimonials" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname?.startsWith(href);
    };

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "" : "bg-transparent"
            )}
            suppressHydrationWarning
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm group-hover:blur-md transition-all" />
                                <p className="text-xl md:text-2xl font-bold text-foreground font-mono">
                                    esaintdev
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Centered pill container */}
                    <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-2 py-2 flex items-center gap-1 shadow-lg">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                            active
                                                ? "bg-white text-black shadow-md"
                                                : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop Contact Button */}
                    <div className="hidden lg:block">
                        <Link
                            href="https://wa.me/2348121855275"
                            className="px-6 py-2.5 bg-white/5 border border-white/10 backdrop-blur-sm text-foreground rounded-full font-medium hover:bg-white/10 transition-all shadow-md hover:shadow-lg"
                        >
                            Contact Me
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center gap-3">
                        <Link
                            href="https://wa.me/2348121855275"
                            className="px-4 py-2 bg-white text-foreground rounded-full text-sm font-medium hover:bg-white/10 transition-all shadow-md"
                        >
                            Contact
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-white/10 focus:outline-none transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden bg-background/98 backdrop-blur-xl border-b border-white/10 shadow-xl">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {/* Mobile Navigation Links */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2 space-y-1">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={clsx(
                                            "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                                            active
                                                ? "bg-white text-foreground shadow-md"
                                                : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
