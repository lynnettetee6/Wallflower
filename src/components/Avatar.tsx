import React, { useState } from 'react';
import ChatBubble from './ChatBubble';

interface AvatarProps {
  name: string;
  imageSrc: string;
  onClick: () => void;
  positionClasses: string; // e.g., "top-1/2 left-1/4"
  storyMessage?: string; // New prop for the chat bubble message
}

const Avatar: React.FC<AvatarProps> = ({ name, imageSrc, onClick, positionClasses, storyMessage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const defaultStoryMessage = "Wanna see my latest story?";

  return (
    <div
      className={`absolute ${positionClasses} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group animate-fade-in-up`}
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 0.5}s` }} // Staggered animation
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageSrc}
        alt={name}
        className="w-[15vh] h-[15vh] rounded-full object-cover shadow-lg transition-all duration-300 group-hover:shadow-xl"
      />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[200px] sm:max-w-xs">
        <ChatBubble 
          message={storyMessage || defaultStoryMessage} 
          isVisible={isHovered} 
          friendImageSrc={imageSrc}/>
      </div>

      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2">
        <div className="px-3 py-1 bg-[#f5e1c8] border-2 border-[#6b4226] rounded shadow">
            <p className="font-pixel text-[#4a2e1d] text-center text-[1.5vh] whitespace-nowrap leading-none">
                {name}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
