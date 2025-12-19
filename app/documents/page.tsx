import DashboardShell from '@/components/layout/DashboardShell';
import { FileText, Upload } from 'lucide-react';

export default function DocumentsPage() {
    return (
        <DashboardShell role="owner">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Documents</h1>
                    <p className="text-muted-foreground mt-1">Manage property and tenant documents</p>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload Document
                </button>
            </div>

            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-dashed border-white/10 p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No documents found</h3>
                <p className="text-muted-foreground mb-6">Upload contracts, leases, or other documents</p>
                <button className="text-primary hover:text-primary/90 font-medium hover:underline">
                    View Templates →
                </button>
            </div>
        </DashboardShell>
    );
}
