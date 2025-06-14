import React from 'react';

interface ChatBubbleProps {
  message: string;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, className = "" }) => {
  return (
    <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 origin-bottom scale-90 group-hover:scale-100 ${className}`}>
      <div className="relative">
        {/* Main bubble with pixelated border effect */}
        <div 
          className="relative bg-[#F5E6D3] text-[#2C1810] px-4 py-2.5 
                     border-4 border-[#8B4513] rounded-lg
                     shadow-[4px_4px_0px_0px_rgba(139,69,19,0.5)]
                     [image-rendering:pixelated]
                     before:content-[''] before:absolute before:inset-0
                     before:border-2 before:border-[#2C1810]/20 before:rounded-sm
                     before:[image-rendering:pixelated]"
        >
          {/* Inner texture */}
          <div className="absolute inset-0 opacity-10 [background-size:8px_8px]
                        [background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkSURBVHgB7cxBCQAACATA0z/IsxekCHuYgMC+VzMzM39wSy1uO2sEZb0oHXEAAAAASUVORK5CYII=')]">
          </div>
          <div className="relative text-xs font-pixel text-[#3D1F14] [image-rendering:pixelated] [text-shadow:1px_1px_0px_#F5E6D3] break-words whitespace-pre-wrap max-w-[200px]">
            {message}
          </div>
        </div>
        {/* Pixelated pointy end */}
        <div className="relative">
          <div className="absolute w-4 h-4 bg-[#F5E6D3] border-b-4 border-r-4 border-[#8B4513]
                        transform rotate-45 left-1/2 -bottom-2 -translate-x-1/2
                        [image-rendering:pixelated]">
            {/* Inner texture for pointy end */}
            <div className="absolute inset-0 opacity-10 [background-size:8px_8px]
                          [background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkSURBVHgB7cxBCQAACATA0z/IsxekCHuYgMC+VzMzM39wSy1uO2sEZb0oHXEAAAAASUVORK5CYII=')]">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
