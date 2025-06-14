import React from 'react';
import Avatar from './Avatar';
import Book from './Book';
import { Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

// Define friend data with new pixel art images, positions, and story messages
const friends = [
  { id: '1', name: 'Friend Alpha', imageSrc: '/assets/friend-pixel-1.png', position: 'bottom-[20%] left-[25%]', storyMessage: "Just baked some cookies! 🍪" },
  { id: '2', name: 'Friend Beta', imageSrc: '/assets/friend-pixel-2.png', position: 'bottom-[30%] left-[44%]', storyMessage: "New art piece up! 🎨" },
  { id: '3', name: 'Friend Gamma', imageSrc: '/assets/friend-pixel-3.png', position: 'bottom-[20%] right-[25%]', storyMessage: "Exploring new trails! ⛰️" },
];

const CozyRoom: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAvatarClick = (friendName: string) => {
    toast({
      title: `${friendName}'s Activity`,
      description: "Showing latest stories, posts, and DMs... (placeholder)",
    });
    console.log(`Clicked on ${friendName}`);
  };

  const handleLeaderboardClick = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center font-sans" style={{ backgroundImage: "url('/assets/cozy-room-pixel.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      <Link to="/settings" className="absolute top-4 right-4 z-20 hover:scale-110 transition-transform cursor-pointer">
        <img src="/assets/settings-icon.png" alt="Settings" className="w-12 h-12" />
      </Link>

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
