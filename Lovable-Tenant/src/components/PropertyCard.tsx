import { MapPin, Home, Users, CheckCircle, Clock } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    type: string;
    price: number;
    availability: string;
    image: string;
    features: string[];
  };
  onReserve: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onReserve }) => {
  const getStatusBadge = () => {
    switch (property.availability) {
      case 'available':
        return <span className="status-badge bg-success-light text-success">Available</span>;
      case 'reserved':
        return <span className="status-badge bg-warning-light text-warning">Reserved</span>;
      case 'booked':
        return <span className="status-badge bg-info-light text-info">Booked</span>;
      default:
        return <span className="status-badge bg-muted text-muted-foreground">Unknown</span>;
    }
  };

  return (
    <div className="property-card">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          {getStatusBadge()}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">{property.title}</h3>
          <span className="text-xl font-bold text-primary">${property.price}/mo</span>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
          <span className="mx-2">•</span>
          <Home className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.type}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.map((feature, index) => (
            <span key={index} className="status-badge bg-secondary text-secondary-foreground">
              {feature}
            </span>
          ))}
        </div>
        
        <button
          onClick={onReserve}
          disabled={property.availability !== 'available'}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            property.availability === 'available'
              ? 'btn-primary'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {property.availability === 'available' ? 'Reserve Property' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};