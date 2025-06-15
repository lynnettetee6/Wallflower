import React, { useState, useEffect, useCallback } from 'react';
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

  React.useEffect(() => {
    if (open) {
      setCurrentIndex(0);
    }
  }, [open]);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  }, [stories.length]);

  const goToPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  }, [stories.length]);

  // Add keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, goToPrev, goToNext, onOpenChange]);

  if (!stories || stories.length === 0) {
    return null;
  }

  const currentStory = stories[currentIndex];

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
                className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 z-50 w-24 h-24 p-0 hover:bg-transparent"
                onClick={goToPrev}
              >
                <ArrowLeft className="h-24 w-24 stroke-[#3E1C0D] stroke-2 fill-[#DEB887] drop-shadow-[4px_4px_4px_rgba(0,0,0,0.3)] transition-transform hover:scale-110" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 z-50 w-24 h-24 p-0 hover:bg-transparent"
                onClick={goToNext}
              >
                <ArrowRight className="h-24 w-24 stroke-[#3E1C0D] stroke-2 fill-[#DEB887] drop-shadow-[4px_4px_4px_rgba(0,0,0,0.3)] transition-transform hover:scale-110" />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
