
import { useMovieContext } from "@/context/MovieContext";
import MovieGrid from "@/components/MovieGrid";

const Favorites = () => {
  const { movies, favoriteMovies } = useMovieContext();
  
  const favoriteMoviesList = movies.filter(movie => favoriteMovies.includes(movie.id));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      
      {favoriteMoviesList.length > 0 ? (
        <MovieGrid title="" movies={favoriteMoviesList} />
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium text-gray-400 mb-4">No favorites yet</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Start adding movies to your favorites list by clicking the "Add to Favorites" button on any movie page.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
