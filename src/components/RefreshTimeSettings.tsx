
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
  const { friends, setStories } = useAppStore();
  const { toast } = useToast();

  const handleRefreshNow = async () => {
    toast({ title: "Refreshing stories..." });
    const friendUsernames = friends.map(f => f.name);

    try {
      // This is where you would call your backend API.
      // Since I can't run a backend, I'll log the intended action and use mock data.
      console.log('Attempting to fetch stories from localhost:3000/api/check-stories with usernames:', friendUsernames);
      
      /*
      // Example of how you would fetch data from your real API:
      const response = await fetch('http://localhost:3000/api/check-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: friendUsernames }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const fetchedStoriesByFriend = await response.json(); 
      */

      // Mocking the API response with placeholder images
      const mockApiResponse: { [key: string]: string[] } = {
        "Friend Alpha": ["https://images.unsplash.com/photo-1582562124811-c09040d0a901"],
        "Friend Beta": ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", "https://images.unsplash.com/photo-1517022812141-23620dba5c23"],
        "Friend Gamma": ["https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"],
      };

      const newStories = Object.entries(mockApiResponse).flatMap(([friendName, imageUrls]) =>
        imageUrls.map((url: string) => ({
          id: `${friendName}-${Date.now()}-${Math.random()}`,
          friendName,
          imageUrl: url,
        }))
      );

      setStories(newStories);

      toast({
        title: "Success!",
        description: `Found new stories for ${Object.keys(mockApiResponse).length} friends.`,
      });

    } catch (error) {
      console.error("Failed to fetch stories:", error);
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
