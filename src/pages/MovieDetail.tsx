
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Clock, Calendar, Star } from "lucide-react";
import { useMovieContext } from "@/context/MovieContext";
import VideoPlayer from "@/components/VideoPlayer";
import ReviewSection from "@/components/ReviewSection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || "0");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { 
    getMovieById, 
    isLiked, 
    isFavorite, 
    toggleLike, 
    addToFavorites, 
    removeFromFavorites 
  } = useMovieContext();
  
  const movie = getMovieById(movieId);
  const liked = isLiked(movieId);
  const favorite = isFavorite(movieId);
  
  useEffect(() => {
    if (!movie) {
      navigate("/");
    }
  }, [movie, navigate]);
  
  if (!movie) {
    return null;
  }
  
  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(movieId);
      toast({
        title: "Removed from favorites",
        description: `${movie.title} has been removed from your favorites`,
      });
    } else {
      addToFavorites(movieId);
      toast({
        title: "Added to favorites",
        description: `${movie.title} has been added to your favorites`,
      });
    }
  };
  
  const handleToggleLike = () => {
    toggleLike(movieId);
    toast({
      title: liked ? "Unliked" : "Liked",
      description: `You ${liked ? "unliked" : "liked"} ${movie.title}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{movie.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{movie.rating} Rating</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.releaseYear}</span>
          </div>
          <div className="bg-gray-800 px-3 py-0.5 rounded-full">
            {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:gap-8 mb-8">
        <div className="mb-8">
          <VideoPlayer videoUrl={movie.video} />
          
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <Button
              onClick={handleToggleLike}
              variant="outline"
              className={cn(
                "flex items-center gap-2 border-gray-700 hover:bg-movie-primary/10",
                liked && "border-movie-primary/50 bg-movie-primary/10"
              )}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-movie-primary text-movie-primary")} />
              <span>{liked ? "Liked" : "Like"}</span>
            </Button>
            
            <Button
              onClick={handleToggleFavorite}
              variant={favorite ? "default" : "outline"}
              className={cn(
                "flex items-center gap-2",
                favorite 
                  ? "bg-movie-primary hover:bg-movie-secondary" 
                  : "border-gray-700 hover:bg-movie-primary/10"
              )}
            >
              {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3">About Movie</h3>
            <p className="text-gray-300">{movie.description}</p>
          </div>
        </div>
      </div>
      
      <ReviewSection movieId={movieId} />
    </div>
  );
};

export default MovieDetail;
