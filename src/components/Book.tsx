import React from 'react';
import { LucideProps } from 'lucide-react';

interface BookProps {
  IconComponent?: React.ElementType<LucideProps>; // Made optional
  imageSrc?: string; // Added new prop for image URL
  label: string;
  onClick: () => void;
  positionClasses: string; // e.g., "top-1/2 left-1/4"
  iconColor?: string; // Still used if IconComponent is provided
}

const Book: React.FC<BookProps> = ({ IconComponent, imageSrc, label, onClick, positionClasses, iconColor = "text-foreground" }) => {
  if (!IconComponent && !imageSrc) {
    console.warn("Book: Must provide either IconComponent or imageSrc.");
    return null; // Or render a placeholder
  }

  return (
    <div
      className={`absolute ${positionClasses} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group animate-fade-in-up`}
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 0.5 + 0.5}s` }} // Staggered animation, after avatars
    >
      <div className="p-3 bg-secondary rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-accent flex items-center justify-center">
        {imageSrc ? (
          <img src={imageSrc} alt={label} className="w-7 h-7 object-contain" />
        ) : IconComponent ? (
          <IconComponent size={28} className={`transition-colors duration-300 ${iconColor} group-hover:text-accent-foreground`} />
        ) : null}
      </div>
      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </div>
      </div>
    </div>
  );
};

export default Book;
