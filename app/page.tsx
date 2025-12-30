
import Link from 'next/link';
import {
    Building2,
    ShieldCheck,
    Zap,
    MessageSquare,
    BarChart3,
    ArrowRight,
    ChevronRight,
    Search,
    CheckCircle2,
    LineChart,
    Bell
} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-blue-500/30 font-sans overflow-x-hidden">
            {/* Atmospheric Glow Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Propflow <span className="text-blue-500">AI</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
                        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                        <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
                        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:text-white transition-colors px-4 py-2">
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative pt-32">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold tracking-widest uppercase mb-8 animate-fade-in">
                        <Zap className="w-3 h-3 fill-current" />
                        Next Gen Property Management
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05] drop-shadow-sm">
                        AI-Powered <br className="hidden md:block" />
                        Property <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Intelligence</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
                        Automate tenant communications, detect utility anomalies, and stay compliant with our state-of-the-art AI platform built for modern property owners.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link
                            href="/signup"
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 group"
                        >
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white text-lg font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                            Watch Demo
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-1" />
                        </button>
                    </div>

                    {/* Hero Preview Image / Mockup */}
                    <div className="relative max-w-5xl mx-auto border border-white/10 rounded-[2rem] overflow-hidden bg-[#0a0f1e] shadow-2xl p-4">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
                        <div className="aspect-[16/10] bg-[#0f172a] rounded-[1.5rem] flex flex-col">
                            {/* Mockup Header */}
                            <div className="h-12 border-b border-white/5 flex items-center px-6 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                </div>
                            </div>
                            {/* Mockup Content */}
                            <div className="flex-1 p-8 grid grid-cols-3 gap-6 opacity-40">
                                <div className="col-span-2 space-y-6">
                                    <div className="h-40 bg-white/5 rounded-2xl" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="h-32 bg-white/5 rounded-2xl" />
                                        <div className="h-32 bg-white/5 rounded-2xl" />
                                    </div>
                                </div>
                                <div className="h-full bg-white/5 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Bento Grid */}
                <section id="features" className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Powerful Features</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">Everything you need to manage your portfolio at scale, without the manual overhead.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Feature 1 */}
                        <div className="md:col-span-2 group relative p-1 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-blue-500/10">
                            <div className="relative p-10 h-full flex flex-col">
                                <div className="w-14 h-14 bg-blue-600/20 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <LineChart className="w-7 h-7 text-blue-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Anomaly Detection</h3>
                                <p className="text-slate-400 mb-8 max-w-md">Our AI monitors utility consumption 24/7, spotting leaks and electrical faults before they become expensive problems.</p>
                                <div className="mt-auto pt-4 flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all cursor-pointer">
                                    Explore Metrics <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                            {/* Visual decor */}
                            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative p-1 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-sm hover:shadow-indigo-500/10">
                            <div className="relative p-10 h-full flex flex-col">
                                <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <MessageSquare className="w-7 h-7 text-indigo-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Smart Messaging</h3>
                                <p className="text-slate-400">Automated, context-aware responses to tenant inquiries across SMS and email.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative p-1 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-emerald-500/10">
                            <div className="relative p-10 h-full flex flex-col">
                                <div className="w-14 h-14 bg-emerald-600/20 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <ShieldCheck className="w-7 h-7 text-emerald-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Compliance Guard</h3>
                                <p className="text-slate-400">Keep track of certifications, safety checks, and regulatory requirements automatically.</p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="md:col-span-2 group relative p-1 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden hover:border-amber-500/30 transition-all duration-500 shadow-sm hover:shadow-amber-500/10">
                            <div className="relative p-10 h-full flex flex-col">
                                <div className="w-14 h-14 bg-amber-600/20 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <Bell className="w-7 h-7 text-amber-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Urgent Alerts</h3>
                                <p className="text-slate-400 mb-8 max-w-sm">Receive instant notifications for non-payment, maintenance issues, or lease expirations tailored to your urgency settings.</p>
                                <div className="mt-auto pt-4 flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-3 transition-all cursor-pointer">
                                    Setup Alerts <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-24 overflow-hidden text-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to transform your <br /> property management?</h2>
                            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Join hundreds of property owners who have automated their workflow with Propflow AI.</p>
                            <Link
                                href="/signup"
                                className="inline-flex bg-white text-blue-600 text-xl font-bold px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20"
                            >
                                Start Your Free Trial
                            </Link>
                        </div>
                        {/* Visual Glow */}
                        <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[120%] bg-white/10 rotate-12 blur-[100px]" />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-24 bg-[#020617]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold">Propflow</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Redefining property management through advanced AI and machine learning.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-slate-400 hover:text-white">
                                <span className="sr-only">Twitter</span>
                                𝕏
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-slate-400 hover:text-white">
                                in
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">API</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Docs</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-600">© 2025 Propflow AI. All rights reserved.</p>
                    <div className="flex gap-8 text-xs text-slate-600">
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            All Systems Operational
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
