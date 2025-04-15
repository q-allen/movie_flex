
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import api from '@/lib/api';

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  duration: string;
  genre: string[] | string;
  rating: number;
  image: string;
  video: string;
}

export interface Review {
  id: number;
  movieId: number;
  userId: number;
  username: string;
  text: string;
  date: string;
}

interface MovieContextType {
  movies: Movie[];
  favoriteMovies: number[];
  likedMovies: number[];
  reviews: Review[];
  addToFavorites: (movieId: number) => void;
  removeFromFavorites: (movieId: number) => void;
  toggleLike: (movieId: number) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getMovieById: (id: number) => Movie | undefined;
  getReviewsByMovieId: (movieId: number) => Review[];
  isFavorite: (movieId: number) => boolean;
  isLiked: (movieId: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [likedMovies, setLikedMovies] = useState<number[]>([]);

  // Fetch movies and reviews on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await api.get('movies/');
        const reviewRes = await api.get('movies/reviews/');
        setMovies(movieRes.data);
        
        setReviews(reviewRes.data);
      } catch (error) {
  
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addToFavorites = (movieId: number) => {
    setFavoriteMovies([...favoriteMovies, movieId]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavoriteMovies(favoriteMovies.filter((id) => id !== movieId));
  };

  const toggleLike = (movieId: number) => {
    setLikedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...review,
    };
    setReviews((prev) => [...prev, newReview]);
  };

  const getMovieById = (id: number) => movies.find((m) => m.id === id);

  const getReviewsByMovieId = (movieId: number) =>
    reviews.filter((r) => r.movieId === movieId);

  const isFavorite = (movieId: number) => favoriteMovies.includes(movieId);

  const isLiked = (movieId: number) => likedMovies.includes(movieId);

  return (
    <MovieContext.Provider
      value={{
        movies,
        favoriteMovies,
        likedMovies,
        reviews,
        addToFavorites,
        removeFromFavorites,
        toggleLike,
        addReview,
        getMovieById,
        getReviewsByMovieId,
        isFavorite,
        isLiked,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};
