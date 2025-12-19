'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
    id: string;
    role: 'tenant' | 'owner';
    firstName: string;
    lastName: string;
    email: string;
}

export function useAuth(requireRole?: 'tenant' | 'owner') {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Run on client only
        const stored = localStorage.getItem('propflow_user');
        if (stored) {
            try {
                const parsedUser = JSON.parse(stored);
                setUser(parsedUser);

                if (requireRole && parsedUser.role !== requireRole) {
                    // Redirect to their correct dashboard if accessing wrong area
                    const target = parsedUser.role === 'tenant' ? '/dashboard/tenant' : '/dashboard/owner';
                    router.replace(target);
                }
            } catch (e) {
                console.error("Failed to parse user", e);
                localStorage.removeItem('propflow_user');
                setUser(null);
            }
        } else {
            // No user found
            if (requireRole) {
                router.replace('/signup'); // redirect to login/signup
            }
        }
        setLoading(false);
    }, [requireRole, router]);

    const logout = () => {
        localStorage.removeItem('propflow_user');
        setUser(null);
        router.push('/signup');
    };

    return { user, loading, logout };
}
