
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/use-toast';
import ImageDropzone from './ImageDropzone';

const FriendManager: React.FC = () => {
  const { friends, addFriend, deleteFriend } = useAppStore();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageSrc) {
      toast({
        title: "Missing fields",
        description: "Please provide a name and an image.",
        variant: "destructive",
      });
      return;
    }
    addFriend({ name, imageSrc });
    setName('');
    setImageSrc('');
    setImagePreview(null);
    toast({ title: "Friend added!", description: `${name} is now on your friend list.` });
  };

  const handleDeleteFriend = (id: string, friendName: string) => {
    deleteFriend(id);
    toast({ title: "Friend removed", description: `${friendName} has been removed.` });
  };

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
                  <TableHead className="text-right text-amber-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {friends.map((friend) => (
                  <TableRow key={friend.id} className="hover:bg-amber-100/50">
                    <TableCell className="font-medium">{friend.name}</TableCell>
                    <TableCell>
                      <img src={friend.imageSrc} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" className="border-amber-800/50 text-amber-800 hover:bg-amber-100" onClick={() => toast({ title: "Coming soon!", description: "Editing friends will be available in a future update."})}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteFriend(friend.id, friend.name)}>
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
          <form onSubmit={handleAddFriend} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-amber-900">Friend Name</Label>
              <Input id="name" placeholder="Pixel Pal" className="bg-white" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label className="text-amber-900">Friend Image</Label>
              <ImageDropzone
                onImageUpload={setImageSrc}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
            <Button type="submit" className="bg-green-700 hover:bg-green-800">Add Friend</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendManager;
