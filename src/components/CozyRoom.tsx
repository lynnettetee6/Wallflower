import React from 'react';
import Avatar from './Avatar';
import Book from './Book';
import { Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define friend data with new pixel art images and positions
// TODO update friends to ig handles
const friends = [
  { id: '1', name: 'Friend Alpha', imageSrc: '/assets/friend-pixel-1.png', position: 'bottom-1/4 left-1/4' },
  { id: '2', name: 'Friend Beta', imageSrc: '/assets/friend-pixel-2.png', position: 'bottom-1/3 left-1/2' }, // Centered more towards the bottom
  { id: '3', name: 'Friend Gamma', imageSrc: '/assets/friend-pixel-3.png', position: 'bottom-1/4 right-1/4' }, // On the right side
];

const CozyRoom: React.FC = () => {
  const { toast } = useToast();

  const handleAvatarClick = (friendName: string) => { //declare a event handler - used later see below
    toast({
      title: `${friendName}'s Activity`,
      description: "Showing latest stories, posts, and DMs... (placeholder)",
    });
    console.log(`Clicked on ${friendName}`);
  };

  const handleLeaderboardClick = () => {
    toast({
      title: "Friend Leaderboard",
      description: "Showing who is most mindful... (placeholder)",
      action: (
        <div className="flex items-center text-sm text-primary hover:underline cursor-pointer">
          <Users size={16} className="mr-1" /> View Details
        </div>
      )
    });
    console.log("Leaderboard clicked");
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center font-sans" style={{ backgroundImage: "url('/assets/cozy-room-pixel.png')" }}>
      {/* Tailwind css - in-html css. Overlay for a cozier feel, adjust opacity as needed */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      <div className="relative z-10 w-full h-full">
        {/* Book is now rendered before Avatars to appear behind them */}
        <Book
          imageSrc="/assets/book.png"
          label="Leaderboard"
          onClick={handleLeaderboardClick}
          // Updated position to be near the book in the background image
          positionClasses="top-[58%] left-[48%]"
        />

        {friends.map((friend) => (
          <Avatar
            key={friend.id}
            name={friend.name}
            imageSrc={friend.imageSrc}
            onClick={() => handleAvatarClick(friend.name)}
            positionClasses={friend.position}
          />
        ))}

        {/* You can add more InteractiveItem components here */}
      </div>
      
      {/* The title "My Cozy Space" has been removed from here. */}
    </div>
  );
};

export default CozyRoom;
