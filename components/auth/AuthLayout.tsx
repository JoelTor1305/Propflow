'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground flex items-center justify-center">
            {/* Reactive Background Gradient */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
                }}
            />

            {/* Fixed Branding */}
            <div className="absolute top-6 left-6 z-20 flex items-center space-x-2">
                <div className="relative h-8 w-8 mr-1">
                    <Image
                        src="/logo.png"
                        alt="PropFlow AI Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">PropFlow AI</span>
            </div>

            <div className="relative z-10 w-full max-w-md px-4">
                {children}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl opacity-50" />
        </div>
    );
}
