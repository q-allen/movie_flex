import { useMovieContext } from "@/context/MovieContext";
import MovieGrid from "@/components/MovieGrid";
import { Film } from "lucide-react";

const Index = () => {
  const { movies } = useMovieContext();

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading movies...
      </div>
    );
  }

  const featuredMovie = movies.length > 0 ? movies[0] : null;
  const topRatedMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Movie Section */}
      {featuredMovie && (
        <div className="relative rounded-xl overflow-hidden mb-10 bg-gradient-to-r from-purple-900/40 to-gray-900">
          <div className="absolute inset-0 overflow-hidden">
          <img 
              src={featuredMovie.image} 
              alt={featuredMovie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
          </div>

          <div className="relative z-10 py-24 px-6 md:px-12 flex flex-col items-start max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Film className="h-5 w-5 text-movie-primary" />
              <span className="text-sm font-medium text-movie-primary">
                Featured Movie
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {featuredMovie.title}
            </h1>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-movie-primary px-2 py-0.5 rounded text-xs font-medium">
                {featuredMovie.rating} Rating
              </span>
              <span className="text-gray-300 text-sm">
                {featuredMovie.releaseYear}
              </span>
              <span className="text-gray-300 text-sm">
                {featuredMovie.duration}
              </span>
            </div>
            <p className="text-gray-300 mb-8 md:max-w-lg">
              {featuredMovie.description}
            </p>
            <a
              href={`/movie/${featuredMovie.id}`}
              aria-label={`Watch ${featuredMovie.title} now`}
              className="bg-movie-primary hover:bg-movie-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Watch Now
            </a>
          </div>
        </div>
      )}

      {/* Top Rated Movies */}
      <MovieGrid title="Top Rated Movies" movies={topRatedMovies} />

      {/* All Movies */}
      <MovieGrid title="All Movies" movies={movies} />
    </div>
  );
};

export default Index;
