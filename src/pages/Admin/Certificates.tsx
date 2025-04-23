
import React, { useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import CertificateForm from '../../components/Admin/CertificateForm';
import useProjectStore from '@/store/projectStore';
import { Award, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Certificate } from '@/types';

const Certificates = () => {
  const { certificates, deleteCertificate } = useProjectStore();
  const { toast } = useToast();
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}" certificate?`)) {
      deleteCertificate(id);
      toast({
        title: "Certificate deleted",
        description: `The certificate has been removed successfully.`,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Certificates</h1>
        <p className="text-muted-foreground">Manage your certificates and credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CertificateForm />

        <div className="glass-card p-6">
          <div className="flex items-center mb-6">
            <Award className="text-brand-purple mr-3" size={24} />
            <h3 className="text-2xl font-bold">Your Certificates ({certificates.length})</h3>
          </div>

          <div className="space-y-4">
            {certificates.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No certificates yet. Add your first certificate!
              </div>
            ) : (
              certificates.map(certificate => (
                <div 
                  key={certificate.id}
                  className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0 mr-4">
                      <img 
                        src={certificate.imageUrl} 
                        alt={certificate.title}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-lg">{certificate.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {certificate.organization} • {certificate.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleDelete(certificate.id, certificate.title)}
                      className="p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete Certificate"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Certificates;
