'use client';
import React, { useEffect, useState } from 'react';

export default function ReactiveBackground() {
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
        <div
            className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
            style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.10), transparent 80%)`,
            }}
        />
    );
}
