'use client';
import React from 'react';
import DashboardShell from '@/components/layout/DashboardShell';

import { FileText } from 'lucide-react';

export default function TenantDashboard() {
    return (
        <DashboardShell role="tenant">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="md:col-span-2 space-y-6">
                    {/* Welcome Card */}
                    <div className="bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-2xl p-6 border border-primary/20">
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, John!</h1>
                        <p className="text-muted-foreground">Here&apos;s a summary of your rental status and upcoming events.</p>
                    </div>

                    {/* Missing Lease Alert */}
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-start gap-4">
                        <div className="bg-orange-500/20 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-orange-200">Lease Agreement Missing</h3>
                            <p className="text-xs text-orange-200/70 mt-1">
                                Please upload your signed lease agreement to complete your tenant profile.
                            </p>
                            <button className="mt-3 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600 transition-colors font-medium">
                                Upload Lease
                            </button>
                        </div>
                    </div>

                    {/* Rent Status */}
                    <div className="bg-card rounded-xl p-6 border border-white/5 shadow-sm">
                        <h3 className="text-lg font-semibold text-white mb-4">Current Lease</h3>
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <div>
                                <div className="text-sm text-muted-foreground">Property</div>
                                <div className="font-medium text-foreground">Sunset Apartments, Unit 4B</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-muted-foreground">Monthly Rent</div>
                                <div className="font-bold text-2xl text-white">$2,400</div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-sm text-green-400 font-medium">Payment Current</span>
                            </div>
                            <button className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                                Pay Rent
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-card rounded-xl p-6 border border-white/5">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                                Request Maintenance
                            </button>
                            <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                                View Documents
                            </button>
                            <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                                Contact Property Manager
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
