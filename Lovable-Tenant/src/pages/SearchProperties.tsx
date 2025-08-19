import { useState } from 'react';
import { Search, MapPin, Filter, Home, Building, DollarSign } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { ReservationModal } from '../components/ReservationModal';

const SearchProperties = () => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 5000,
    propertyType: '',
    availability: 'available'
  });
  
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const properties = [
    {
      id: 1,
      title: 'Oak Street Apartment',
      location: 'Downtown',
      type: 'Apartment',
      price: 1200,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      features: ['2 Bedrooms', '1 Bathroom', 'Parking', 'Furnished']
    },
    {
      id: 2,
      title: 'Maple Avenue Studio',
      location: 'Midtown',
      type: 'Studio',
      price: 800,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      features: ['1 Bedroom', '1 Bathroom', 'Modern Kitchen']
    },
    {
      id: 3,
      title: 'Pine Street House',
      location: 'Suburbs',
      type: 'House',
      price: 2500,
      availability: 'reserved',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      features: ['3 Bedrooms', '2 Bathrooms', 'Garden', 'Garage']
    },
    {
      id: 4,
      title: 'Cedar Lane Condo',
      location: 'Uptown',
      type: 'Apartment',
      price: 1500,
      availability: 'available',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      features: ['2 Bedrooms', '2 Bathrooms', 'Balcony', 'Gym Access']
    }
  ];

  const filteredProperties = properties.filter(property => {
    return (
      (!filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      property.price >= filters.minPrice &&
      property.price <= filters.maxPrice &&
      (!filters.propertyType || property.type === filters.propertyType) &&
      (!filters.availability || property.availability === filters.availability)
    );
  });

  const handleReserve = (property: any) => {
    setSelectedProperty(property);
    setShowReservationModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Search Properties</h1>
        <p className="text-muted-foreground mt-2">Find your perfect rental property</p>
      </div>

      {/* Filters */}
      <div className="filter-section animate-slide-up">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="form-input pl-10"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Min Price</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
                className="form-input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Max Price</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                placeholder="5000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                className="form-input pl-10"
              />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              className="form-input"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => setFilters({...filters, availability: e.target.value})}
              className="form-input"
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {filteredProperties.length} Properties Found
          </h3>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onReserve={() => handleReserve(property)}
              />
            ))}
          </div>
        ) : (
          <div className="dashboard-card p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to find more properties.</p>
          </div>
        )}
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        property={selectedProperty}
      />
    </div>
  );
};

export default SearchProperties;