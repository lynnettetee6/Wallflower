
import React from 'react';
import { LucideProps } from 'lucide-react';

interface BookProps {
  IconComponent?: React.ElementType<LucideProps>;
  imageSrc?: string;
  label: string;
  onClick: () => void;
  positionClasses: string;
  iconColor?: string;
}

const Book: React.FC<BookProps> = ({ IconComponent, imageSrc, label, onClick, positionClasses, iconColor = "text-foreground" }) => {
  if (!IconComponent && !imageSrc) {
    console.warn("Book: Must provide either IconComponent or imageSrc.");
    return null;
  }

  return (
    <div
      className={`absolute ${positionClasses} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group animate-fade-in-up`}
      onClick={onClick}
      style={{ animationDelay: `${Math.random() * 0.5 + 0.5}s` }}
    >
      {/* Removed p-3, bg-secondary, rounded-full, shadow-lg from this div */}
      <div className="transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
        {imageSrc ? (
          // Enlarged image size from w-7 h-7 to w-24 h-24
          <img src={imageSrc} alt={label} className="w-[12vh] h-[12vh] object-contain" />
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
