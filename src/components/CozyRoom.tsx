import React from 'react';
import Avatar from './Avatar';
import Book from './Book';
import { Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define friend data with new pixel art images, positions, and story messages
const friends = [
  { id: '1', name: 'Friend Alpha', imageSrc: '/assets/friend-pixel-1.png', position: 'bottom-[20%] left-[25%]', storyMessage: "Just baked some cookies! 🍪" },
  { id: '2', name: 'Friend Beta', imageSrc: '/assets/friend-pixel-2.png', position: 'bottom-[30%] left-[44%]', storyMessage: "New art piece up! 🎨" },
  { id: '3', name: 'Friend Gamma', imageSrc: '/assets/friend-pixel-3.png', position: 'bottom-[20%] right-[25%]', storyMessage: "Exploring new trails! ⛰️" },
];

const CozyRoom: React.FC = () => {
  const { toast } = useToast();

  const handleAvatarClick = (friendName: string) => {
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
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      <div className="relative z-10 w-full h-full">
        <Book
          imageSrc="/assets/book.png"
          label="The mindful monk award goes to ..."
          onClick={handleLeaderboardClick}
          positionClasses="top-[46%] left-[44%]"
        />

        {friends.map((friend) => (
          <Avatar
            key={friend.id}
            name={friend.name}
            imageSrc={friend.imageSrc}
            onClick={() => handleAvatarClick(friend.name)}
            positionClasses={friend.position}
            storyMessage={friend.storyMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default CozyRoom;
