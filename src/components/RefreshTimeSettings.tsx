import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/appStore';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const RefreshTimeSettings: React.FC = () => {
  const { friends, setStories, updateFriendStoryMessages } = useAppStore();
  const { toast } = useToast();

  const handleRefreshNow = async () => {
    toast({ title: "Refreshing stories and messages..." });
    let hasErrors = false;

    try {
      // // First, delete all existing stories TODO
      // const deleteResponse = await fetch('/api/delete-stories', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // });

      
      // console.log('Delete stories response status:', deleteResponse.ok);
      // if (!deleteResponse.ok) {
      //   throw new Error('Failed to connect to delete-stories endpoint');
      // }

      // const deleteResult = await deleteResponse.json();
      // console.log('Delete stories response:', deleteResult);

      // if (!deleteResult.success) {
      //   toast({
      //     title: "Error",
      //     description: deleteResult.details || deleteResult.error || "Failed to delete stories",
      //     variant: "destructive",
      //   });
      //   hasErrors = true;
      // } else {
      //   toast({
      //     title: "Cleanup",
      //     description: deleteResult.message,
      //     variant: "default",
      //   });
      // }

      // Then, try to fetch story messages
      const messageSuccess = await updateFriendStoryMessages();
      if (!messageSuccess) {
        console.error('Failed to update story messages');
        hasErrors = true;
      }

      // Then fetch story images
      const response = await fetch('/api/check-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: friends.map(f => f.name) }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const { success, data } = await response.json();
      console.log('Raw API Response:', { success, data });

      if (!success) {
        throw new Error('API returned unsuccessful response');
      }

      // Transform the API response into Story objects
      const newStories = data
        .filter((item: string) => item.includes(':')) // Make sure we have valid data
        .map((item: string) => {
          const [friendName, filename] = item.split(':');
          return {
            id: `story-${Date.now()}-${Math.random()}`,
            friendName: friendName.trim(),
            imageUrl: `/stories/${filename.trim()}`
          };
        });

      console.log('Transformed stories:', newStories);
      setStories(newStories);

      // Show appropriate toast message
      if (hasErrors) {
        toast({
          title: "Partial Success",
          description: "Stories updated, but some messages couldn't be fetched.",
          variant: "default",
        });
      } else {
        toast({
          title: "Success!",
          description: "Stories and messages updated successfully.",
          variant: "default",
        });
      }

    } catch (error) {
      console.error("Failed to fetch stories:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      toast({
        title: "Error",
        description: "Could not fetch stories. Is the local server running?",
        variant: "destructive",
      });
    }
  };


  return (
    <Card className="bg-amber-50 border-amber-800/20">
      <CardHeader>
        <CardTitle className="text-[#4a2e1d] font-pixel">Refresh Schedule</CardTitle>
        <CardDescription>
          Choose when to check for new stories from your friends.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-amber-900">Refresh Days</Label>
          <ToggleGroup type="multiple" aria-label="Days of the week" className="flex-wrap justify-start">
            {daysOfWeek.map(day => (
              <ToggleGroupItem key={day} value={day.toLowerCase()} aria-label={day} className="data-[state=on]:bg-green-700 data-[state=on]:text-white">
                {day}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <Label htmlFor="refresh-time" className="text-amber-900">Refresh Time (24h)</Label>
            <Input id="refresh-time" type="time" className="bg-white w-40" />
          </div>
          <Button onClick={handleRefreshNow} className="bg-green-700 hover:bg-green-800">Refresh Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RefreshTimeSettings;
