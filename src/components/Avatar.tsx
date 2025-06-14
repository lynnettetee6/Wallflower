
import React from 'react';
import { MessageSquare } from 'lucide-react'; // Example icon

interface AvatarProps {
  name: string;
  imageSrc: string;
  onClick: () => void;
  positionClasses: string; // e.g., "top-1/2 left-1/4"
}

const Avatar: React.FC<AvatarProps> = ({ name, imageSrc, onClick, positionClasses }) => {
  return (
    <div
      className={`absolute ${positionClasses} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group animate-fade-in-up`}
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 0.5}s` }} // Staggered animation
    >
      <img
        src={imageSrc}
        alt={name}
        className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl animate-gentle-pulse"
      />
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
          <MessageSquare size={14} className="mr-1" />
          Chat
        </div>
      </div>
    </div>
  );
};

export default Avatar;
