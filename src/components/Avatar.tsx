
import React from 'react';

interface AvatarProps {
  name: string;
  imageSrc: string;
  onClick: () => void;
  positionClasses: string; // e.g., "top-1/2 left-1/4"
  storyMessage?: string; // New prop for the chat bubble message
}

const Avatar: React.FC<AvatarProps> = ({ name, imageSrc, onClick, positionClasses, storyMessage }) => {
  const defaultStoryMessage = "Wanna see my latest post?";

  return (
    <div
      className={`absolute ${positionClasses} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group animate-fade-in-up`}
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 0.5}s` }} // Staggered animation
    >
      <img
        src={imageSrc}
        alt={name}
        className="w-[15vh] h-[15vh] rounded-full object-cover shadow-lg transition-all duration-300 group-hover:shadow-xl"
      />
      {/* New Chat Bubble */}
      <div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[200px] sm:max-w-xs 
                   opacity-0 group-hover:opacity-100 transition-all duration-300 origin-bottom scale-90 group-hover:scale-100"
      >
        <div className="bg-white text-slate-700 px-3 py-2 rounded-lg text-xs shadow-lg text-center">
          {storyMessage || defaultStoryMessage}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
