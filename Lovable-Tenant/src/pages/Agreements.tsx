import { FileText, Download, Eye, CheckCircle, Clock } from 'lucide-react';

const Agreements = () => {
  const agreements = [
    {
      id: 1,
      property: 'Oak Street Apartment',
      type: 'Rental Agreement',
      signedDate: '2024-01-01',
      expiryDate: '2024-12-31',
      status: 'verified',
      fileUrl: '#'
    },
    {
      id: 2,
      property: 'Maple Avenue Studio',
      type: 'Lease Agreement',
      signedDate: '2024-01-15',
      expiryDate: '2024-07-15',
      status: 'pending',
      fileUrl: '#'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="status-badge bg-success-light text-success">Verified</span>;
      case 'pending':
        return <span className="status-badge bg-warning-light text-warning">Pending</span>;
      default:
        return <span className="status-badge bg-muted text-muted-foreground">Unknown</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Agreements</h1>
        <p className="text-muted-foreground mt-2">View and manage your rental agreements</p>
      </div>

      <div className="dashboard-card animate-slide-up">
        <div className="p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">Your Agreements</h3>
        </div>
        
        <div className="divide-y divide-[hsl(var(--border))]">
          {agreements.map((agreement) => (
            <div key={agreement.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-light rounded-lg">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{agreement.type}</h4>
                    <p className="text-sm text-muted-foreground">{agreement.property}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-muted-foreground">
                        Signed: {new Date(agreement.signedDate).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Expires: {new Date(agreement.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(agreement.status)}
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="btn-secondary text-sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agreements;