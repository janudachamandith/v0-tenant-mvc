import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, property }) => {
  const [step, setStep] = useState<'confirm' | 'success'>('confirm');

  if (!isOpen || !property) return null;

  const handleConfirm = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
      setStep('confirm');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-modal max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">
            {step === 'confirm' ? 'Confirm Reservation' : 'Reservation Confirmed'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[hsl(var(--sidebar-hover))] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'confirm' ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{property.title}</h4>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                  <p className="text-lg font-bold text-primary">${property.price}/mo</p>
                </div>
              </div>

              <div className="bg-warning-light p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-warning">Reservation Terms</p>
                    <p className="text-sm text-foreground mt-1">
                      Your reservation will be held for 48 hours. Please visit our office to complete the rental agreement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="btn-primary flex-1"
                >
                  Confirm Reservation
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-success-foreground" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Reservation Confirmed!</h4>
              <p className="text-muted-foreground">
                Your reservation for <strong>{property.title}</strong> is confirmed for 48 hours. 
                Please visit our office to complete the agreement.
              </p>
              <div className="bg-success-light p-4 rounded-lg">
                <p className="text-sm font-medium text-success">Next Steps:</p>
                <ul className="text-sm text-foreground mt-1 space-y-1">
                  <li>• Visit our office within 48 hours</li>
                  <li>• Bring required documents</li>
                  <li>• Complete rental agreement</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};