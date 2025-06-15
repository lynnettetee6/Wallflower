import React, { useState, useMemo, useEffect } from 'react';
import Avatar from './Avatar';
import Book from './Book';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import StoryViewer from './StoryViewer';
import type { Friend, Story } from '@/store/appStore';
import useSound from '@/hooks/useSound';

const CozyRoom: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { friends, stories } = useAppStore();
  console.log('Current stories in store:', stories); // Debug log

  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [activeStories, setActiveStories] = useState<Story[]>([]);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // A small delay to prevent characters from flickering at the wrong position on load.
    const timer = setTimeout(() => setContentVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const playAvatarSound = useSound('/assets/click.mp3');
  const playBookSound = useSound('/assets/book-click.mp3');
  const playSettingsSound = useSound('/assets/click.mp3');

  const handleAvatarClick = (friendName: string) => {
    playAvatarSound();
    console.log('Avatar clicked for friend:', friendName); // Debug log
    console.log('All stories:', stories); // Debug log
    
    // Find all images that belong to this friend by matching the friend name in the image filename
    const friendImages = stories.filter(story => {
      const imageFileName = story.imageUrl.toLowerCase();
      const normalizedFriendName = friendName.toLowerCase().replace(' ', '.');
      console.log('Comparing:', { imageFileName, normalizedFriendName }); // Debug log
      return imageFileName.includes(normalizedFriendName);
    });

    console.log('Filtered stories for friend:', friendImages); // Debug log

    if (friendImages.length > 0) {
      console.log('Setting active stories:', friendImages); // Debug log
      setActiveStories(friendImages);
      setIsStoryViewerOpen(true);
    } else {
      toast({
        title: `No images from ${friendName}`,
        description: "Try refreshing from the settings page!",
      });
      console.log(`No images found for ${friendName}`); // Debug log
    }
  };

  const handleLeaderboardClick = () => {
    playBookSound();
    navigate('/leaderboard');
  };

  const getVerticalSortValue = (positionString: string | undefined): number => {
    if (!positionString) return 0;

    const bottomMatch = positionString.match(/bottom-\[(\d+)%\]/);
    if (bottomMatch && bottomMatch[1]) {
      return parseInt(bottomMatch[1], 10);
    }

    const topMatch = positionString.match(/top-\[(\d+)%\]/);
    if (topMatch && topMatch[1]) {
      // Convert top percentage to a bottom-based value for consistent sorting
      return 100 - parseInt(topMatch[1], 10);
    }
    
    return 0;
  };

  const sortedFriends = useMemo(() => {
    return [...friends].sort((a: Friend, b: Friend) => {
      const posA = getVerticalSortValue(a.position);
      const posB = getVerticalSortValue(b.position);
      // Sort descending: higher vertical position value (further back) comes first
      return posB - posA;
    });
  }, [friends]);

  return (
    <>
      <div className="relative w-full h-screen bg-cover bg-center font-sans" style={{ backgroundImage: "url('/assets/cozy-room-pixel.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>

        <Link to="/settings" onClick={playSettingsSound} className="absolute top-4 right-4 z-20 hover:scale-110 transition-transform cursor-pointer">
          <img src="/assets/settings-icon.png" alt="Settings" className="w-12 h-12" />
        </Link>

        <div className={`relative z-10 w-full h-full transition-opacity duration-500 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Book
            imageSrc="/assets/book.png"
            label="The mindful monk award goes to ..."
            onClick={handleLeaderboardClick}
            positionClasses="top-[46%] left-[44%]"
          />

          {sortedFriends.map((friend) => (
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
