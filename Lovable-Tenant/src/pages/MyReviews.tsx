import { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const MyReviews = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const completedBookings = [
    {
      id: 1,
      property: 'Elm Street Apartment',
      location: 'Downtown',
      bookedFrom: '2023-01-01',
      bookedTo: '2023-12-31',
      reviewStatus: 'published',
      rating: 4,
      comment: 'Great apartment with excellent location. Management was responsive.'
    },
    {
      id: 2,
      property: 'Pine Street House',
      location: 'Suburbs',
      bookedFrom: '2023-06-01',
      bookedTo: '2023-11-30',
      reviewStatus: 'pending',
      rating: 5,
      comment: 'Beautiful house with great amenities. Highly recommend!'
    },
    {
      id: 3,
      property: 'Oak Street Apartment',
      location: 'Downtown',
      bookedFrom: '2024-01-01',
      bookedTo: '2024-12-31',
      reviewStatus: 'not_reviewed',
      rating: 0,
      comment: ''
    }
  ];

  const StarRating = ({ rating, onRatingChange, readonly = false }: any) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onRatingChange(star)}
            className={`${
              star <= rating ? 'text-warning' : 'text-muted-foreground'
            } ${readonly ? 'cursor-default' : 'hover:text-warning'}`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmitReview = () => {
    if (!selectedProperty || rating === 0) return;
    
    setSubmitStatus('submitting');
    
    // Simulate submission
    setTimeout(() => {
      setSubmitStatus('success');
      setSelectedProperty(null);
      setRating(0);
      setComment('');
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="status-badge bg-success-light text-success">Published</span>;
      case 'pending':
        return <span className="status-badge bg-warning-light text-warning">Under Review</span>;
      case 'not_reviewed':
        return <span className="status-badge bg-muted text-muted-foreground">Not Reviewed</span>;
      default:
        return <span className="status-badge bg-muted text-muted-foreground">Unknown</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">My Reviews</h1>
        <p className="text-muted-foreground mt-2">Rate and review your past rental experiences</p>
      </div>

      {submitStatus === 'success' && (
        <div className="bg-success-light p-4 rounded-lg animate-fade-in">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <p className="text-sm font-medium text-success">
              Review submitted successfully! It will be published after moderation.
            </p>
          </div>
        </div>
      )}

      {/* Past Properties */}
      <div className="dashboard-card animate-slide-up">
        <div className="p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">Past Properties</h3>
        </div>
        
        <div className="divide-y divide-[hsl(var(--border))]">
          {completedBookings.map((booking) => (
            <div key={booking.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{booking.property}</h4>
                  <p className="text-sm text-muted-foreground">{booking.location}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(booking.bookedFrom).toLocaleDateString()} - {new Date(booking.bookedTo).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4 flex items-center space-x-3">
                  {getStatusBadge(booking.reviewStatus)}
                  {booking.reviewStatus === 'not_reviewed' && (
                    <button
                      onClick={() => setSelectedProperty(booking)}
                      className="btn-primary text-sm"
                    >
                      Write Review
                    </button>
                  )}
                </div>
              </div>
              
              {booking.reviewStatus !== 'not_reviewed' && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <StarRating rating={booking.rating} readonly={true} />
                    <span className="text-sm text-muted-foreground">
                      {booking.rating}/5 stars
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{booking.comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-modal max-w-md w-full mx-4 animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--border))]">
              <h3 className="text-lg font-semibold text-foreground">Write Review</h3>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-2 hover:bg-[hsl(var(--sidebar-hover))] rounded-lg"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-foreground">{selectedProperty.property}</h4>
                <p className="text-sm text-muted-foreground">{selectedProperty.location}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this property..."
                  className="form-input min-h-24"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || submitStatus === 'submitting'}
                  className={`btn-primary flex-1 ${
                    rating === 0 || submitStatus === 'submitting' 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;