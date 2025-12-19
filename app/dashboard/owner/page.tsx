'use client';
import React, { useState } from 'react';
import DashboardShell from '@/components/layout/DashboardShell';
import { Users, Building, AlertCircle, CheckCircle, Zap, Droplets, Activity } from 'lucide-react';

export default function OwnerDashboard() {
    const [showAnomalies, setShowAnomalies] = useState(false);

    // Mock data representing utilities with potential anomalies
    const utilityData = [
        { type: 'Water', property: 'Sunset Apts', value: '4500 gal', status: 'normal', change: '+2%' },
        { type: 'Electricity', property: 'Sunset Apts', value: '1200 kWh', status: 'anomaly', change: '+45%', warning: 'Unusual spike in Unit 4B' },
        { type: 'Water', property: 'Sunrise Complex', value: '3200 gal', status: 'normal', change: '-1%' },
        { type: 'Gas', property: 'Sunrise Complex', value: '80 therms', status: 'normal', change: '+5%' },
    ];

    return (
        <DashboardShell role="owner">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Top Stats Row - High Visual Hierarchy */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Properties', value: '8', icon: Building, color: 'text-blue-400', bg: 'bg-blue-400/10', sub: 'Active Portfolios' },
                        { label: 'Active Tenants', value: '20', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10', sub: '98% Occupancy Rate' },
                        { label: 'Pending Actions', value: '3', icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-400/10', sub: 'Requires Attention' },
                        { label: 'Revenue (Month)', value: '$42,500', icon: CheckCircle, color: 'text-purple-400', bg: 'bg-purple-400/10', sub: '+4.5% vs Last Month' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-card/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                {/* <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+4.5%</span> */}
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">{stat.label}</span>
                                <span className="text-xs text-muted-foreground mt-1">{stat.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Utilities & Anomaly Tracker - NEW FEATURE */}
                    <div className="lg:col-span-2 bg-card/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <Activity className="w-5 h-5 mr-2 text-indigo-400" />
                                    Utilities Tracker
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">Monitor consumption and detect irregularities.</p>
                            </div>

                            <button
                                onClick={() => setShowAnomalies(!showAnomalies)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${showAnomalies ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'bg-white/5 text-muted-foreground hover:bg-white/10 border border-transparent'}`}
                            >
                                <Zap className={`w-4 h-4 ${showAnomalies ? 'fill-current' : ''}`} />
                                <span>Anomaly Detection: {showAnomalies ? 'ON' : 'OFF'}</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {utilityData.map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl border transition-all duration-300 ${item.status === 'anomaly' && showAnomalies ? 'bg-orange-500/5 border-orange-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-2.5 rounded-lg ${item.type === 'Water' ? 'bg-blue-500/10 text-blue-400' : item.type === 'Electricity' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                                                {item.type === 'Water' ? <Droplets className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">{item.type} <span className="text-muted-foreground font-normal mx-1">•</span> {item.property}</div>
                                                <div className="text-sm text-muted-foreground">Using {item.value}</div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className={`font-bold ${item.status === 'anomaly' && showAnomalies ? 'text-orange-400' : 'text-white'}`}>{item.change}</div>
                                            <div className="text-xs text-muted-foreground">vs last mo</div>
                                        </div>
                                    </div>

                                    {item.status === 'anomaly' && showAnomalies && (
                                        <div className="mt-3 pt-3 border-t border-orange-500/20 flex items-start text-sm text-orange-300 animate-in fade-in slide-in-from-top-1">
                                            <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                                            <span>{item.warning} - <span className="underline cursor-pointer hover:text-orange-200">Investigate</span></span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compliance / Activity Stats Side Panel */}
                    <div className="space-y-8">
                        {/* Compliance Widget */}
                        <div className="bg-card/50 backdrop-blur-md rounded-2xl border border-white/5 p-6">
                            <h3 className="text-lg font-bold text-white mb-6">Compliance Health</h3>
                            <div className="relative pt-2">
                                <div className="flex items-end space-x-2 mb-2">
                                    <span className="text-3xl font-bold text-white">92%</span>
                                    <span className="text-sm text-green-400 mb-1.5">+2%</span>
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[92%]" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-4">
                                    2 properties require attention regarding fire safety inspections.
                                </p>
                                <button className="w-full mt-4 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10">
                                    View Report
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity Mini Feed */}
                        <div className="bg-card/50 backdrop-blur-md rounded-2xl border border-white/5 p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Latest Updates</h3>
                            <div className="space-y-4">
                                <div className="flex space-x-3">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                                    <div>
                                        <p className="text-sm text-white">Maintenance request for Unit 3B completed.</p>
                                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-purple-500" />
                                    <div>
                                        <p className="text-sm text-white">Rent payment received from Tenant John Doe.</p>
                                        <span className="text-xs text-muted-foreground">5 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
