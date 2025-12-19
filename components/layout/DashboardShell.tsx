'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserDropdown from './UserDropdown';
import { LayoutDashboard, Building2, Users, FileText, Settings, Bell, MessageSquare, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard Shadcn utils location.

interface DashboardShellProps {
    children: React.ReactNode;
    role?: 'tenant' | 'owner'; // to customize sidebar links
}

import Image from 'next/image';
import ReactiveBackground from '@/components/ui/ReactiveBackground';
import { useAuth } from '@/hooks/useAuth';
// ... other imports

export default function DashboardShell({ children, role = 'owner' }: DashboardShellProps) {
    const pathname = usePathname();
    const { user, loading } = useAuth(role);

    if (loading || !user) return null;

    const links = [
        { href: role === 'tenant' ? '/dashboard/tenant' : '/dashboard/owner', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/properties', label: 'Properties', icon: Building2 },
        { href: '/tenants', label: 'Tenants', icon: Users },
        { href: '/communications', label: 'Communications', icon: MessageSquare },
        { href: '/compliance', label: 'Compliance', icon: AlertCircle },
        { href: '/documents', label: 'Documents', icon: FileText },
        { href: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-background flex text-foreground relative overflow-hidden">
            <ReactiveBackground />
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/30 backdrop-blur-xl hidden md:flex flex-col fixed inset-y-0 z-30">
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <div className="relative h-8 w-8 mr-3">
                        <Image
                            src="/logo.png"
                            alt="PropFlow AI Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">PropFlow AI</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <Icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                {/* Top Header */}
                <header className="h-16 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                        {role === 'owner' ? 'Owner Dashboard' : 'Tenant Portal'}
                    </h2>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
                        </button>
                        <div className="h-6 w-px bg-white/10 mx-2" />
                        <UserDropdown />
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
