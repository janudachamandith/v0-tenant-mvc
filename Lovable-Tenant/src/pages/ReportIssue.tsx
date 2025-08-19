import { useState } from 'react';
import { AlertCircle, Upload, CheckCircle } from 'lucide-react';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    property: '',
    category: '',
    description: '',
    priority: 'medium'
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const properties = [
    { id: 1, name: 'Oak Street Apartment' },
    { id: 2, name: 'Maple Avenue Studio' }
  ];

  const categories = [
    'Plumbing',
    'Electrical',
    'Heating/Cooling',
    'Appliances',
    'Locks/Security',
    'Pest Control',
    'Maintenance',
    'Other'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    // Simulate submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ property: '', category: '', description: '', priority: 'medium' });
      setSelectedImages([]);
    }, 2000);
  };

  if (submitStatus === 'success') {
    return (
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Report an Issue</h1>
          <p className="text-muted-foreground mt-2">Report maintenance issues with your property</p>
        </div>

        <div className="dashboard-card p-12 text-center animate-scale-in">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Issue Reported Successfully!</h3>
          <p className="text-muted-foreground mb-6">
            Your issue has been reported and assigned ticket #ISS-2024-001. We'll notify you when it's updated.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="btn-primary"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Report an Issue</h1>
        <p className="text-muted-foreground mt-2">Report maintenance issues with your property</p>
      </div>

      <div className="dashboard-card animate-slide-up">
        <div className="p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">Issue Details</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Property</label>
              <select
                value={formData.property}
                onChange={(e) => setFormData({...formData, property: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.name}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Issue Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Priority Level</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="form-input"
            >
              <option value="low">Low - Can wait a few days</option>
              <option value="medium">Medium - Within 24-48 hours</option>
              <option value="high">High - Urgent, needs immediate attention</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Please describe the issue in detail..."
              className="form-input min-h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Upload Images (Optional)</label>
            <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload images to help us understand the issue better
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="btn-secondary cursor-pointer"
              >
                Choose Images
              </label>
            </div>
            
            {selectedImages.length > 0 && (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className={`btn-primary w-full ${
              submitStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitStatus === 'submitting' ? 'Submitting...' : 'Report Issue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;