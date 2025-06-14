
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit } from 'lucide-react';

// Temporary friend data, to be replaced with state management
const friends = [
  { id: '1', name: 'Friend Alpha', imageSrc: '/assets/friend-pixel-1.png', storyMessage: "Just baked some cookies! 🍪" },
  { id: '2', name: 'Friend Beta', imageSrc: '/assets/friend-pixel-2.png', storyMessage: "New art piece up! 🎨" },
  { id: '3', name: 'Friend Gamma', imageSrc: '/assets/friend-pixel-3.png', storyMessage: "Exploring new trails! ⛰️" },
];

const FriendManager: React.FC = () => {
  return (
    <Card className="bg-amber-50 border-amber-800/20">
      <CardHeader>
        <CardTitle className="text-[#4a2e1d] font-pixel">Manage Friends</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#4a2e1d]">Your Friends</h3>
          <div className="rounded-md border border-amber-800/20">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-amber-100/50">
                  <TableHead className="text-amber-900">Name</TableHead>
                  <TableHead className="text-amber-900">Image</TableHead>
                  <TableHead className="text-amber-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {friends.map((friend) => (
                  <TableRow key={friend.id} className="hover:bg-amber-100/50">
                    <TableCell>{friend.name}</TableCell>
                    <TableCell>
                      <img src={friend.imageSrc} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="icon" className="border-amber-800/50 text-amber-800 hover:bg-amber-100">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#4a2e1d]">Add New Friend</h3>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-amber-900">Friend Name</Label>
              <Input id="name" placeholder="Pixel Pal" className="bg-white" />
            </div>
            <div>
              <Label htmlFor="imageSrc" className="text-amber-900">Image URL</Label>
              <Input id="imageSrc" placeholder="/assets/friend-pixel-4.png" className="bg-white" />
            </div>
            <div>
              <Label htmlFor="storyMessage" className="text-amber-900">Story Message</Label>
              <Input id="storyMessage" placeholder="Having a great day!" className="bg-white" />
            </div>
            <Button type="submit" className="bg-green-700 hover:bg-green-800">Add Friend</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendManager;
