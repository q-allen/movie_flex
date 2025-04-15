
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useMovieContext } from "@/context/MovieContext";
import { type Movie } from "@/context/MovieContext";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { id, title, image, rating, genre, releaseYear } = movie;
  const { isLiked, toggleLike } = useMovieContext();
  
  const liked = isLiked(id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(id);
  };

  return (
    <div className="movie-card group movie-card-hover">
      <Link to={`/movie/${id}`} className="block h-full">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div>
              <p className="text-xs text-gray-400">{releaseYear}</p>
              <p className="text-xs text-gray-400">
                {Array.isArray(genre) ? genre.join(", ") : genre ?? "Unknown Genre"}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLikeClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-movie-primary/50 transition-colors"
          >
            <Heart className={cn("h-4 w-4", liked ? "fill-red-500 text-red-500" : "text-white")} />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white truncate">{title}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-300">{rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
