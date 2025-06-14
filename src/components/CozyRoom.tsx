
import React, { useState } from 'react';
import Avatar from './Avatar';
import Book from './Book';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import StoryViewer from './StoryViewer';
import type { Story } from '@/store/appStore';

const CozyRoom: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { friends, stories } = useAppStore();

  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [activeStories, setActiveStories] = useState<Story[]>([]);

  const handleAvatarClick = (friendName: string) => {
    const friendStories = stories.filter(s => s.friendName === friendName);

    if (friendStories.length > 0) {
      setActiveStories(friendStories);
      setIsStoryViewerOpen(true);
    } else {
      toast({
        title: `No new stories from ${friendName}`,
        description: "Try refreshing from the settings page!",
      });
      console.log(`Clicked on ${friendName}, no stories found.`);
    }
  };

  const handleLeaderboardClick = () => {
    navigate('/leaderboard');
  };

  return (
    <>
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
            friend.position ? (
              <Avatar
                key={friend.id}
                name={friend.name}
                imageSrc={friend.imageSrc}
                onClick={() => handleAvatarClick(friend.name)}
                positionClasses={friend.position}
                storyMessage={friend.storyMessage}
              />
            ) : null
          ))}
        </div>
      </div>
      <StoryViewer
        stories={activeStories}
        open={isStoryViewerOpen}
        onOpenChange={setIsStoryViewerOpen}
      />
    </>
  );
};

export default CozyRoom;
