
import React, { useState } from 'react';
import Avatar from './Avatar';
import InteractiveItem from './InteractiveItem';
import { Book, MessageCircle, Users } from 'lucide-react'; // Using Book for the leaderboard
import { useToast } from '@/hooks/use-toast'; // For placeholder interaction

// Define friend data (can be moved to a data file later)
const friends = [
  { id: '1', name: 'Friend Fruity', imageSrc: '/assets/friend-avatar-1.jpg', position: 'top-1/3 left-1/4' },
  { id: '2', name: 'Friend Tabby', imageSrc: '/assets/friend-avatar-2.jpg', position: 'top-2/3 left-1/3' },
  { id: '3', name: 'Friend Kitten', imageSrc: '/assets/friend-avatar-3.jpg', position: 'top-1/2 left-3/4' },
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
    <div className="relative w-full h-screen bg-cover bg-center font-sans" style={{ backgroundImage: "url('/assets/cozy-room.jpg')" }}>
      {/* Overlay for a cozier feel, adjust opacity as needed */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      <div className="relative z-10 w-full h-full">
        {friends.map((friend) => (
          <Avatar
            key={friend.id}
            name={friend.name}
            imageSrc={friend.imageSrc}
            onClick={() => handleAvatarClick(friend.name)}
            positionClasses={friend.position}
          />
        ))}

        <InteractiveItem
          IconComponent={Book}
          label="Leaderboard"
          onClick={handleLeaderboardClick}
          positionClasses="bottom-1/4 left-1/2" // Example position for the book
          iconColor="text-amber-700"
        />
        
        {/* You can add more InteractiveItem components here */}
        {/* Example:
        <InteractiveItem
          IconComponent={MessageCircle}
          label="Chat"
          onClick={() => console.log('Chat clicked')}
          positionClasses="bottom-1/3 right-1/4"
          iconColor="text-blue-500"
        />
        */}
      </div>
      
      <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground p-3 rounded-lg shadow-lg animate-fade-in-up">
        <h1 className="text-2xl font-bold">My Cozy Space</h1>
        <p className="text-sm">A place for friends and mindfulness.</p>
      </div>
    </div>
  );
};

export default CozyRoom;
