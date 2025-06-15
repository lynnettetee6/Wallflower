import React from 'react';

export interface Friend {
  id: string;
  name: string;
  imageSrc: string;
  storyMessage?: string;
  position?: string;
}

export interface Story {
  id: string;
  friendName: string;
  imageUrl: string;
}

interface AppState {
  friends: Friend[];
  stories: Story[];
  version: number;
}

// Load initial state from localStorage or use default
const loadInitialState = (): AppState => {
  const savedState = localStorage.getItem('appState');
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
  }
  return {
    version: 1, // used for future migrations
    friends: [
      { id: '1', name: 'lynnette.tee', imageSrc: '/assets/friend-pixel-1.png', storyMessage: "Just swam fifteen laps! 🏊‍♀️", position: 'bottom-[20%] left-[25%]' },
      { id: '2', name: 'loopholehackers', imageSrc: '/assets/friend-pixel-2.png', storyMessage: "The vibe is immaculate in these coders! 🎨", position: 'bottom-[30%] left-[44%]' },
      { id: '3', name: 'aitinkererskl', imageSrc: '/assets/friend-pixel-3.png', storyMessage: "AI moves mountains! ⛰️", position: 'bottom-[20%] right-[25%]' },
    ],
    stories: [],
  };
};

let memoryState: AppState = loadInitialState();
const listeners: Array<(state: AppState) => void> = [];

function emitChange() {
  // Save to localStorage whenever state changes
  localStorage.setItem('appState', JSON.stringify(memoryState));
  for (const listener of listeners) {
    listener(memoryState);
  }
}

const appStore = {
  addFriend: (friend: Omit<Friend, 'id' | 'position' | 'storyMessage'>) => {
    const newFriend: Friend = { ...friend, id: Date.now().toString(), storyMessage: 'No active story' };
    memoryState = { ...memoryState, friends: [...memoryState.friends, newFriend] };
    emitChange();
  },
  
  deleteFriend: (friendId: string) => {
    memoryState = { ...memoryState, friends: memoryState.friends.filter(f => f.id !== friendId) };
    emitChange();
  },
  
  setStories: (stories: Story[]) => {
    memoryState = { ...memoryState, stories };
    emitChange();
  },
  
  updateFriendStoryMessages: async (): Promise<boolean> => {
    try {
      const friendUsernames = memoryState.friends.map(f => f.name);
      const response = await fetch('/api/analyze-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: friendUsernames }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch story messages');
      }

      const { success, data } = await response.json();
      if (!success || !Array.isArray(data)) {
        throw new Error('API returned unsuccessful response or invalid data');
      }
      // debugger;
      console.log('Raw API Response:', { success, data });
      // Create a map of active stories by username
      const activeStories = new Map<string, string>();
      data.forEach((entry: string) => {
        const [username, ...messageParts] = entry.split(':');
        const message = messageParts.join(':').trim();
        if (message && message !== 'No active story') {
          activeStories.set(username.trim(), message);
        }
      });

      // Update friend story messages, clearing messages for inactive stories
      const updatedFriends = memoryState.friends.map(friend => {
        const storyMessage = activeStories.get(friend.name) || 'No active story';
        // debugger;
        console.log(`Updating story for ${friend.name}: ${storyMessage}`);
        return {
          ...friend,
          storyMessage
        };
      });

      memoryState = { ...memoryState, friends: updatedFriends };
      emitChange();
      return true;
    } catch (error) {
      console.error('Failed to update story messages:', error);
      return false;
    }
  },
  
  subscribe: (listener: (state: AppState) => void): (() => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  },
  
  getSnapshot: (): AppState => memoryState,
};

// React 18's hook for subscribing to external stores
export function useAppStore() {
  const state = React.useSyncExternalStore(appStore.subscribe, appStore.getSnapshot);
  return {
    ...state,
    addFriend: appStore.addFriend,
    deleteFriend: appStore.deleteFriend,
    setStories: appStore.setStories,
    updateFriendStoryMessages: appStore.updateFriendStoryMessages,
  };
}
