import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-2xl font-bold font-heading gradient-text">Portfolio</span>
                        <p className="mt-2 text-sm text-foreground/60">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <Link href="https://github.com/esaintdev" className="text-foreground/60 hover:text-primary transition-colors">
                            GitHub
                        </Link>
                        <Link href="https://www.facebook.com/designwithesaint" className="text-foreground/60 hover:text-primary transition-colors">
                            Facebook
                        </Link>
                        <Link href="https://www.instagram.com/designwithesaint" className="text-foreground/60 hover:text-primary transition-colors">
                            Instagram
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
