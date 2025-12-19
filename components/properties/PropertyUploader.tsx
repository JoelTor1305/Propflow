'use client';

import React, { useCallback, useState } from 'react';
import { FileText, CheckCircle, Loader2, ArrowRight, Building, User } from 'lucide-react';
import { IngestionDocumentType, ExtractedPropertyData } from '@/lib/ai/ingestion';

interface PropertyUploaderProps {
    onAnalysisComplete: (data: ExtractedPropertyData) => void;
}

type Step = 'upload-deed' | 'analyzing-deed' | 'review-deed' | 'occupancy-check' | 'upload-lease' | 'analyzing-lease' | 'review-lease';

export default function PropertyUploader({ onAnalysisComplete }: PropertyUploaderProps) {
    const [step, setStep] = useState<Step>('upload-deed');
    const [dragActive, setDragActive] = useState(false);
    const [combinedData, setCombinedData] = useState<ExtractedPropertyData>({ confidence: 0 });

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const processFile = async (file: File, docType: IngestionDocumentType) => {
        const nextStep = docType === 'deed' ? 'analyzing-deed' : 'analyzing-lease';
        setStep(nextStep);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('documentType', docType);

            const response = await fetch('/api/properties/parse', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error);

            // Merge new data with existing data
            const newData = { ...combinedData, ...result.extractedData };
            setCombinedData(newData);

            if (docType === 'deed') {
                setStep('review-deed');
            } else {
                setStep('review-lease');
            }
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Failed to analyze document. Please try again.');
            setStep(docType === 'deed' ? 'upload-deed' : 'upload-lease');
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const docType = step === 'upload-lease' ? 'lease' : 'deed';
            processFile(e.dataTransfer.files[0], docType);
        }
    }, [step, combinedData]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const docType = step === 'upload-lease' ? 'lease' : 'deed';
            processFile(e.target.files[0], docType);
        }
    }, [step, combinedData]);

    const renderUploadZone = (title: string, subtitle: string, icon: React.ReactNode) => (
        <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center ${dragActive
                ? 'border-primary bg-primary/10 scale-[1.02]'
                : 'border-white/10 hover:border-white/20 bg-card/30 backdrop-blur-sm'
                }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
            />
            <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
                <div className="bg-card p-4 rounded-full shadow-sm border border-white/10">
                    {icon}
                </div>
                <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: subtitle }} />
                </div>
                <p className="text-xs text-muted-foreground/60 pt-2">
                    Supports PDF, JPG, PNG up to 10MB
                </p>
            </div>
        </div>
    );

    const renderLoading = (message: string) => (
        <div className="text-center py-12">
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-card p-4 rounded-full shadow-sm border border-white/10 mb-4">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            </div>
            <h3 className="font-semibold text-foreground">{message}</h3>
            <p className="text-sm text-muted-foreground mt-1">Using AI to extract details...</p>
        </div>
    );

    const renderReviewField = (label: string, value: string | undefined, onChange: (val: string) => void) => (
        <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none transition-all"
            />
        </div>
    );

    // STEP 1: Upload Deed
    if (step === 'upload-deed') {
        return (
            <div className="w-full max-w-xl mx-auto">
                {renderUploadZone(
                    "Upload Property Deed",
                    "Drag & drop your <strong>Property Deed</strong> to verify ownership.",
                    <Building className="w-8 h-8 text-muted-foreground" />
                )}
            </div>
        );
    }

    // STEP 2: Analyzing Deed
    if (step === 'analyzing-deed') {
        return renderLoading("Analyzing Property Deed");
    }

    // STEP 3: Review Deed Data
    if (step === 'review-deed') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                        <h4 className="text-sm font-semibold text-green-400">Deed Analyzed Successfully</h4>
                        <p className="text-xs text-green-400/80">Please verify the extracted information below.</p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {renderReviewField("Owner Name", combinedData.ownerName, (val) => setCombinedData({ ...combinedData, ownerName: val }))}
                    {renderReviewField("Property Address", combinedData.propertyAddress, (val) => setCombinedData({ ...combinedData, propertyAddress: val }))}
                    {renderReviewField("Legal Description", combinedData.legalDescription, (val) => setCombinedData({ ...combinedData, legalDescription: val }))}
                </div>

                <button
                    onClick={() => setStep('occupancy-check')}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                    Confirm & Continue <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        );
    }

    // STEP 4: Occupancy Check
    if (step === 'occupancy-check') {
        return (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="bg-card/30 p-8 rounded-xl border border-white/5">
                    <User className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground">Is this property currently rented?</h3>
                    <p className="text-muted-foreground mt-2 mb-8">
                        If yes, we'll need to upload the Lease Agreement to import tenant details.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => onAnalysisComplete(combinedData)}
                            className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-left group"
                        >
                            <span className="block font-semibold text-foreground mb-1 group-hover:text-primary">No, it&apos;s vacant</span>
                            <span className="text-xs text-muted-foreground">Skip tenant setup for now.</span>
                        </button>
                        <button
                            onClick={() => setStep('upload-lease')}
                            className="p-4 border border-primary/50 bg-primary/5 rounded-xl hover:bg-primary/10 transition-all text-left"
                        >
                            <span className="block font-semibold text-primary mb-1">Yes, it&apos;s occupied</span>
                            <span className="text-xs text-muted-foreground">Upload lease next.</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // STEP 5: Upload Lease
    if (step === 'upload-lease') {
        return (
            <div className="w-full max-w-xl mx-auto animate-in fade-in">
                {renderUploadZone(
                    "Upload Lease Agreement",
                    "Drag & drop the current <strong>Lease Agreement</strong>.",
                    <FileText className="w-8 h-8 text-muted-foreground" />
                )}
                <button
                    onClick={() => onAnalysisComplete(combinedData)}
                    className="w-full mt-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    Skip this step
                </button>
            </div>
        );
    }

    // STEP 6: Analyzing Lease
    if (step === 'analyzing-lease') {
        return renderLoading("Analyzing Lease Agreement");
    }

    // STEP 7: Review Lease Data
    if (step === 'review-lease') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                        <h4 className="text-sm font-semibold text-green-400">Lease Analyzed Successfully</h4>
                        <p className="text-xs text-green-400/80">Tenant details extracted.</p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {renderReviewField("Tenant Name", combinedData.tenantName, (val) => setCombinedData({ ...combinedData, tenantName: val }))}
                    <div className="grid grid-cols-2 gap-4">
                        {renderReviewField("Monthly Rent", combinedData.monthlyRent?.toString(), (val) => setCombinedData({ ...combinedData, monthlyRent: parseFloat(val) }))}
                        {renderReviewField("Lease End Date", combinedData.leaseEndDate, (val) => setCombinedData({ ...combinedData, leaseEndDate: val }))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setStep('upload-lease')}
                        className="flex-1 py-3 border border-white/10 rounded-lg text-muted-foreground hover:bg-white/5 transition-all"
                    >
                        Re-upload
                    </button>
                    <button
                        onClick={() => onAnalysisComplete(combinedData)}
                        className="flex-[2] bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
                    >
                        Finish & Save Property
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
