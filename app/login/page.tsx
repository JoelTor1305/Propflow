'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', formData);
        // In real app, call API
    };

    return (
        <AuthLayout>
            <div className="w-full bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        Welcome back
                    </h1>
                    <p className="text-muted-foreground">
                        Enter your credentials to access your dashboard.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
                            <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                        </div>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="mt-0" // override input's default mt if needed, but Input has its own label logic so maybe I should not duplicate label.
                        // Actually my Input component has a label prop. If I provide it, it renders it. 
                        // Here I am rendering a custom label layout for the "Forgot Password" link. 
                        // So I will NOT pass the label prop to Input, and keep my custom label above.
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-md transition-colors mt-6"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Don&apos;t have an account? </span>
                    <Link href="/signup" className="text-primary hover:underline font-medium">
                        Sign up
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
