
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Mock data for friends and their mindfulness streaks
const friendsData = [
  { id: '1', name: 'Friend Alpha', imageSrc: '/assets/friend-pixel-1.png', streak: 21 },
  { id: '2', name: 'Friend Beta', imageSrc: '/assets/friend-pixel-2.png', streak: 15 },
  { id: '3', name: 'Friend Gamma', imageSrc: '/assets/friend-pixel-3.png', streak: 18 },
  { id: '4', name: 'Friend Delta', imageSrc: '/assets/friend-pixel-2.png', streak: 10 },
  { id: '5', name: 'Friend Epsilon', imageSrc: '/assets/friend-pixel-3.png', streak: 5 },
].sort((a, b) => b.streak - a.streak);

const LeaderboardTable: React.FC = () => {
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-400/80 border-yellow-600 text-yellow-950'; // Gold
      case 2:
        return 'bg-slate-300/80 border-slate-500 text-slate-950'; // Silver
      case 3:
        return 'bg-orange-400/80 border-orange-600 text-orange-950'; // Bronze
      default:
        return 'bg-transparent border-amber-300';
    }
  };

  return (
    <div className="rounded-md border border-amber-800/20">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-amber-100/50">
            <TableHead className="text-amber-900 w-16 text-center">Rank</TableHead>
            <TableHead className="text-amber-900">Friend</TableHead>
            <TableHead className="text-amber-900 text-right">Mindfulness Streak</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {friendsData.map((friend, index) => {
            const rank = index + 1;
            const isWinner = rank === 1;

            return (
              <TableRow
                key={friend.id}
                className={cn(
                  'transition-all duration-300',
                  isWinner && 'bg-yellow-200/50 transform scale-[1.03] shadow-lg z-10 relative',
                  rank === 2 && 'bg-slate-200/50',
                  rank === 3 && 'bg-orange-200/50',
                  'hover:bg-amber-100/50 hover:!scale-[1.04]'
                )}
              >
                <TableCell className="font-bold text-center text-lg">
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full',
                      getMedalColor(rank)
                    )}
                  >
                    {rank}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className={cn('h-12 w-12', isWinner && 'ring-2 ring-offset-2 ring-offset-yellow-200/50 ring-yellow-500')}>
                        <AvatarImage src={friend.imageSrc} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {isWinner && (
                        <Crown
                          className="absolute -top-4 -right-3 h-7 w-7 text-yellow-500 fill-yellow-400"
                          style={{ transform: 'rotate(15deg)' }}
                        />
                      )}
                    </div>
                    <span className={cn('font-semibold', isWinner && 'text-xl text-yellow-800')}>
                      {friend.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-bold text-lg text-green-800">{friend.streak}</span> days
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
