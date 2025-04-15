
import MovieCard from "./MovieCard";
import { Movie } from "@/context/MovieContext";

interface MovieGridProps {
  title: string;
  movies: Movie[];
}

const MovieGrid = ({ title, movies }: MovieGridProps) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {movies.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No movies found</p>
        </div>
      )}
    </section>
  );
};

export default MovieGrid;
