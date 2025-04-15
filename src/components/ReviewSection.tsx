
import { useState } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ReviewSectionProps {
  movieId: number;
}

const ReviewSection = ({ movieId }: ReviewSectionProps) => {
  const { getReviewsByMovieId, addReview } = useMovieContext();
  const [reviewText, setReviewText] = useState("");
  const { toast } = useToast();
  
  const reviews = getReviewsByMovieId(movieId);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewText.trim()) {
      toast({
        title: "Error",
        description: "Review cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    addReview({
      movieId,
      userId: 999, // Mock user ID
      username: "CurrentUser",
      text: reviewText
    });
    
    toast({
      title: "Success",
      description: "Your review has been added",
      variant: "default"
    });
    
    setReviewText("");
  };

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold mb-4">Reviews & Comments</h3>
      
      <form onSubmit={handleSubmitReview} className="mb-8">
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          className="mb-3 bg-gray-800/50 border-gray-700"
        />
        <Button 
          type="submit" 
          className="bg-movie-primary hover:bg-movie-secondary text-white"
        >
          Post Review
        </Button>
      </form>
      
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-movie-primary">{review.username}</h4>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-gray-300">{review.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No reviews yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
