
import { User, Film, Heart } from "lucide-react";
import { useMovieContext } from "@/context/MovieContext";

const Profile = () => {
  const { favoriteMovies, likedMovies } = useMovieContext();
  
  const userStats = [
    {
      icon: <Film className="h-5 w-5 text-movie-primary" />,
      label: "Movies Watched",
      value: 12
    },
    {
      icon: <Heart className="h-5 w-5 text-movie-primary" />,
      label: "Liked Movies",
      value: likedMovies.length
    },
    {
      icon: <Film className="h-5 w-5 text-movie-primary" />,
      label: "Favorites",
      value: favoriteMovies.length
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-gray-800/50 rounded-xl p-6 flex flex-col items-center border border-gray-700/50">
            <div className="bg-movie-dark rounded-full p-8 border-4 border-movie-primary mb-4">
              <User className="h-16 w-16 text-movie-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Movie Fan</h2>
            <p className="text-gray-400 mb-4">movie.fan@example.com</p>
            <p className="text-sm text-gray-400">Member since April 2024</p>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {userStats.map((stat, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                  {stat.icon}
                  <h3 className="font-medium">{stat.label}</h3>
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">Account Settings</h3>
            <p className="text-gray-400 mb-8">
              This is a demo profile page. In a real application, you would be able to edit your profile, 
              change your password, and manage notification settings here.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 rounded bg-gray-700/30 border border-gray-600/50">
                <h4 className="font-medium mb-1">Subscription Plan</h4>
                <p className="text-gray-400 text-sm">Premium (Demo)</p>
              </div>
              
              <div className="p-4 rounded bg-gray-700/30 border border-gray-600/50">
                <h4 className="font-medium mb-1">Email Notifications</h4>
                <p className="text-gray-400 text-sm">Enabled (Demo)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
