
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const RefreshTimeSettings: React.FC = () => {
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
        <div>
          <Label htmlFor="refresh-time" className="text-amber-900">Refresh Time (24h)</Label>
          <Input id="refresh-time" type="time" className="bg-white w-40" />
        </div>
      </CardContent>
    </Card>
  );
};

export default RefreshTimeSettings;
