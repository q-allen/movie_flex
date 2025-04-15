
import { Link } from "react-router-dom";
import { Heart, Film, User, Home } from "lucide-react";
import { useMovieContext } from "@/context/MovieContext";

const Navigation = () => {
  const { favoriteMovies } = useMovieContext();
  
  return (
    <nav className="sticky top-0 z-50 w-full glass-effect border-b border-white/10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <Film className="h-6 w-6 text-movie-primary" />
            <span>FlickChill</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          
          <Link to="/favorites" className="text-gray-300 hover:text-white flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
            {favoriteMovies.length > 0 && (
              <span className="ml-1 bg-movie-primary text-xs rounded-full px-2 py-0.5">
                {favoriteMovies.length}
              </span>
            )}
          </Link>
          
          <Link to="/profile" className="text-gray-300 hover:text-white flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </div>
        
        <div className="md:hidden flex items-center">
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white">
              <Home className="h-6 w-6" />
            </Link>
            
            <Link to="/favorites" className="text-gray-300 hover:text-white relative">
              <Heart className="h-6 w-6" />
              {favoriteMovies.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-movie-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteMovies.length}
                </span>
              )}
            </Link>
            
            <Link to="/profile" className="text-gray-300 hover:text-white">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
