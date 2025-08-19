import { useState } from 'react';
import { MessageCircle, Star, CheckCircle } from 'lucide-react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    setTimeout(() => {
      setSubmitStatus('success');
      setRating(0);
      setComment('');
    }, 2000);
  };

  const StarRating = ({ rating, onRatingChange }: any) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`${
              star <= rating ? 'text-warning' : 'text-muted-foreground'
            } hover:text-warning`}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  if (submitStatus === 'success') {
    return (
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Platform Feedback</h1>
          <p className="text-muted-foreground mt-2">Help us improve your experience</p>
        </div>

        <div className="dashboard-card p-12 text-center animate-scale-in">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Your feedback has been submitted successfully. We appreciate your input!
          </p>
          <button onClick={() => setSubmitStatus('idle')} className="btn-primary">
            Submit More Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground">Platform Feedback</h1>
        <p className="text-muted-foreground mt-2">Help us improve your experience</p>
      </div>

      <div className="dashboard-card animate-slide-up">
        <div className="p-6 border-b border-[hsl(var(--border))]">
          <h3 className="text-lg font-semibold text-foreground">Rate Your Experience</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-center">
            <label className="block text-sm font-medium text-foreground mb-4">
              How would you rate your overall experience with our platform?
            </label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Comments & Suggestions
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts, suggestions, or report any issues..."
              className="form-input min-h-32"
              required
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0 || submitStatus === 'submitting'}
            className={`btn-primary w-full ${
              rating === 0 || submitStatus === 'submitting' 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;