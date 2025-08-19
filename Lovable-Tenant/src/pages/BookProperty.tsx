import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const BookProperty = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const reservedProperties = [
    {
      id: 1,
      title: 'Oak Street Apartment',
      location: 'Downtown',
      price: 1200,
      reservedAt: '2024-01-15',
      status: 'waiting_verification',
      expiresAt: '2024-01-17'
    },
    {
      id: 2,
      title: 'Maple Avenue Studio',
      location: 'Midtown',
      price: 800,
      reservedAt: '2024-01-10',
      status: 'booked',
      expiresAt: null
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    
    setUploadStatus('uploading');
    
    // Simulate upload
    setTimeout(() => {
      setUploadStatus('success');
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting_verification':
        return <span className="status-badge bg-warning-light text-warning">Waiting for Verification</span>;
      case 'booked':
        return <span className="status-badge bg-success-light text-success">Booked</span>;
      case 'rejected':
        return <span className="status-badge bg-destructive text-destructive-foreground">Rejected</span>;
      default:
        return <span className="status-badge bg-muted text-muted-foreground">Unknown</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Book Property</h1>
        <p className="text-muted-foreground mt-2">Complete your rental agreement</p>
      </div>

      {/* Reserved Properties */}
      <div className="dashboard-card animate-slide-up">
        <div className="p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">Reserved Properties</h3>
        </div>
        
        <div className="divide-y divide-[hsl(var(--border))]">
          {reservedProperties.map((property) => (
            <div key={property.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{property.title}</h4>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                  <p className="text-lg font-bold text-primary mt-1">${property.price}/mo</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reserved on: {new Date(property.reservedAt).toLocaleDateString()}
                  </p>
                  {property.expiresAt && (
                    <p className="text-sm text-warning mt-1">
                      Expires: {new Date(property.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="ml-4">
                  {getStatusBadge(property.status)}
                </div>
              </div>
              
              {property.status === 'waiting_verification' && (
                <div className="mt-4 space-y-4">
                  <div className="bg-info-light p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-info mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-info">Upload Required</p>
                        <p className="text-sm text-foreground mt-1">
                          Please upload your signed lease agreement to complete the booking.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* File Upload */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-foreground">
                      Upload Signed Agreement
                    </label>
                    <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Choose a file or drag it here</p>
                        <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX files only</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="btn-secondary inline-block mt-4 cursor-pointer"
                      >
                        Browse Files
                      </label>
                    </div>
                    
                    {selectedFile && (
                      <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{selectedFile.name}</span>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedFile || uploadStatus === 'uploading'}
                      className={`btn-primary w-full ${
                        !selectedFile || uploadStatus === 'uploading' 
                          ? 'opacity-50 cursor-not-allowed' 
                          : ''
                      }`}
                    >
                      {uploadStatus === 'uploading' ? 'Uploading...' : 'Submit Agreement'}
                    </button>
                    
                    {uploadStatus === 'success' && (
                      <div className="bg-success-light p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <p className="text-sm font-medium text-success">
                            Agreement uploaded successfully! We'll review it within 24 hours.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookProperty;