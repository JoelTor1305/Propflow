'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import RoleSelector from '@/components/auth/RoleSelector';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';


import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState<'tenant' | 'owner' | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role) return;

        setIsLoading(true);

        // Simulate "instant" network request with slight delay for UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // Persist to LocalStorage (Simulate Backend)
        const userData = {
            id: crypto.randomUUID(),
            role,
            ...formData,
            createdAt: new Date().toISOString(),
        };
        localStorage.setItem('propflow_user', JSON.stringify(userData));

        // Instant Redirect
        const targetPath = role === 'tenant' ? '/dashboard/tenant' : '/dashboard/owner';
        router.push(targetPath);
    };

    return (
        <AuthLayout>
            <div className="w-full bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        Create an account
                    </h1>
                    <p className="text-muted-foreground">
                        Join PropFlow to streamline your property management.
                    </p>
                </div>

                <RoleSelector role={role} onSelect={setRole} />

                {role && (
                    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                            <Input
                                label="Last Name"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>

                        <Input
                            type="email"
                            label="Email Address"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />

                        <Input
                            type="tel"
                            label="Phone Number"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        <Input
                            type="password"
                            label="Confirm Password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-md transition-all mt-6 flex items-center justify-center",
                                isLoading && "opacity-80 cursor-not-allowed"
                            )}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                `Sign Up as ${role === 'tenant' ? 'Tenant' : 'Owner'}`
                            )}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Log in
                    </Link>
                </div>
            </div>

            {/* Feature Shuffle / Showcase Placeholder below */}
            <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Modern Security</span>
                    <span>•</span>
                    <span>Real-time Analytics</span>
                    <span>•</span>
                    <span>AI Insights</span>
                </div>
            </div>
        </AuthLayout>
    );
}
