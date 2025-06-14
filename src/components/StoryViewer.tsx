import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Story } from '@/store/appStore';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from './ui/button';

interface StoryViewerProps {
  stories: Story[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, open, onOpenChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('StoryViewer rendered with:', { stories, open, currentIndex }); // Debug log

  React.useEffect(() => {
    if (open) {
      setCurrentIndex(0);
      console.log('StoryViewer opened, reset to first story'); // Debug log
    }
  }, [open]);

  if (!stories || stories.length === 0) {
    console.log('No stories to display in StoryViewer'); // Debug log
    return null;
  }

  const currentStory = stories[currentIndex];
  console.log('Current story:', currentStory); // Debug log

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent border-none shadow-none p-0 max-w-none w-screen h-screen flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/75 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X />
          </Button>

          <div className="relative w-auto h-[90vh] max-w-[50vh] bg-[#6b4226] p-2 sm:p-3 rounded-2xl shadow-2xl border-4 border-[#4a2e1d]">
            <img src={currentStory.imageUrl} alt={`Story from ${currentStory.friendName}`} className="w-full h-full object-cover rounded-lg" />
          </div>

          {stories.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 rounded-full"
                onClick={goToPrev}
              >
                <ArrowLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 rounded-full"
                onClick={goToNext}
              >
                <ArrowRight />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
